import React, { useState, useEffect } from "react";
import LandingPresentation from "./LandingPresentation";
import { useNavigate } from "react-router-dom";

const LandingContainer: React.FC = () => {
  const navigate = useNavigate();

  return <LandingPresentation navigate={navigate} />;
};

export default LandingContainer;
