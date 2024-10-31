import React, { useState, useEffect } from "react";
import axios from "axios";
import { filter, useDisclosure } from "@chakra-ui/react";
import LandingPresentation from "./LandingPresentation";
import { useNavigate } from "react-router-dom";
import {
  MainPageResponse,
  SelectedPageResponse,
} from "../../Interfaces/project";
import {
  ProjectPost,
  SelectedPost,
  categoryMap,
  Comment,
} from "../../Interfaces/interfaces";
import { getMainPageProjects, getProjectsDetail } from "../../Apis/apis";

const LandingContainer: React.FC = () => {
  const {
    isOpen: isPostModalOpen,
    onOpen: onPostModalOpen,
    onClose: onPostModalClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<SelectedPost>({
    pid: 1,
    uid: "user001",
    title: "프론트엔드 프로젝트",
    createdAt: "2024-10-30T10:00:00Z",
    content:
      "React와 TypeScript를 활용한 간단한 웹 애플리케이션 개발 프로젝트입니다.",
    repoLink: "",
    upvotes: 0,
    comments: 0,
    views: 0,
    scraps: 0,
    status: "",
    maxMembers: 4,
    currentMembers: 2,
    category: ["웹"],
  });
  const [comments, setComments] = useState<Comment[]>();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isExpanded, setIsExpanded] = useState(false);

  const [posts, setPosts] = useState<ProjectPost[]>([
    {
      pid: 1,
      uid: "user001",
      title: "프론트엔드 프로젝트",
      createdAt: "2024-10-30T10:00:00Z",
      content:
        "React와 TypeScript를 활용한 간단한 웹 애플리케이션 개발 프로젝트입니다.",
      upvotes: 25,
      views: 200,
      scraps: 12,
      maxMembers: 4,
      currentMembers: 2,
      categories: ["웹"],
    },
  ]);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const onClickPost = (postId: number) => {
    getProjectsDetail(postId)
      .then((response) => {
        setSelectedPost((prev: SelectedPost) => {
          return {
            ...prev,
            pid: response.pid,
            uid: response.uid,
            title: response.title,
            createdAt: response.date,
            content: response.content,
            upvotes: response.upvotes,
            views: response.views,
            scraps: response.scraps,
            maxMembers: response.max_members,
            currentMembers: response.current_members,
            categories: response.categories.map(
              (catId: number) => categoryMap[catId] || "기타"
            ),
          };
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        onPostModalOpen();
      });
  };
  const handlePostClick = (post: SelectedPost) => {
    setSelectedPost(post);
    onPostModalOpen();
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime(); // 시간 차이 (밀리초)

    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `약 ${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `약 ${diffInHours}시간 전`;
    } else {
      return `약 ${diffInDays}일 전`;
    }
  };

  // 더미 데이터
  const dummyData: ProjectPost[] = [
    {
      pid: 1,
      uid: "user001",
      title: "프론트엔드 프로젝트",
      createdAt: "2024-10-30T10:00:00Z",
      content:
        "React와 TypeScript를 활용한 간단한 웹 애플리케이션 개발 프로젝트입니다.",
      upvotes: 25,
      views: 200,
      scraps: 12,
      maxMembers: 4,
      currentMembers: 2,
      categories: ["웹"],
    },
    {
      pid: 2,
      uid: "user002",
      title: "백엔드 프로젝트",
      createdAt: "2024-10-29T09:30:00Z",
      content:
        "Node.js와 Express로 서버를 구축하고 REST API를 만들어 보는 프로젝트입니다.",
      upvotes: 18,
      views: 150,
      scraps: 7,
      maxMembers: 3,
      currentMembers: 1,
      categories: ["웹"],
    },
    {
      pid: 3,
      uid: "user003",
      title: "알고리즘 스터디",
      createdAt: "2024-10-28T14:20:00Z",
      content:
        "매주 다른 알고리즘 문제를 풀고 코드를 리뷰하는 알고리즘 스터디 프로젝트입니다.",
      upvotes: 30,
      views: 220,
      scraps: 15,
      maxMembers: 6,
      currentMembers: 4,
      categories: ["웹"],
    },
    {
      pid: 4,
      uid: "user004",
      title: "모바일 앱 개발",
      createdAt: "2024-10-27T08:10:00Z",
      content: "Flutter로 크로스플랫폼 모바일 앱을 개발해 보는 프로젝트입니다.",
      upvotes: 40,
      views: 300,
      scraps: 20,
      maxMembers: 5,
      currentMembers: 3,
      categories: ["웹"],
    },
  ];

  useEffect(() => {
    getMainPageProjects({
      page: 0,
      size: 10,
      sort: "views,DESC",
    })
      .then((response) => {
        const filteredPosts = response.content.map((post) => ({
          pid: post.pid,
          uid: post.uid,
          title: post.title,
          createdAt: post.date,
          content: post.content,
          upvotes: post.upvotes,
          views: post.views,
          scraps: post.scraps,
          maxMembers: post.max_members,
          currentMembers: post.current_members,
          categories: post.category.map(
            (catId: number) => categoryMap[catId] || "기타"
          ),
        }));
        setPosts(filteredPosts); // API 응답으로 상태 설정
        console.log(filteredPosts);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setIsLoading(false); // 로딩 상태 종료
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <LandingPresentation
      navigate={navigate}
      posts={posts}
      isPostModalOpen={isPostModalOpen}
      onPostModalClose={onPostModalClose}
      selectedPost={selectedPost}
      onClickPost={onClickPost}
      getRelativeTime={getRelativeTime}
      comments={comments}
      setComments={setComments}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      toggleExpand={toggleExpand}
    />
  );
};

export default LandingContainer;
