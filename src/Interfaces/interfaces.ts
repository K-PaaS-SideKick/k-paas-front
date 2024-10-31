export interface ProjectPost {
  pid: number;
  uid: string;
  title: string;
  createdAt: string;
  content: string;
  upvotes: number;
  views: number;
  scraps: number;
  maxMembers: number;
  currentMembers: number;
  categories: string[];
}
export interface SelectedPost {
  pid: number;
  uid: string;
  title: string;
  createdAt: string;
  content: string;
  repoLink: string;
  upvotes: number;
  comments: number;
  views: number;
  scraps: number;
  status: string;
  maxMembers: number;
  currentMembers: number;
  category: string[];
}

export interface Comment {
  cid: number;
  uid: string;
  content: string;
  createdAt: string;
}

export const categoryMap: { [key: number]: string } = {
  1: "웹 개발",
  2: "모바일 앱 개발",
  3: "데이터 사이언스",
  4: "인공지능",
  5: "게임 개발",
  6: "보안",
  // 필요한 카테고리를 추가로 정의
};
