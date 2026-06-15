"use client";

import { ComponentProps, ReactNode, useState } from "react";
import Copy from "./copy";
import { PlayIcon, TerminalIcon } from "lucide-react";

// Pyodide를 CDN에서 한 번만 지연 로드 (전역 캐시)
const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodidePromise: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("pyodide script load failed"));
    document.head.appendChild(s);
  });
}

function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(PYODIDE_BASE + "pyodide.js");
      // @ts-expect-error: loadPyodide는 CDN 스크립트가 window에 주입
      return window.loadPyodide({ indexURL: PYODIDE_BASE });
    })();
  }
  return pyodidePromise;
}

export default function RunnablePython({
  code,
  preProps,
  children,
}: {
  code: string;
  preProps: ComponentProps<"pre">;
  children: ReactNode;
}) {
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [stdin, setStdin] = useState("");
  const [genningInput, setGenningInput] = useState(false);

  async function genSample() {
    if (genningInput) return;
    setGenningInput(true);
    try {
      const res = await fetch("/api/sample-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok && typeof data.input === "string") setStdin(data.input);
    } catch {
      // 무시
    } finally {
      setGenningInput(false);
    }
  }

  const needsInput = /\binput\s*\(/.test(code);

  async function run() {
    if (running) return;
    // input()이 있는데 입력칸이 아직 안 떴으면 → 입력칸부터 띄우고 대기
    if (needsInput && !showStdin) {
      setShowStdin(true);
      setOutput(null);
      return;
    }
    setRunning(true);
    setOutput("실행 준비 중… (처음 한 번은 파이썬 로딩에 몇 초 걸려요)");
    try {
      const py = await getPyodide();
      // input() 지원: 입력칸 내용을 한 줄씩 stdin으로 공급 (없으면 EOF)
      const lines = stdin.length ? stdin.split("\n") : [];
      let li = 0;
      py.setStdin({ stdin: () => (li < lines.length ? lines[li++] + "\n" : null) });
      let buf = "";
      py.setStdout({ batched: (s: string) => (buf += s + "\n") });
      py.setStderr({ batched: (s: string) => (buf += s + "\n") });
      try {
        await py.runPythonAsync(code);
      } catch (e) {
        buf += String(e);
        if (/EOFError/.test(String(e))) {
          buf += "\n\n💡 입력 줄 수가 부족한 것 같아요. 코드가 읽는 만큼 입력칸에 줄을 채워주세요.";
        }
      }
      setOutput(buf.trim() || "(출력 없음)");
    } catch {
      setOutput("파이썬 실행 환경 로딩에 실패했어요.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="my-5 relative">
      <div className="absolute top-3 right-2.5 z-10 hidden items-center gap-2 sm:flex">
        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-1 rounded-md bg-pink-500/90 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-pink-500 disabled:opacity-50"
        >
          <PlayIcon className="h-3 w-3" />
          {running ? "실행 중" : "실행"}
        </button>
        <Copy content={code} />
      </div>
      <div className="relative">
        <pre {...preProps}>{children}</pre>
      </div>
      {showStdin && (
        <div className="not-prose mt-1">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-pink-500 dark:text-pink-300">
            <span className="flex items-center gap-1">
              <TerminalIcon className="h-3 w-3" />
              이 코드는 입력이 필요해요. 입력값을 넣고 다시 &quot;실행&quot;을 눌러주세요.
            </span>
            <button
              onClick={genSample}
              disabled={genningInput}
              className="rounded-md border border-pink-300 px-2 py-0.5 font-medium text-pink-600 transition-colors hover:bg-pink-50 disabled:opacity-50 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-white/10"
            >
              {genningInput ? "생성 중…" : "✨ 예시 입력 생성"}
            </button>
          </div>
          <textarea
            autoFocus
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            rows={4}
            placeholder="input()으로 읽을 입력값을 줄 단위로 넣어주세요&#10;예)&#10;8 8&#10;WBWBWBWB&#10;..."
            className="block w-full rounded-md border border-pink-200 bg-zinc-900/90 p-2 font-mono text-xs text-zinc-100 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-pink-400 dark:border-pink-900/50"
          />
        </div>
      )}
      {output !== null && (
        <div className="not-prose mt-1 whitespace-pre-wrap rounded-md border border-pink-200 bg-zinc-900/90 p-3 font-mono text-xs text-green-300 dark:border-pink-900/50">
          {output}
        </div>
      )}
    </div>
  );
}
