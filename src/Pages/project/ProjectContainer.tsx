import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import ProjectPresentation from "./ProjectPresentation";
import { useAppContext } from "../../AppContext";

interface Post {
  id: number;
  title: string;
  content: string;
  categories: string[];
  views: number;
}

const dummyPosts: Post[] = [
  { id: 1, title: "First Post", content: "엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 엄재윤 ", categories: ["Python"], views: 100 },
  { id: 2, title: "Second Post", content: "메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 메가커피 아샷추 맛있네 ", categories: ["Java", "머신러닝"], views: 80 },
  { id: 3, title: "Third Post", content: "Third", categories: ["JavaScript", "웹 개발"], views: 120 },
  { id: 4, title: "Fourth Post", content: "네 번째", categories: ["C++", "머신러닝"], views: 90 },
];

const categories = ["머신러닝", "C++", "Java", "Python", "JavaScript", "웹 개발"];

const ProjectContainer: React.FC = () => {
  const navigate = useNavigate();

  const context = useAppContext();

  const { isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
  const { isOpen: isRegisterModalOpen, onOpen: onRegisterModalOpen, onClose: onRegisterModalClose } = useDisclosure();

  const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure();
  const { isOpen: isWritePostModalOpen, onOpen: onWritePostModalOpen, onClose: onWritePostModalClose } = useDisclosure();

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  
  const [id, setId] = useState<string | null>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(dummyPosts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategories, setNewPostCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortByViews, setSortByViews] = useState<boolean>(false);

  useEffect(() => {
    filterPosts();
  }, [selectedCategories, posts, sortByViews]);

  const filterPosts = () => {
    let filtered = posts;
    if (selectedCategories.length > 0) {
      filtered = posts.filter(post => 
        post.categories.some(category => selectedCategories.includes(category))
      );
    }
    if (sortByViews) {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    }
    setFilteredPosts(filtered);
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
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleNewPostCategoryClick = (category: string) => {
    setNewPostCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleNewPost = () => {
    if (!context.isLoggedIn) {
      onLoginModalOpen();
      return;
    }

    if (newPostTitle && newPostContent && newPostCategories.length > 0) {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        categories: newPostCategories,
        views: 0
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

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    onPostModalOpen();
    // Increase view count
    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      )
    );
  };

  const toggleSortByViews = () => {
    setSortByViews(!sortByViews);
  };

  const handleWritePostModalClose = () => {
    onWritePostModalClose(); // 모달을 닫는 기존 함수 호출
    setNewPostCategories([]); // 체크박스 상태 초기화
    setNewPostTitle("");      // 제목 초기화
    setNewPostContent("");    // 내용 초기화
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
      toggleSortByViews={toggleSortByViews}
      sortByViews={sortByViews}
      isWritePostModalOpen={isWritePostModalOpen}
      onWritePostModalOpen={onWritePostModalOpen}
      onWritePostModalClose={handleWritePostModalClose}  // 수정된 함수 사용
    />
  );
};

export default ProjectContainer;
