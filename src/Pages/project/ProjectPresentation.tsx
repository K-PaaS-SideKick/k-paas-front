import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
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
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { NavigateFunction } from "react-router-dom";
import {
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  EditIcon,
} from "@chakra-ui/icons";

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
  toggleSortByViews: () => void;
  sortByViews: boolean;
  isWritePostModalOpen: boolean;
  onWritePostModalOpen: () => void;
  onWritePostModalClose: () => void;
}

const ProjectPresentation: React.FC<ProjectPresentationProps> = (props) => {
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");

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
          <Flex align="center">
            <Box fontWeight="bold" fontSize="xl" color="white" mr={4}>
              KPAAS
            </Box>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="검색하기" bg="white" />
            </InputGroup>
          </Flex>
          <Flex align="center">
            {props.isLoggedIn ? (
              <Box>
                <IconButton
                  aria-label="Messages"
                  icon={<BellIcon />}
                  variant="ghost"
                  color="white"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                  mr={2}
                />
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  variant="solid"
                  onClick={props.onWritePostModalOpen}
                  mr={4}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  새 포스트
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    p={0}
                    colorScheme="blue.500"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                    transition="all 0.2s"
                  >
                    <Avatar
                      size="sm"
                      src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
                    />
                  </MenuButton>
                  <MenuList borderRadius={"20px"}>
                    <MenuItem
                      textAlign={"center"}
                      height="100px"
                      borderRadius={"20px"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s"
                    >
                      <Avatar
                        size="sm"
                        src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
                      />
                      <Text ml={"2px"}>마이페이지</Text>
                    </MenuItem>
                    <MenuItem
                      borderRadius={"20px"}
                      onClick={props.onLogout}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s"
                    >
                      <TbLogout />
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Button
                  borderRadius={"15px"}
                  onClick={props.onLoginModalOpen}
                  mr={"10px"}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  <BiLogIn />
                  <Text ml="4px">로그인</Text>
                </Button>
                <Button
                  borderRadius={"15px"}
                  colorScheme="purple"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  회원가입
                </Button>
              </Box>
            )}
          </Flex>
        </Flex>

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
                        onClick={() =>
                          props.handleNewPostCategoryClick(category)
                        }
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

      {/* Main Content */}
      <Container maxW="container.xl" marginTop="80px">
        <Grid templateColumns="3fr 1fr" gap={6}>
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Posts List */}
              <Box>
                <Heading size="md" mb={2}>
                  Product 목록
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
              조회수: {(props.selectedPost?.views ?? 0) + 1}
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
