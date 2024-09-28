import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import UserPresentation from "./UserPresentation";
import { useAppContext } from "../../AppContext";

const UserContainer: React.FC = () => {
  const navigate = useNavigate();

  return <UserPresentation id={"123"} navigate={navigate} />;
};

export default UserContainer;
