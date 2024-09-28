import React from "react";
import {
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
} from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
import "./landing.css";

interface LandingPresentationProps {
  navigate: NavigateFunction;
  post: Post[];
  handlePostClick: (post: Post) => void;
  isPostModalOpen: boolean;
  onPostModalClose: () => void;
  selectedPost: Post | null;
}
interface Post {
  id: number;
  title: string;
  content: string;
  categories: string[];
  views: number;
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
              KPAAS
            </Heading>
            <HStack spacing={4}>
              <Button onClick={() => props.navigate("/project")}>
                프로젝트
              </Button>
              <Button onClick={() => props.navigate("/community")}>
                커뮤니티
              </Button>
              {/* {props.isLoggedIn ? (
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
              )} */}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {props.post.map((post) => (
          <Box
            key={post.id}
            padding="20px"
            border="2px"
            borderRadius="5px"
            borderColor="gray.200"
            marginBottom="10px"
            bg="white"
            overflow="hidden"
            onClick={() => props.handlePostClick(post)}
          >
            <Heading margin="0 0 10px 0">{post.title}</Heading>
            {post.categories.map((category) => (
              <Button
                key={category}
                size="xs"
                colorScheme="gray"
                textAlign="center"
                margin="0 5px 10px 0"
              >
                {category}
              </Button>
            ))}
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

export default LandingPresentation;
