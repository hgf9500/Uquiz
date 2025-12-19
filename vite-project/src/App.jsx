import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RankingProvider } from './context/RankingContext'; // Context 불러오기
import Home from './pages/Home';      
import Quiz from './pages/Quiz';      // ⬅️ 컴포넌트를 불러와야 합니다.
import Results from './pages/Results'; 

function App() {
  return (
    <RankingProvider>
        <Routes>
          {/* 닉네임 설정 페이지 (메인) */}
          <Route path="/" element={<Home />} /> 
          
          {/* 퀴즈 풀이 페이지 (Quiz 컴포넌트 사용) */}
          <Route path="/quiz/:nickname" element={<Quiz />} />
          
          {/* 결과 페이지 */}
          <Route path="/results/:nickname" element={<Results />} />
          
          {/* 404 페이지는 필요에 따라 추가할 수 있습니다. */}
        </Routes>
    </RankingProvider>
  );
}

export default App;
