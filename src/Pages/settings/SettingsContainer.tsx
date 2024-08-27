import React, { useState } from 'react';
import SettingsPresentation from './SettingsPresentation';

const SettingsContainer: React.FC = () => {
  // 예시로 상태를 관리
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');

  // 이 함수는 사용자 이름을 업데이트할 때 사용됩니다.
  const updateUserName = (newName: string) => {
    setUserName(newName);
  };

  return (
    <SettingsPresentation
      userName={userName}
      userEmail={userEmail}
      onUpdateUserName={updateUserName}
    />
  );
};

export default SettingsContainer;
