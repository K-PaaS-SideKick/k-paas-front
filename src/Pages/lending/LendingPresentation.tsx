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
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";

interface LendingPresentationProps {
  onLogin: () => void;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoginModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
  id: string;
  setId: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const LendingPresentation: React.FC<LendingPresentationProps> = (props) => {
  const bgColor = useColorModeValue("blue.500", "blue.700");
  const textColor = useColorModeValue("white", "gray.100");
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box>
      {/* Fixed Header */}
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
      >
        <Container maxW="container.xl">
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1rem"
          >
            <Heading size="lg" fontWeight="bold">KPAAS</Heading>
            {props.isLoggedIn ? (
              <Button colorScheme="red" onClick={props.onLogout} leftIcon={<Icon as={TbLogout} />} variant="outline">
                로그아웃
              </Button>
            ) : (
              <Button colorScheme="white" onClick={props.onLoginModalOpen} leftIcon={<Icon as={BiLogIn} />} variant="outline">
                로그인
              </Button>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pt="80px">
        <Box flex={1} p={8}>
          <Heading mb={6}>환영합니다!</Heading>
          <Text fontSize="xl" mb={4}>
            랜딩페이지
          </Text>
          {/* Add more content here */}
        </Box>
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
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">로그인</ModalHeader>
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
    </Box>
  );
};

export default LendingPresentation;