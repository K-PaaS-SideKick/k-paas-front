import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import ProjectPresentation from "./ProjectPresentation";
import { useAppContext } from "../../AppContext";
import { getMainPageProjects } from "../../Apis/apis";

interface Comment {
  pid: number;
  content: string;
  authorId: string;
  createdAt: Date;
  likes: number;
}

interface Post {
  pid: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  categories: string[];
  views: number;
  upvotes: number;
  likes: number;
  comments: Comment[];
}

const dummyPosts = [
  {
    pid: 1,
    title: "First Post",
    content:
      "엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 ",
    authorId: "user1",
    createdAt: new Date("2024-09-15T10:30:00"), // 2024년 9월 15일 10:30 AM
    categories: ["Python", "C++", "머신러닝"],
    views: 10,
    upvotes: 0,
    likes: 15,
    comments: [],
  },
  {
    pid: 2,
    title: "Second Post",
    content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    authorId: "user2",
    createdAt: new Date("2024-09-16T14:45:00"), // 2024년 9월 16일 2:45 PM
    categories: ["Python"],
    views: 20,
    upvotes: 5,
    likes: 3,
    comments: [],
  },
  {
    pid: 3,
    title: "Third Post",
    content: "제발 살려줘",
    authorId: "user1",
    createdAt: new Date("2024-09-14T08:20:00"), // 2024년 9월 14일 8:20 AM
    categories: ["Java"],
    views: 5,
    upvotes: 200,
    likes: 2,
    comments: [],
  },
  {
    pid: 4,
    title: "Fourth Post",
    content: "응애",
    authorId: "user4",
    createdAt: new Date("2024-09-17T18:00:00"), // 2024년 9월 17일 6:00 PM
    categories: ["웹 개발"],
    views: 8,
    upvotes: 10,
    likes: 1,
    comments: [],
  },
];

const categories = [
  "머신러닝",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "웹 개발",
];

const ProjectContainer: React.FC = () => {
  const navigate = useNavigate();

  const context = useAppContext();

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterModalOpen,
    onOpen: onRegisterModalOpen,
    onClose: onRegisterModalClose,
  } = useDisclosure();

  const {
    isOpen: isPostModalOpen,
    onOpen: onPostModalOpen,
    onClose: onPostModalClose,
  } = useDisclosure();
  const {
    isOpen: isWritePostModalOpen,
    onOpen: onWritePostModalOpen,
    onClose: onWritePostModalClose,
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const [id, setId] = useState<string | null>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [newComment, setNewComment] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(dummyPosts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategories, setNewPostCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortCriteria, setSortCriteria] = useState<
    "views" | "upvotes" | "date"
  >("date");

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    filterPosts();
  }, [selectedCategories, posts, sortCriteria]);

  useEffect(() => {
    if (selectedPost) {
      const updatedPost = posts.find((post) => post.pid === selectedPost.pid);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      }
    }
  }, [posts, selectedPost?.pid]); // 모달창 안에서 업보트를 누르거나 좋아요를 누르면 최신화

  const filterPosts = () => {
    let filtered = [...posts]; // Create a new array to avoid mutating the original

    // 카테고리 필터링
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        post.categories.some((category) =>
          selectedCategories.includes(category)
        )
      );
    }

    filtered.sort((a, b) => {
      if (sortCriteria === "views") {
        return b.views - a.views;
      } else if (sortCriteria === "upvotes") {
        return b.upvotes - a.upvotes;
      } else if (sortCriteria === "date") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    }); 

    setFilteredPosts(filtered);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onLogin = async () => {
    if (!id || !password) {
      setError("아이디/패스워드를 입력해주세요");
    } else {
      setError("");
      try {
        /* API 호출 */
        context.setUserId(id);
        context.setIsLoggedIn(true);
        onLoginModalClose();
        alert("로그인 성공");
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    context.setIsLoggedIn(false);
    context.logout();
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleNewPostCategoryClick = (category: string) => {
    setNewPostCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleNewPost = () => {
    if (!context.isLoggedIn) {
      onLoginModalOpen();
      return;
    }

    if (newPostTitle && newPostContent && newPostCategories.length > 0) {
      const newPost: Post = {
        pid: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        authorId: context.userId || "",
        createdAt: new Date(),
        categories: newPostCategories,
        views: 0,
        upvotes: 0,
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategories([]);
      onWritePostModalClose();
    } else {
      alert("제목, 내용을 입력하고 최소한 하나의 카테고리를 선택해주세요.");
    }
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

  const handleUpvote = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.pid === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.pid === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      pid: Date.now(),
      authorId: context.userId || "anonymous",
      content: newComment,
      createdAt: new Date(),
      likes: 0,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.pid === postId
          ? { ...post, comments: [...post.comments, newCommentObj] }
          : post
      )
    );

    setNewComment("");
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.pid === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.pid === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    onPostModalOpen();
    // Increase view count
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.pid === post.pid ? { ...p, views: p.views + 1 } : p
      )
    );
  };

  const toggleSortCriteria = (criteria: "views" | "upvotes" | "date") => {
    setSortCriteria(criteria);
  };

  const handleWritePostModalClose = () => {
    onWritePostModalClose(); // 모달을 닫는 기존 함수 호출
    setNewPostCategories([]); // 체크박스 상태 초기화
    setNewPostTitle(""); // 제목 초기화
    setNewPostContent(""); // 내용 초기화
  };

  return (
    <ProjectPresentation
      isLoginModalOpen={isLoginModalOpen}
      onLoginModalOpen={onLoginModalOpen}
      onLoginModalClose={onLoginModalClose}
      isRegisterModalOpen={isRegisterModalOpen}
      onRegisterModalOpen={onRegisterModalOpen}
      onRegisterModalClose={onRegisterModalClose}
      isDrawerOpen={isDrawerOpen}
      onDrawerOpen={onDrawerOpen}
      onDrawerClose={onDrawerClose}
      id={id}
      setId={setId}
      password={password}
      setPassword={setPassword}
      error={error}
      isLoggedIn={context.isLoggedIn}
      onLogin={onLogin}
      onLogout={onLogout}
      posts={filteredPosts}
      categories={categories}
      selectedCategories={selectedCategories}
      handleCategoryClick={handleCategoryClick}
      newPostTitle={newPostTitle}
      setNewPostTitle={setNewPostTitle}
      newPostContent={newPostContent}
      setNewPostContent={setNewPostContent}
      newPostCategories={newPostCategories}
      handleNewPostCategoryClick={handleNewPostCategoryClick}
      handleNewPost={handleNewPost}
      navigate={navigate}
      handlePostClick={handlePostClick}
      isPostModalOpen={isPostModalOpen}
      onPostModalClose={onPostModalClose}
      selectedPost={selectedPost}
      sortCriteria={sortCriteria} // 추가: 정렬 기준 전달
      toggleSortCriteria={toggleSortCriteria} // 추가: 정렬 기준 변경 함수 전달
      isWritePostModalOpen={isWritePostModalOpen}
      onWritePostModalOpen={onWritePostModalOpen}
      onWritePostModalClose={handleWritePostModalClose}
      handleUpvote={handleUpvote}
      handleLike={handleLike}
      handleCommentLike={handleCommentLike}
      newComment={newComment}
      setNewComment={setNewComment}
      handleAddComment={handleAddComment}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      toggleExpand={toggleExpand}
      getRelativeTime={getRelativeTime}
    />
  );
};

export default ProjectContainer;
