// "use client";

// import React, { useRef } from "react";
// import PrintButton from "@/components/print-button";

// interface PrintButtonWrapperProps {
//   content: React.ReactNode;
// }

// export default function PrintButtonWrapper({ content }: PrintButtonWrapperProps) {
//   const contentRef = useRef<HTMLDivElement>(null); // ✅ null 체크 필수

//   return (
//     <div>
//       <div ref={contentRef}>{content}</div> {/* ✅ 프린트할 부분을 감싸줌 */}
//       <PrintButton contentRef={contentRef} /> {/* ✅ contentRef를 올바르게 전달 */}
//     </div>
//   );
// }
