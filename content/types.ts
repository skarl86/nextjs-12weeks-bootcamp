// 강의 콘텐츠 데이터 모델
// 각 주차 강의는 정형화된 구조의 객체로 작성됩니다.

export type Level = "기초" | "중급" | "고급";

export type CodeBlock = {
  type: "code";
  lang: string;
  filename?: string;
  code: string;
};

export type Callout = {
  type: "callout";
  tone: "info" | "tip" | "warning" | "success";
  title?: string;
  body: string;
};

export type Paragraph = {
  type: "p";
  text: string;
};

export type List = {
  type: "list";
  ordered?: boolean;
  items: string[];
};

export type Heading = {
  type: "h3";
  text: string;
};

export type Block = Paragraph | List | Heading | CodeBlock | Callout;

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Reference = {
  label: string;
  url: string;
};

export type Week = {
  slug: string; // url 세그먼트 (예: "week-01")
  number: number; // 1..12
  level: Level;
  title: string;
  summary: string;
  objectives: string[];
  sections: Section[];
  exercises: string[];
  references: Reference[];
};
