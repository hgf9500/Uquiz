import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RankingContext } from '../context/RankingContext';
import quizData from '../data/questions.json';

function Quiz() {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const { setScore } = useContext(RankingContext);

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 번호
  const [selectedOption, setSelectedOption] = useState(null); // 사용자가 선택한 보기 인덱스
  const [answerCounts, setAnswerCounts] = useState(0); // 정답 개수

  // 현재 문제
  const currentQuiz = quizData[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) {
      alert('선택지를 선택해주세요.');
      return;
    }

    // 1. 정답 체크 및 점수 증가
    if (selectedOption === currentQuiz.answerIndex) {
      setAnswerCounts(prevCount => prevCount + 1);
    }

    // 2. 마지막 문제인지 확인
    if (currentIndex === quizData.length - 1) {
      // 마지막 문제: 점수 저장 및 결과 화면 이동
      setScore(answerCounts + (selectedOption === currentQuiz.answerIndex ? 1 : 0)); // 최종 점수 계산
      navigate(`/results/${nickname}`);
    } else {
      // 다음 문제로 이동
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null); // 선택 상태 초기화
    }
  };
  
  // (Optional) 닉네임이 URL에 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!nickname) {
        navigate('/');
    }
  }, [nickname, navigate]);

  if (!currentQuiz) return <div>문제를 불러오는 중...</div>;

  return (
    <div className="quiz-container">
      <h1>UQuiz?</h1>
      <h2>{currentQuiz.question}</h2>
      
      {currentQuiz.options.map((option, index) => (
        <button
          key={index}
          className={selectedOption === index ? 'selected' : ''}
          onClick={() => setSelectedOption(index)}
        >
          {option}
        </button>
      ))}
      
      <button onClick={handleNext}>
        {currentIndex === quizData.length - 1 ? '결과 보기' : '다음'}
      </button>
    </div>
  );
}

export default Quiz;