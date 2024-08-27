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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { NavigateFunction } from "react-router-dom";
import {
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { User, MessageSquare, Lightbulb, Share2 } from "lucide-react";

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
  toggleSortByViews: () => void;
  sortByViews: boolean;
  isWritePostModalOpen: boolean;
  onWritePostModalOpen: () => void;
  onWritePostModalClose: () => void;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
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
            <Box fontWeight="bold" fontSize="xl" color="white" mr={4}>
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
                      <MenuItem borderRadius={"15px"}>마이페이지</MenuItem>
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

          {!isMobile && (
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
          )}
        </Grid>
      </Container>

      {/* Drawer for mobile */}
      <Drawer isOpen={props.isDrawerOpen} placement="right" onClose={props.onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>메뉴</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
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
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((post) => (
                      <Text
                        key={post.id}
                        onClick={() => {
                          props.handlePostClick(post);
                          props.onDrawerClose();
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
                    <MenuItem borderRadius={"15px"}>마이페이지</MenuItem>
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
                  colorScheme="blue"
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
