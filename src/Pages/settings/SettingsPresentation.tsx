import React from 'react';
import { Link } from 'react-router-dom';

interface SettingsPresentationProps {
  userName: string;
  userEmail: string;
  onUpdateUserName: (newName: string) => void;
}

const SettingsPresentation: React.FC<SettingsPresentationProps> = (props) => {
  return (
    <div>
      <h2>설정</h2>
    </div>
  );
};

export default SettingsPresentation;
