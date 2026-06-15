import { ComponentProps, ReactNode } from "react";
import Copy from "./copy";
import Mermaid from "../mermaid";
import RunnablePython from "./runnable-python";

// children(code 요소)의 className에 특정 language가 있는지 확인
function hasLanguage(children: ReactNode, lang: string): boolean {
  if (typeof children === "object" && children !== null && "props" in children) {
    const cls = (children.props as Record<string, unknown>).className;
    return typeof cls === "string" && cls.includes(`language-${lang}`);
  }
  return false;
}

export default function Pre({
  children,
  raw,
  ...rest
}: ComponentProps<"pre"> & { raw?: string }) {
  // children이 code 요소인지 확인하고 mermaid 코드 블록인지 체크
  const isMermaidBlock = (children: ReactNode): boolean => {
    if (typeof children === 'object' && children !== null && 'props' in children) {
      const childProps = children.props as Record<string, unknown>;
      if (childProps.className && typeof childProps.className === 'string') {
        return childProps.className.includes('language-mermaid');
      }
    }
    return false;
  };

  // mermaid 코드 블록인 경우 Mermaid 컴포넌트로 렌더링
  if (isMermaidBlock(children)) {
    const mermaidCode = raw || '';
    return (
      <div className="my-5 relative">
        <div className="absolute top-3 right-2.5 z-10 sm:block hidden">
          <Copy content={mermaidCode} />
        </div>
        <div className="relative">
          <Mermaid chart={mermaidCode} className="w-full" />
        </div>
      </div>
    );
  }

  // python 코드 블록이면 실행 가능하게 렌더링
  if (hasLanguage(children, "python") || hasLanguage(children, "py")) {
    return (
      <RunnablePython code={raw ?? ""} preProps={rest}>
        {children}
      </RunnablePython>
    );
  }

  // 일반 코드 블록인 경우 기존 방식으로 렌더링
  return (
    <div className="my-5 relative">
      <div className="absolute top-3 right-2.5 z-10 sm:block hidden">
        <Copy content={raw!} />
      </div>
      <div className="relative">
        <pre {...rest}>{children}</pre>
      </div>
    </div>
  );
}
