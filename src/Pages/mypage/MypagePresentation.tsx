import React from 'react';

interface MypagePresentationProps {
  id : string | null
}

const MypagePresentation: React.FC<MypagePresentationProps> = (props) => {
  return (
    <div>
      <h2>사용자 아이디 : {props.id}</h2>
    </div>
  );
};

export default MypagePresentation;
