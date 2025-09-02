"use client";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type Props = {
  chart: string;          // mermaid 소스
  config?: any;           // mermaid 설정 객체
  className?: string;
};

export default function Mermaid({ chart, config, className }: Props) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // mermaid 초기화
    try {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "default",
        fontFamily: "monospace",
        ...(config || {}),
      });
    } catch (err) {
      setError("Mermaid 초기화 실패");
      return;
    }

    // DOM이 준비된 후 렌더링
    const renderChart = async () => {
      try {
        // 고유한 ID 생성
        const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const { svg } = await mermaid.render(uniqueId, chart);
        
        // SVG에서 id 속성을 고유한 값으로 변경 (React에서 중복 ID 문제 방지)
        const cleanSvg = svg.replace(/id="[^"]*"/g, `id="${uniqueId}"`);
        
        setSvgContent(cleanSvg);
        setIsRendered(true);
      } catch (error) {
        setError(`렌더링 오류: ${error}`);
      }
    };

    // 약간의 지연을 두고 렌더링 (DOM 준비 보장)
    const timer = setTimeout(renderChart, 100);
    
    return () => clearTimeout(timer);
  }, [chart, config]);

  if (error) {
    return (
      <div className={`${className} border border-red-300 bg-red-50 p-4 rounded`}>
        <p className="text-red-600 font-medium">Mermaid 오류:</p>
        <p className="text-red-500 text-sm">{error}</p>
        <details className="mt-2">
          <summary className="text-red-600 cursor-pointer">차트 코드 보기</summary>
          <pre className="text-xs bg-red-100 p-2 mt-2 rounded overflow-auto">{chart}</pre>
        </details>
      </div>
    );
  }

  return (
    <div className={className}>
      {!isRendered ? (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          차트를 렌더링 중...
        </div>
      ) : (
        <div 
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: '100%', overflow: 'auto' }}
        />
      )}
    </div>
  );
}
