import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  useBreakpointValue,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { NavigateFunction } from "react-router-dom";
import {
  SearchIcon,
  BellIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { User, MessageSquare, Lightbulb, Share2 } from "lucide-react";

interface MypagePresentationProps {
  id: string | null;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  navigate: NavigateFunction;
  onLogout: () => void;
}

const MypagePresentation: React.FC<MypagePresentationProps> = (props) => {
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
              <>
                <IconButton
                  aria-label="Messages"
                  icon={<BellIcon />}
                  variant="ghost"
                  color="white"
                  mr={2}
                />
                <Button
                  as={IconButton}
                  icon={
                    <Avatar
                      size="sm"
                      src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
                    />
                  }
                  variant="ghost"
                  colorScheme="blue.500"
                  onClick={props.onDrawerOpen}
                />
              </>
            </Flex>
          )}
        </Flex>
      </Box>

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
            </>
          </Flex>
        </Box>
      )}

      {/* Drawer */}
      <Drawer
        isOpen={props.isDrawerOpen}
        placement="right"
        onClose={props.onDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack alignItems="center" spacing={4}>
              <Avatar
                borderColor="gray.100"
                borderWidth={1}
                size="md"
                src="https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp"
              />
              <VStack alignItems="flex-start" spacing={0}>
                <Text fontWeight="bold">{props.id}</Text> {/* 아이디 텍스트 */}
                <Text fontSize="sm" color="gray.500">
                  이건영
                </Text>
              </VStack>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch">
              <Button onClick={() => props.navigate("/")}>KPaaS</Button>
              <Button onClick={() => props.navigate("/project")}>
                프로젝트
              </Button>
              <Button>커뮤니티</Button>
              <Button onClick={() => props.navigate("/settings")}>
                프로필 설정
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MypagePresentation;
