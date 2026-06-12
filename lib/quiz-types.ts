// 퀴즈 대상 문서
export type QuizDoc = {
  title: string; // frontmatter title
  href: string; // /backend/kafka/install 같은 전체 경로
  section: string; // cs | backend | devops | ai | code
  description?: string;
};

// 문제 한 개
export type QuizQuestion = {
  question: string;
  options: string[]; // 4지선다(길이4) 또는 O/X(길이2)
  answerIndex: number; // 정답 인덱스
  explanation: string; // 해설
  sourceHref: string; // 원본 문서 링크
  anchor?: string; // 원본 문서 내 헤딩 슬러그 (정확 매핑용)
};
