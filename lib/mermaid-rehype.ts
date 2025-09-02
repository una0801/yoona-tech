import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

export function rehypeMermaid() {
  return function (tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children?.[0]?.type === 'element') {
        const codeElement = node.children[0];
        const className = codeElement.properties?.className;
        const isMermaid = Array.isArray(className) 
          ? className.some(cls => typeof cls === 'string' && cls.includes('language-mermaid'))
          : typeof className === 'string' && className.includes('language-mermaid');
          
        if (codeElement.tagName === 'code' && isMermaid) {
          // mermaid 코드 블록을 mermaid div로 변환
          const mermaidCode = codeElement.children?.[0]?.type === 'text' 
            ? codeElement.children[0].value 
            : '';
          
          // 원래 pre 태그를 mermaid div로 교체
          node.tagName = 'div';
          node.properties = {
            ...node.properties,
            className: 'mermaid-chart',
            'data-mermaid': mermaidCode
          };
          node.children = [];
        }
      }
    });
  };
}
