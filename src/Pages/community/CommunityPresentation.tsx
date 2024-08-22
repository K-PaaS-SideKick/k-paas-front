import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
interface CommunityPresentationProps {}

const CommunityPresentation: React.FC<CommunityPresentationProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate("/project")}>커뮤니티</Button>
    </Box>
  );
};

export default CommunityPresentation;
