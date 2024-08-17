import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  VStack,
  Text,
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
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { NavigateFunction } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  categories: string[];
  views: number;
}

interface ProjectPresentationProps {
  isLoginModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
  id: string;
  setId: (value: string) => void;
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
  toggleSortByViews: () => void;
  sortByViews: boolean;
}

const ProjectPresentation: React.FC<ProjectPresentationProps> = (props) => {
  const bgColor = useColorModeValue("blue.500", "blue.700");
  const textColor = useColorModeValue("white", "gray.100");
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box>
      {/* Header */}
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        bg={bgColor}
        color={textColor}
        boxShadow="md"
        width="100%"
      >
        <Container maxW="100%">
          <Flex
            align="center"
            justify="space-between"
            wrap="nowrap"
            padding="1rem"
          >
            <Heading size="lg" fontWeight="bold">
              KPAAS
            </Heading>
            <HStack spacing={4}>
              <Button onClick={() => props.navigate("/project")}>
                프로젝트
              </Button>
              <Button onClick={() => props.navigate("/community")}>
                커뮤니티
              </Button>
              {props.isLoggedIn ? (
                <Button
                  colorScheme="red"
                  onClick={props.onLogout}
                  leftIcon={<Icon as={TbLogout} />}
                  variant="outline"
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  colorScheme="white"
                  onClick={props.onLoginModalOpen}
                  leftIcon={<Icon as={BiLogIn} />}
                  variant="outline"
                >
                  로그인
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pt="80px">
        <Grid templateColumns="3fr 1fr" gap={6}>
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* New Post Form */}
              <Box>
                <Heading size="md" mb={2}>
                  새 게시글 작성
                </Heading>
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
                />
                <Text mb={2}>카테고리 선택:</Text>
                <Wrap mb={2}>
                  {props.categories.map((category) => (
                    <WrapItem key={category}>
                      <Button
                        size="sm"
                        colorScheme={
                          props.newPostCategories.includes(category)
                            ? "blue"
                            : "gray"
                        }
                        onClick={() =>
                          props.handleNewPostCategoryClick(category)
                        }
                        minWidth="80px"
                      >
                        {category}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
                <Button onClick={props.handleNewPost}>게시하기</Button>
              </Box>

              {/* Posts List */}
              <Box>
                <Heading size="md" mb={2}>
                  게시글 목록
                </Heading>
                <Button mb={4} onClick={props.toggleSortByViews}>
                  {props.sortByViews ? "기본 정렬" : "조회수순 정렬"}
                </Button>
                {props.posts.map((post) => (
                  <Box
                    key={post.id}
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    mb={4}
                    onClick={() => props.handlePostClick(post)}
                    cursor="pointer"
                  >
                    <Heading size="sm">{post.title}</Heading>
                    <Wrap mt={2}>
                      {post.categories.map((category) => (
                        <WrapItem key={category}>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            variant="outline"
                            minWidth="70px"
                          >
                            {category}
                          </Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                    <Text mt={2} fontSize="sm" color="gray.500">
                      조회수: {post.views}
                    </Text>
                  </Box>
                ))}
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack
              spacing={4}
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
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((post) => (
                      <Text
                        key={post.id}
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
        </Grid>
      </Container>

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
                  value={props.id}
                  onChange={(e) => props.setId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  size="lg"
                  bg={inputBg}
                  borderRadius="md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.onLogin(); // Enter 키를 누르면 로그인 버튼이 클릭됩니다.
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
                      props.onLogin(); // Enter 키를 누르면 로그인 버튼이 클릭됩니다.
                    }
                  }}
                />
                <FormErrorMessage>{props.error}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Post Modal */}
      <Modal
        isOpen={props.isPostModalOpen}
        onClose={props.onPostModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.selectedPost?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{props.selectedPost?.content}</Text>
            <Text mt={4} fontWeight="bold">
              카테고리:
            </Text>
            <Wrap mt={2}>
              {props.selectedPost?.categories.map((category) => (
                <WrapItem key={category}>
                  <Button size="xs" colorScheme="blue" variant="outline">
                    {category}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
            <Text mt={4} fontWeight="bold">
              조회수: {props.selectedPost?.views}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onPostModalClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectPresentation;
