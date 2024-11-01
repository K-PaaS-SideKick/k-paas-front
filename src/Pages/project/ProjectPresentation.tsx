import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Image,
  VStack,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  Icon,
  Container,
  Grid,
  GridItem,
  Textarea,
  SimpleGrid,
  Stack,
  Spacer,
  HStack,
  Wrap,
  WrapItem,
  useBreakpointValue,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import {
  FaRegCommentDots,
  FaHeart,
  FaArrowUp,
  FaRegEye,
  FaThumbsUp,
} from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import {
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  EditIcon,
  HamburgerIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
import { User, MessageSquare, Lightbulb, Share2 } from "lucide-react";

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

interface ProjectPresentationProps {
  isLoginModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
  isRegisterModalOpen: boolean;
  onRegisterModalOpen: () => void;
  onRegisterModalClose: () => void;
  id: string | null;
  setId: (value: string | null) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  posts: Post[];
  categories: string[];
  selectedCategories: string[];
  handleCategoryClick: (category: string) => void;
  newPostTitle: string;
  setNewPostTitle: (value: string) => void;
  newPostContent: string;
  setNewPostContent: (value: string) => void;
  newPostCategories: string[];
  handleNewPostCategoryClick: (category: string) => void;
  handleNewPost: () => void;
  navigate: NavigateFunction;
  handlePostClick: (post: Post) => void;
  isPostModalOpen: boolean;
  onPostModalClose: () => void;
  selectedPost: Post | null;
  sortCriteria: "views" | "upvotes" | "date";
  toggleSortCriteria: (criteria: "views" | "upvotes" | "date") => void;
  isWritePostModalOpen: boolean;
  onWritePostModalOpen: () => void;
  onWritePostModalClose: () => void;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  handleUpvote: (postId: number) => void;
  handleLike: (postId: number) => void;
  handleCommentLike: (postId: number, commentId: number) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: (postId: number) => void;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  toggleExpand: () => void;
  getRelativeTime: (date: Date) => string;
}

const ProjectPresentation: React.FC<ProjectPresentationProps> = (props) => {
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {/* Header */}
      <Box
        bg="blue.500"
        py={2}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" flex={1}>
            <Box
              fontWeight="bold"
              fontSize="xl"
              color="white"
              mr={4}
              cursor="pointer"
              onClick={() => props.navigate("/")}
            >
              KPAAS
            </Box>
            <InputGroup maxW={isMobile ? "60%" : "400px"}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="검색하기" bg="white" />
            </InputGroup>
          </Flex>
          {isMobile ? (
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={props.onDrawerOpen}
              variant="ghost"
              color="white"
            />
          ) : (
            <Flex align="center">
              {props.isLoggedIn ? (
                <>
                  <IconButton
                    aria-label="Messages"
                    icon={<BellIcon />}
                    variant="ghost"
                    color="white"
                    mr={2}
                  />
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                    onClick={props.onWritePostModalOpen}
                    mr={4}
                  >
                    새 포스트
                  </Button>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={
                        <Avatar
                          size="sm"
                          src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
                        />
                      }
                      variant="ghost"
                      colorScheme="blue.500"
                    />
                    <MenuList borderRadius={"20px"}>
                      <MenuItem
                        borderRadius={"15px"}
                        onClick={() => props.navigate("/mypage")}
                      >
                        마이페이지
                      </MenuItem>
                      <MenuItem
                        borderRadius={"15px"}
                        onClick={() => props.navigate("/settings")}
                      >
                        설정
                      </MenuItem>
                      <MenuItem borderRadius={"15px"} onClick={props.onLogout}>
                        <TbLogout />
                        로그아웃
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Button onClick={props.onLoginModalOpen} mr={2}>
                    로그인
                  </Button>
                  <Button
                    onClick={props.onRegisterModalOpen}
                    colorScheme="purple"
                  >
                    회원가입
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" marginTop="80px">
        <Grid templateColumns={isMobile ? "1fr" : "3fr 1fr"} gap={6}>
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Posts List */}
              <Box>
                <Flex alignItems={"center"}>
                  <Heading size="md" mb={2}>
                    프로젝트 목록
                  </Heading>
                  <Spacer />
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      mb={2}
                    >
                      {props.sortCriteria === "date" ? (
                        <Text>날짜 순</Text>
                      ) : props.sortCriteria === "views" ? (
                        <Text>조휘수 순</Text>
                      ) : (
                        <Text>업보트 순</Text>
                      )}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => props.toggleSortCriteria("date")}
                      >
                        날짜 순
                      </MenuItem>
                      <MenuItem
                        onClick={() => props.toggleSortCriteria("views")}
                      >
                        조회수 순
                      </MenuItem>
                      <MenuItem
                        onClick={() => props.toggleSortCriteria("upvotes")}
                      >
                        업보트 순
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                {props.posts.length === 0 ? (
                  <Text align="center" mt={4} color="gray.500">
                    해당되는 프로젝트가 없습니다.
                  </Text>
                ) : (
                  props.posts.map((post) => (
                    <Box
                      key={post.pid}
                      p={4}
                      shadow="md"
                      borderWidth="1px"
                      mb={4}
                      onClick={() => props.handlePostClick(post)}
                      cursor="pointer"
                      borderRadius="lg"
                      bg="white"
                    >
                      <Flex direction="column">
                        <Heading size="sm" mb={2}>
                          {post.title}
                        </Heading>
                        <Wrap mb={4}>
                          {post.categories.map((category) => (
                            <WrapItem key={category}>
                              <Badge colorScheme="blue" mr={1}>
                                # {category}
                              </Badge>
                            </WrapItem>
                          ))}
                        </Wrap>
                        <Text fontSize="sm" color="gray.500" mb={4}>
                          {post.content.length > 100
                            ? `${post.content.slice(0, 100)}...더보기`
                            : post.content}
                        </Text>
                        <Flex align="center">
                          <Flex align="center" mr={4}>
                            <Icon
                              as={FaRegCommentDots}
                              mr={1}
                              color="gray.500"
                            />
                            <Text fontSize="sm" color="gray.500">
                              {post.comments.length}
                            </Text>
                          </Flex>
                          <Flex
                            align="center"
                            mr={4}
                            onClick={(e) => {
                              e.stopPropagation();
                              props.handleLike(post.pid || 0);
                            }}
                          >
                            <Icon as={FaHeart} mr={1} color="red.500" />
                            <Text fontSize="sm" color="gray.500">
                              {post.likes}
                            </Text>
                          </Flex>
                          <Flex
                            align="center"
                            mr={4}
                            onClick={(e) => {
                              e.stopPropagation();
                              props.handleUpvote(post.pid || 0);
                            }}
                          >
                            <Icon as={FaArrowUp} mr={1} color="gray.500" />
                            <Text fontSize="sm" color="gray.500">
                              {post.upvotes}
                            </Text>
                          </Flex>
                          <Spacer />
                          <Flex align="center">
                            <Icon as={FaRegEye} mr={1} color="gray.500" />
                            <Text fontSize="sm" color="gray.500">
                              {post.views}
                            </Text>
                          </Flex>
                        </Flex>
                        <Spacer />
                      </Flex>
                    </Box>
                  ))
                )}
              </Box>
            </VStack>
          </GridItem>

          {!isMobile && (
            <GridItem>
              <VStack
                spacing={100}
                align="stretch"
                position="sticky"
                top="80px"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
              >
                {/* Categories */}
                <Box>
                  <Heading size="md" mb={2}>
                    카테고리
                  </Heading>
                  <SimpleGrid columns={2} spacing={2}>
                    {props.categories.map((category) => (
                      <Button
                        key={category}
                        onClick={() => props.handleCategoryClick(category)}
                        colorScheme={
                          props.selectedCategories.includes(category)
                            ? "blue"
                            : "gray"
                        }
                        minWidth="100px"
                        textAlign="center"
                      >
                        {category}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Popular Posts */}
                <Box>
                  <Heading size="md" mb={2}>
                    인기 글
                  </Heading>
                  <Stack spacing={2}>
                    <Text fontWeight="bold">커뮤니티 인기글</Text>
                    {props.posts
                      .sort((a, b) => {
                        // 선택된 정렬 기준에 맞게 정렬 수행
                        if (props.sortCriteria === "views") {
                          return b.views - a.views;
                        } else if (props.sortCriteria === "upvotes") {
                          return b.upvotes - a.upvotes;
                        } else if (props.sortCriteria === "date") {
                          return b.createdAt.getTime() - a.createdAt.getTime();
                        }
                        return 0;
                      })
                      .slice(0, 5)
                      .map((post) => (
                        <Text
                          key={post.pid}
                          onClick={() => props.handlePostClick(post)}
                          cursor="pointer"
                          width="100%"
                          textAlign="left"
                          isTruncated
                        >
                          {post.title} (조회수: {post.views})
                        </Text>
                      ))}
                  </Stack>
                </Box>
              </VStack>
            </GridItem>
          )}
        </Grid>
      </Container>

      {/* Drawer for mobile */}
      <Drawer
        isOpen={props.isDrawerOpen}
        placement="right"
        onClose={props.onDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>메뉴</DrawerHeader>
          <DrawerBody>
            <VStack spacing={100} align="stretch">
              {/* Categories */}
              <Box>
                <Heading size="md" mb={2}>
                  카테고리
                </Heading>
                <SimpleGrid columns={2} spacing={2}>
                  {props.categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => {
                        props.handleCategoryClick(category);
                      }}
                      colorScheme={
                        props.selectedCategories.includes(category)
                          ? "blue"
                          : "gray"
                      }
                      minWidth="100px"
                      textAlign="center"
                    >
                      {category}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Popular Posts */}
              <Box>
                <Heading size="md" mb={2}>
                  인기 글
                </Heading>
                <Stack spacing={2}>
                  <Text fontWeight="bold">커뮤니티 인기글</Text>
                  {props.posts
                    .sort((a, b) => {
                      // 선택된 정렬 기준에 따라 정렬 수행
                      if (props.sortCriteria === "views") {
                        return b.views - a.views;
                      } else if (props.sortCriteria === "upvotes") {
                        return b.upvotes - a.upvotes;
                      } else if (props.sortCriteria === "date") {
                        return b.createdAt.getTime() - a.createdAt.getTime();
                      }
                      return 0;
                    })
                    .slice(0, 5) // 상위 5개의 인기 글만 표시
                    .map((post) => (
                      <Text
                        key={post.pid}
                        onClick={() => {
                          props.handlePostClick(post);
                          props.onDrawerClose(); // 인기 글 클릭 시 Drawer 닫기
                        }}
                        cursor="pointer"
                        width="100%"
                        textAlign="left"
                        isTruncated
                      >
                        {post.title} (조회수: {post.views})
                      </Text>
                    ))}
                </Stack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Mobile Bottom Bar */}
      {isMobile && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
          zIndex={1000}
        >
          <Flex justify="space-around" py={2}>
            {!props.isLoggedIn ? (
              <>
                <Button onClick={props.onLoginModalOpen} size="sm">
                  로그인
                </Button>
                <Button
                  onClick={props.onRegisterModalOpen}
                  size="sm"
                  colorScheme="purple"
                >
                  회원가입
                </Button>
              </>
            ) : (
              <>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={
                      <Avatar
                        size="sm"
                        src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
                      />
                    }
                    variant="ghost"
                    colorScheme="blue.500"
                  />
                  <MenuList borderRadius={"20px"}>
                    <MenuItem
                      borderRadius={"15px"}
                      onClick={() => props.navigate("/mypage")}
                    >
                      마이페이지
                    </MenuItem>
                    <MenuItem
                      borderRadius={"15px"}
                      onClick={() => props.navigate("/settings")}
                    >
                      설정
                    </MenuItem>
                    <MenuItem borderRadius={"15px"} onClick={props.onLogout}>
                      <TbLogout />
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </Menu>
                <IconButton
                  aria-label="Messages"
                  icon={<BellIcon />}
                  variant="ghost"
                />
                <IconButton
                  aria-label="New Post"
                  icon={<EditIcon />}
                  variant="ghost"
                  onClick={props.onWritePostModalOpen}
                />
              </>
            )}
          </Flex>
        </Box>
      )}

      {/* Login Modal */}
      <Modal
        isOpen={props.isLoginModalOpen}
        onClose={props.onLoginModalClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          bg={modalBg}
          borderRadius="lg"
          boxShadow="xl"
          p={6}
          maxW="400px"
        >
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            로그인
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody>
            <VStack spacing={6}>
              <FormControl isInvalid={!!props.error}>
                <FormLabel fontWeight="medium">아이디</FormLabel>
                <Input
                  value={props.id || ""}
                  onChange={(e) => props.setId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  size="lg"
                  bg={inputBg}
                  borderRadius="md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.onLogin();
                    }
                  }}
                />
              </FormControl>
              <FormControl isInvalid={!!props.error}>
                <FormLabel fontWeight="medium">비밀번호</FormLabel>
                <Input
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  size="lg"
                  bg={inputBg}
                  borderRadius="md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.onLogin();
                    }
                  }}
                />
                <FormErrorMessage>{props.error}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack width="100%">
              <Button
                colorScheme="blue"
                w="100%"
                onClick={props.onLogin}
                size="lg"
                fontWeight="bold"
                borderRadius="md"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                로그인
              </Button>
              <Button
                colorScheme="blue"
                w="100%"
                onClick={props.onLoginModalClose}
                size="lg"
                fontWeight="bold"
                borderRadius="md"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                닫기
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={props.isRegisterModalOpen}
        onClose={props.onRegisterModalClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">KPaaS 가입</ModalHeader>
          <ModalBody>
            <Text textAlign="center" mb={4}>
              KPaaS에 오신 것을 환영합니다.
            </Text>
            <VStack spacing={3} align="stretch">
              <Button leftIcon={<Icon as={User} />} variant="outline" size="lg">
                멋진 프로젝트를 찾고 싶어요
              </Button>
              <Button
                leftIcon={<Icon as={MessageSquare} />}
                variant="outline"
                size="lg"
              >
                프로젝트에 대한 피드백을 받고 싶어요
              </Button>
              <Button
                leftIcon={<Icon as={Lightbulb} />}
                variant="outline"
                size="lg"
              >
                다양한 영감을 얻고 싶어요
              </Button>
              <Button
                leftIcon={<Icon as={Share2} />}
                variant="outline"
                size="lg"
              >
                프로젝트를 사람들에게 알리고 싶어요
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={2}>
            <Button
              colorScheme="gray"
              width="100%"
              leftIcon={
                <Image
                  boxSize="20px"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google logo"
                />
              }
            >
              구글 계정으로 가입
            </Button>

            <Button
              colorScheme="gray"
              width="100%"
              leftIcon={
                <Image
                  boxSize="20px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Font_Awesome_5_brands_github.svg/991px-Font_Awesome_5_brands_github.svg.png"
                  alt="Google logo"
                />
              }
            >
              GitHub 계정으로 가입
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {props.isPostModalOpen ? (
        <Box
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          width="40%"
          p={4}
          bg="rgba(0, 0, 0, 0.8)"
          color="white"
          borderRadius="20px"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          zIndex="9999"
        >
          <Flex align="center">
            <Icon as={FaRegEye} mr={1} color="gray.300" />
            <Text fontSize="sm" color="gray.300">
              {props.selectedPost?.views}
            </Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              props.handleLike(props.selectedPost?.pid || 0);
            }}
          >
            <Icon as={FaHeart} mr={1} color="red.500" />
            <Text fontSize="sm" color="gray.300">
              {props.selectedPost?.likes}
            </Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              props.handleUpvote(props.selectedPost?.pid || 0);
            }}
          >
            <Icon as={FaArrowUp} mr={1} color="gray.300" />
            <Text fontSize="sm" color="gray.300">
              {props.selectedPost?.upvotes}
            </Text>
          </Flex>
        </Box>
      ) : (
        ""
      )}

      {/* Post Modal */}
      <Modal
        isOpen={props.isPostModalOpen}
        onClose={props.onPostModalClose}
        size="xl"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        {props.selectedPost && (
          <Flex
            position="fixed"
            top="20px"
            left="20px"
            zIndex="9999"
            backgroundColor="transparent"
            p={3}
            borderRadius="lg"
            boxShadow="lg"
            alignItems="center"
          >
            <Avatar
              size="sm"
              mr={3}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjAxWz1AAqMpD7himtogTPUxeY-m4d9p9sw&s"
            />
            <Box>
              <Text fontWeight="bold" fontSize="md" color="white">
                {props.selectedPost.authorId}님의 아티클
              </Text>
              <Text fontSize="sm" color="white">
                {props.getRelativeTime(new Date(props.selectedPost.createdAt))}
              </Text>
            </Box>
          </Flex>
        )}
        <ModalContent maxW="60%" minH="100vh" overflowY="auto" p={8}>
          <ModalCloseButton />
          <ModalBody>
            <Wrap mt={2}>
              {props.selectedPost?.categories.map((category) => (
                <WrapItem key={category}>
                  <Button size="xs" colorScheme="blue" variant="outline">
                    # {category}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
            <br />
            <Text color="gray">
              {props.selectedPost?.createdAt.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <br />
            <Heading size="lg">{props.selectedPost?.title}</Heading>
            <br />
            <Text>{props.selectedPost?.content}</Text>
            <br />
            <Divider my={4} />
            <Text fontWeight="bold">댓글:</Text>
            <Box mt={4}>
              <InputGroup>
                <Avatar
                  size="sm"
                  mr={3}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjAxWz1AAqMpD7himtogTPUxeY-m4d9p9sw&s"
                />
                <Input
                  value={props.newComment}
                  onChange={(e) => props.setNewComment(e.target.value)}
                  bgColor="gray.100"
                  placeholder="댓글을 입력하세요"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2rem" // 높이
                    w="2rem" // 너비 (높이와 동일하게 설정)
                    borderRadius="50%" // 버튼을 원형으로 설정
                    bgColor="white"
                    _hover={{ boxShadow: "0 0 0 3px rgba(0, 0, 255, 0.5)" }}
                    onClick={() =>
                      props.handleAddComment(props.selectedPost?.pid || 0)
                    }
                  >
                    <ArrowUpIcon color="blue" />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <br />
            </Box>
            {props.selectedPost?.comments.map((comment) => (
              <VStack align="start" spacing={4}>
                <Flex alignItems="center">
                  <Avatar
                    size="md"
                    name={comment.authorId}
                    mr={4}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjAxWz1AAqMpD7himtogTPUxeY-m4d9p9sw&s"
                  />
                  <Box>
                    <Text fontWeight="bold">{comment.authorId}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {props.getRelativeTime(new Date(comment.createdAt))}
                    </Text>
                  </Box>
                </Flex>

                <Box
                  key={comment.pid}
                  p={4}
                  bg="gray.50"
                  borderRadius="lg"
                  w="full"
                  boxShadow="sm"
                >
                  <Text fontSize="md" mb={2}>
                    {comment.content.length > 50
                      ? props.isExpanded
                        ? comment.content
                        : comment.content.slice(0, 50)
                      : comment.content}
                    {comment.content.length > 50 && (
                      <Button
                        size="xs"
                        variant="link"
                        onClick={props.toggleExpand}
                        ml={2}
                        color="blue.500"
                      >
                        {props.isExpanded ? "접기" : "...더보기"}
                      </Button>
                    )}
                  </Text>

                  <Flex justify="space-between" alignItems="center">
                    <Flex alignItems="center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          props.handleCommentLike(
                            props.selectedPost?.pid || 0,
                            comment.pid
                          )
                        }
                      >
                        <Icon as={FaThumbsUp} color="blue.500" />
                        <Text ml={2}>{comment.likes}</Text>
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </VStack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onPostModalClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Write Posts Modal */}
      <Modal
        isOpen={props.isWritePostModalOpen}
        onClose={props.onWritePostModalClose}
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          p={6}
          maxW="600px"
        >
          <ModalHeader
            fontSize="lg"
            fontWeight="bold"
            color="gray.800"
            textAlign="center"
            mt={2}
          >
            새 게시글 작성
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody>
            <Input
              placeholder="제목"
              value={props.newPostTitle}
              onChange={(e) => props.setNewPostTitle(e.target.value)}
              mb={2}
              width="100%"
            />
            <Textarea
              placeholder="내용"
              value={props.newPostContent}
              onChange={(e) => props.setNewPostContent(e.target.value)}
              mb={2}
              width="100%"
              height="300px"
            />
          </ModalBody>
          <ModalFooter>
            <Flex align="center" justify="flex-end" width="100%" gap={2}>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  minWidth="150px"
                >
                  카테고리 선택
                </MenuButton>
                <MenuList>
                  {props.categories.map((category) => (
                    <MenuItem
                      key={category}
                      onClick={() => props.handleNewPostCategoryClick(category)}
                    >
                      <Checkbox
                        isChecked={props.newPostCategories.includes(category)}
                        onChange={() =>
                          props.handleNewPostCategoryClick(category)
                        }
                      >
                        {category}
                      </Checkbox>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Button onClick={props.handleNewPost}>게시하기</Button>
              <Button onClick={props.onWritePostModalClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectPresentation;
