import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
interface LandingPresentationProps {}

const LandingPresentation: React.FC<LandingPresentationProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate("/project")}>랜딩페이지</Button>
    </Box>
  );
};

export default LandingPresentation;
