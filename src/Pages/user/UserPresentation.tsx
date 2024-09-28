import React from "react";
import {
  Box,
  Container,
  Text,
  HStack,
  Spacer,
  Button,
  Flex,
  Image,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

interface UserPresentationProps {
  id: string | null;
  navigate: NavigateFunction;
}

const UserPresentation: React.FC<UserPresentationProps> = (props) => {
  const navigate = useNavigate();

  const bgColor = useColorModeValue("blue.500", "blue.3000");
  const textColor = useColorModeValue("white", "gray.100");

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
            <Text
              onClick={() => props.navigate("/")}
              size="lg"
              fontWeight="bold"
            >
              KPAAS
            </Text>
          </Flex>
        </Container>
      </Box>
      <Flex marginTop="100px"></Flex>
      <Flex margin="10px auto 10px auto" width="70%" height="200px">
        {/* 프로필 사진 */}
        <Image
          src="https://bit.ly/naruto-sage"
          alt="naruto"
          margin="10px 20px 10px 10px"
          borderRadius="50%" // 원형으로 자르기
          boxSize="180px" // 사진의 고정 크기 설정
          objectFit="cover" // 사진이 박스를 채우도록 설정
          flexShrink={0} // Flex 안에서 크기가 줄어들지 않도록 설정
        />

        <Box
          backgroundColor="#F2F1E9"
          borderRadius="10px"
          padding="10px"
          margin="0 10px 0 auto"
          width="100%"
        >
          <Box>
            <Text fontSize="2xl">안녕하세요 엄재윤 입니다.</Text>
            <Button>변경</Button>
          </Box>
          <Box>
            <Text>www.ewtet.wet</Text>
          </Box>
          <Box>SNS</Box>
        </Box>
      </Flex>
      <Box height="10px"></Box>
      <Box margin="10px auto 10px auto" width="70%" height="200px">
        <Button margin="10px">프로젝트</Button>
        <Button margin="10px">커뮤니티</Button>
        <Box
          borderTop="1px solid grey "
          padding="10px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text as="b" fontSize="2xl" display="inline">
              제목
            </Text>
            <Text fontSize="md" display="inline" marginLeft="5px">
              [조회수]
            </Text>
          </Box>
          <Text color="grey" fontSize="md">
            카테고리 | 글쓴 날짜
          </Text>
        </Box>{" "}
        <Box
          borderTop="1px solid grey "
          padding="10px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text as="b" fontSize="2xl" display="inline">
              제목
            </Text>
            <Text fontSize="md" display="inline" marginLeft="5px">
              [조회수]
            </Text>
          </Box>
          <Text color="grey" fontSize="md">
            카테고리 | 글쓴 날짜
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPresentation;
