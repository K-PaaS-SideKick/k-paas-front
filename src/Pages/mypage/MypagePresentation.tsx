import React from 'react';
import { Link } from 'react-router-dom';

interface MypagePresentationProps {
  userName: string;
  userEmail: string;
  onUpdateUserName: (newName: string) => void;
}

const MypagePresentation: React.FC<MypagePresentationProps> = (props) => {
  return (
    <div>
      <h2>프로필</h2>
    </div>
  );
};

export default MypagePresentation;
