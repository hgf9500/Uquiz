import React, { createContext, useState } from 'react';

// 랭킹 정보를 저장할 Context 생성
export const RankingContext = createContext();

// RankingProvider 컴포넌트 정의
export const RankingProvider = ({ children }) => {
    // 퀴즈 결과 (최종 점수를 Result 페이지에서 등록하기 위함)
    const [score, setScore] = useState(0);
    const [nickname, setNickname] = useState('');
    
    // 전체 랭킹 리스트 (예시 데이터)
    const [rankingList, setRankingList] = useState([
        { id: '아무런 이름', score: 5 },
        { id: 'ㅁㅁ', score: 2 },
    ]);

    // 랭킹 등록 함수
    const addRanking = (newNickname, newScore) => {
        // 중복 닉네임 체크 및 업데이트 로직 추가 가능
        const newRanking = { id: newNickname, score: newScore };
        
        setRankingList(prevList => {
            const updatedList = [...prevList, newRanking];
            // 점수 기준으로 내림차순 정렬 (높은 점수가 위로)
            return updatedList.sort((a, b) => b.score - a.score); 
        });
    };

    return (
        <RankingContext.Provider value={{
            score,
            setScore,
            nickname,
            setNickname,
            rankingList,
            addRanking
        }}>
            {children}
        </RankingContext.Provider>
    );
};