import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RankingContext } from '../context/RankingContext';
import quizData from '../data/questions.json';

function Results() {
  const { nickname } = useParams();
  const navigate = useNavigate();
  // RankingContext에서 필요한 값들을 가져옵니다.
  const { score, rankingList, addRanking } = useContext(RankingContext);

  // 랭킹 등록은 페이지가 처음 로드될 때 한 번만 실행되어야 합니다.
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    // 닉네임이 없으면 홈으로 리다이렉트
    if (!nickname) {
      navigate('/');
      return;
    }

    // 랭킹 등록 (딱 한 번만)
    // Quiz.jsx에서 최종 점수를 setScore로 저장했기 때문에, 이제 등록만 하면 됩니다.
    if (!hasRegistered) {
      addRanking(nickname, score);
      setHasRegistered(true); // 등록 플래그 설정
    }
    
    // 이펙트의 의존성 배열에 nickname, score, addRanking, hasRegistered를 포함합니다.
  }, [nickname, score, addRanking, navigate, hasRegistered]);

  // quizData.length를 사용하여 총 문제 수를 계산합니다.
  const totalQuestions = quizData.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8 space-y-8">
        
        {/* 1. 퀴즈 결과 섹션 */}
        <div className="text-center border-b pb-6">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
            퀴즈 완료!
          </h1>
          <p className="text-xl font-medium text-gray-600">
            {nickname}님의 최종 결과입니다.
          </p>
        </div>

        {/* 내 점수 표시 (요구사항) */}
        <div className="text-center py-4 bg-indigo-50 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">내 점수</p>
          <p className="text-6xl font-black text-indigo-900 mt-2">
            {score} / {totalQuestions}
          </p>
        </div>

        {/* 2. 전체 랭킹 목록 */}
        <div className="pt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            전체 랭킹
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  닉네임
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                  점수
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rankingList.map((ranking, index) => (
                <tr 
                  key={ranking.id + index} 
                  className={ranking.id === nickname && ranking.score === score && index === rankingList.findIndex(r => r.id === nickname && r.score === score) ? 'bg-yellow-50 font-bold' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {ranking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                    {ranking.score} 점
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. 홈 버튼 */}
        <div className="pt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
          >
            다시 도전하기 (홈으로)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;