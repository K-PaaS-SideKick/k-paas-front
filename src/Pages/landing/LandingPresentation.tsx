import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  SimpleGrid,
  Container,
  Heading,
  Text,
  HStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Wrap,
  WrapItem,
  useColorModeValue,
  Divider,
  InputGroup,
  Input,
  VStack,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
import "./landing.css";
import {
  ProjectPost,
  categoryMap,
  SelectedPost,
  Comment,
} from "../../Interfaces/interfaces";
import {
  FaRegCommentDots,
  FaHeart,
  FaArrowUp,
  FaRegEye,
  FaThumbsUp,
} from "react-icons/fa";

interface LandingPresentationProps {
  navigate: NavigateFunction;
  posts: ProjectPost[];
  isPostModalOpen: boolean;
  onPostModalClose: () => void;
  selectedPost: SelectedPost | null;
  onClickPost: (pid: number) => void;
  getRelativeTime: (date: Date) => string;
  comments: Comment[] | undefined;
  setComments: (comment: Comment[] | undefined) => void;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  toggleExpand: () => void;
}

const LandingPresentation: React.FC<LandingPresentationProps> = (props) => {
  const navigate = useNavigate();

  const bgColor = useColorModeValue("blue.500", "blue.3000");
  const textColor = useColorModeValue("white", "gray.100");
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.3000");

  const breakpointColumnsObj = {
    default: 3,
    1300: 2,
    800: 1,
  };

  return (
    <Box>
      {/* header */}
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
            <Heading
              onClick={() => props.navigate("/")}
              size="lg"
              fontWeight="bold"
            >
              SideKick
            </Heading>
            <HStack spacing={4}>
              <Button onClick={() => props.navigate("/project")}>
                프로젝트
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {props.posts.map((post) => (
          <Box
            key={post.pid}
            padding="20px"
            border="2px"
            borderRadius="5px"
            borderColor="gray.200"
            marginBottom="10px"
            bg="white"
            overflow="hidden"
            onClick={() => props.onClickPost(post.pid)}
          >
            <Heading margin="0 0 10px 0">{post.title}</Heading>
            <Text>{post.content}</Text>
          </Box>
        ))}
      </Masonry>

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
            <Box>
              <Text fontWeight="bold" fontSize="md" color="white">
                {props.selectedPost.uid}님의 아티클
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
              {props.selectedPost?.category.map((category) => (
                <WrapItem key={category}>
                  <Button size="xs" colorScheme="blue" variant="outline">
                    # {category}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
            <br />
            <Text color="gray">
              {props.selectedPost?.createdAt &&
                new Date(props.selectedPost.createdAt).toLocaleDateString(
                  "ko-KR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
            </Text>
            <br />
            <Heading size="lg">{props.selectedPost?.title}</Heading>
            <br />
            <Text>{props.selectedPost?.content}</Text>
            <br />
            <Divider my={4} />
            <Text fontWeight="bold">댓글:</Text>
            <Box mt={4}>
              <br />
            </Box>
            {props?.comments?.map((comment) => (
              <VStack align="start" spacing={4}>
                <Flex alignItems="center">
                  <Avatar
                    size="md"
                    name={comment.uid}
                    mr={4}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjAxWz1AAqMpD7himtogTPUxeY-m4d9p9sw&s"
                  />
                  <Box>
                    <Text fontWeight="bold">{comment.uid}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {props.getRelativeTime(new Date(comment.createdAt))}
                    </Text>
                  </Box>
                </Flex>

                <Box
                  key={comment.cid}
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
                    {/* <Flex alignItems="center">
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
                    </Flex> */}
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
    </Box>
  );
};

export default LandingPresentation;
