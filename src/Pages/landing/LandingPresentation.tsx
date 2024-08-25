import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

interface LandingPresentationProps {
  navigate: NavigateFunction;
}

const LandingPresentation: React.FC<LandingPresentationProps> = (props) => {
  const navigate = useNavigate();

  const bgColor = useColorModeValue("blue.500", "blue.700");
  const textColor = useColorModeValue("white", "gray.100");
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box>
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
      <Button onClick={() => navigate("/project")}>프로젝트페이지</Button>
    </Box>
  );
};

export default LandingPresentation;
