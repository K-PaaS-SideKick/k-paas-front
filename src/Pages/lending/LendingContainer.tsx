import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import LendingPresentation from "./LendingPresentation";


const LendingContainer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const [id, setId] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  const onLogin = async () => {
    if (!id || !password) {
      setError("아이디/패스워드를 입력해주세요");
    } else {
      setError("");
      try {
        /* API 호출 */
        setisLoggedIn(true);
        onLoginModalClose();
        alert("로그인 성공");
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    setisLoggedIn(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleIdChange = (value: string) => {
    setId(value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) {
      setError("");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isLoginModalOpen) {
        onLogin();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isLoginModalOpen, id, password]);


  return (
    <LendingPresentation
      onLogin={onLogin}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      isLoginModalOpen={isLoginModalOpen}
      onLoginModalOpen={onLoginModalOpen}
      onLoginModalClose={onLoginModalClose}
      id={id}
      setId={handleIdChange}
      password={password}
      setPassword={handlePasswordChange}
      error={error}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
    />
  );
};

export default LendingContainer;
