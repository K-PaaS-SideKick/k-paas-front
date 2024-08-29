import React, { useState } from 'react';
import MypagePresentation from './MypagePresentation';
import { useAppContext } from "../../AppContext";

const MypageContainer: React.FC = () => {

    const context = useAppContext();

    const id = context.userId;

  return (
    <MypagePresentation
      id = {id}
    />
  );
};

export default MypageContainer;
