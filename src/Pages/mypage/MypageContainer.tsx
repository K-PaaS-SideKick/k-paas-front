import React, { useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useAppContext } from "../../AppContext";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MypageContainer: React.FC = () => {
  const navigate = useNavigate();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const context = useAppContext();

  const id = context.userId;

  const onLogout = () => {
    context.setIsLoggedIn(false);
    context.logout();
    navigate("/");
  };

  return (
    <MypagePresentation
      id={id}
      navigate={navigate}
      isDrawerOpen={isDrawerOpen}
      onDrawerOpen={onDrawerOpen}
      onDrawerClose={onDrawerClose}
      onLogout={onLogout}
    />
  );
};

export default MypageContainer;
