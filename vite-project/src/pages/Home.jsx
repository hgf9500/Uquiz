import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankingContext } from '../context/RankingContext';

function Home() {
  const [inputNickname, setInputNickname] = useState('');
  const navigate = useNavigate();
  const { setNickname } = useContext(RankingContext);

  const handleStart = () => {
    if (!inputNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    
    // 1. Context에 닉네임 저장
    setNickname(inputNickname.trim());
    
    // 2. /quiz/(입력된 닉네임) 경로로 이동
    navigate(`/quiz/${inputNickname.trim()}`); 
  };

  return (
    <div className="home-container">
      <h1>UQuiz?</h1>
      <input 
        type="text" 
        placeholder="닉네임을 입력하세요." 
        value={inputNickname}
        onChange={(e) => setInputNickname(e.target.value)} 
      />
      <button onClick={handleStart}>시작하기</button>
    </div>
  );
}

export default Home;