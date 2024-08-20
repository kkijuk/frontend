import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect'; // API 함수 가져오기
import { useAuth } from '../AuthContext';

// Chart와 Line 스타일 컴포넌트 정의
const Chart = styled.div`
  width: 560px;
  height: 130px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  margin-bottom: 60px;
`;

const Line1 = styled.div`
  width: 540px;
  height: 30px;
  position: relative;
  margin-left: 10px;
`;

const Line2 = styled.div`
  width: 540px;
  height: 30px;
  position: relative;
  margin-left: 10px;
`;

const Line3 = styled.div`
  width: 540px;
  height: 30px;
  position: relative;
  margin-left: 10px;
`;

const Line4 = styled.div`
  width: 540px;
  height: 30px;
  position: relative;
  margin-left: 10px;
`;

const XBox = styled.div`
  width: 540px;
  height: 30px;
`;

const XLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 540px;
  height: 2px;
  background-color: black;
  display: flex;
  justify-content: space-between;
`;

const XLabel = styled.div`
  position: absolute;
  transform: translateX(-50%);
  bottom: -20px;
  font-size: 10px;
  visibility: ${(props) => (props.isJuneOrDecember ? "visible" : "hidden")}; /* YYYY.06, YYYY.12가 아닌 경우 숨기기 */
`;

const Tag = styled.div`
  display: flex;
  height: 22px;
  padding: 0px 16px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props.category)};
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 6px;
  
  position: absolute;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  margin-top: 5px;

  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...로 표시 */

  /* 추가 스타일 */
  min-width: 50px; /* 최소 너비를 설정하여 텍스트가 너무 작게 보이지 않도록 설정 */
`;


const getBackgroundColor = (category) => {
  let color;
  switch (category) {
    case 1: // 동아리
      color = '#FCC400';
      break;
    case 2: // 대외활동
      color = '#77AFF2';
      break;
    case 3: // 공모전/대회
      color = '#BB7AEF';
      break;
    case 4: // 프로젝트
      color = '#78D333';
      break;
    case 5: // 아르바이트/인턴
      color = '#FA7C79';
      break;
    case 6: // 교육
      color = '#F99538';
      break;
    default: // 기타 활동
      color = '#707070';
  }
  return color;
};

const calculateLeft = (startDate, earliestDate, oneMonthInPixels) => {
  const start = new Date(startDate).getTime();
  const earliest = new Date(earliestDate).getTime();
  const monthsFromStart = (start - earliest) / (1000 * 60 * 60 * 24 * 30); // 개월 수 계산
  return monthsFromStart * oneMonthInPixels;
};

const calculateWidth = (startDate, endDate, oneMonthInPixels) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  let months = (end - start) / (1000 * 60 * 60 * 24 * 30); // 개월 수 계산
  if (months < 1) months = 1; // 최소 1개월로 설정
  return months * oneMonthInPixels;
};

export default function TimelineHome({ triggerEffect }) {
  const { isLoggedIn } = useAuth(); // 로그인 상태를 가져옴
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    if (isLoggedIn) { // 로그인된 상태일 때만 데이터 가져오기
      const fetchCareers = async () => {
        const status = 'year';
        const responseData = await CareerViewSelect(status);
        
        console.log('API 호출 결과:', responseData);
    
        if (responseData && responseData.data) {
          const allCareers = responseData.data.flatMap(yearData => yearData.careers);
          setCareers(allCareers);
          console.log('설정된 careers 상태:', allCareers);
        } else {
          console.log('데이터가 없습니다.');
        }
      };
  
      fetchCareers();
    }
  }, [triggerEffect, isLoggedIn]);

  

  // 데이터가 없을 경우에도 빈 차트를 렌더링
  if (!careers || careers.length === 0) {
    return (
      <div>
        <Chart>
          <XBox>
            <XLine>
              {/* 빈 x축 라벨을 생성하여 x축 표시 */}
              {[...Array(12).keys()].map((index) => (
                <XLabel
                  key={index}
                  style={{ left: `${(index / 11) * 100}%` }}
                  isJuneOrDecember={false}
                >
                  {/* 빈 라벨을 출력하지 않음 */}
                </XLabel>
              ))}
            </XLine>
          </XBox>
        </Chart>
      </div>
    );
  }

  // startDate가 제일 빠른 순서대로 정렬된 새로운 배열 생성
  const sortedCareerData = [...careers].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  // endDate가 제일 늦은 순서대로 정렬된 새로운 배열 생성
  const sortedCareerDataByEnd = [...careers].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  // 제일 빠른 시작 날짜와 제일 늦은 종료 날짜
  const earliestDate = new Date(sortedCareerData[0].startDate);
  const latestDate = new Date(sortedCareerDataByEnd[0].endDate);

  // 전체 기간 개월 수 계산
  const totalMonths = (latestDate.getFullYear() - earliestDate.getFullYear()) * 12
                    + (latestDate.getMonth() - earliestDate.getMonth()) + 1; // 마지막 달 포함

  // 1개월당 픽셀 수 계산
  const oneMonthInPixels = 540 / totalMonths; // 전체 넓이를 개월 수로 나눔

  const groups = [[], [], [], []];

  // 초기 4개의 데이터를 각각 그룹에 하나씩 배치
  for (let i = 0; i < Math.min(4, sortedCareerData.length); i++) {
    if (sortedCareerData[i]) {
      groups[i].push(sortedCareerData[i]);
    }
  }

  // 남은 데이터를 그룹에 배치, 겹치지 않게
  for (let i = 4; i < sortedCareerData.length; i++) {
    const currentData = sortedCareerData[i];
    
    if (!currentData) continue; // currentData가 undefined일 경우 건너뜀

    for (let j = 0; j < 4; j++) {
      const lastInGroup = groups[j][groups[j].length - 1];
      
      if (!lastInGroup) continue; // lastInGroup이 undefined일 경우 건너뜀

      // 겹치지 않는 기간인지 확인 후 배치
      if (new Date(currentData.startDate) > new Date(lastInGroup.endDate)) {
        groups[j].push(currentData);
        break;
      }
    }
  }

  // x축 라벨을 모든 달을 포함하도록 생성
  const xLabels = [];
  let startYear = earliestDate.getFullYear();
  let startMonth = earliestDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  while (startYear < latestDate.getFullYear() || (startYear === latestDate.getFullYear() && startMonth <= latestDate.getMonth() + 1)) {
    xLabels.push(`${startYear}.${startMonth.toString().padStart(2, '0')}`);
    if (startMonth === 12) {
      startYear += 1;
      startMonth = 1;
    } else {
      startMonth += 1;
    }
  }

  return (
    <div>
      <Chart>
        {isLoggedIn && careers.length > 0 && (
          <>
            <Line1>
              {groups[0].map((data, idx) => (
                data && (
                  <Tag
                    key={idx}
                    category={data.categoryId}
                    left={calculateLeft(data.startDate, earliestDate, oneMonthInPixels)}
                    width={calculateWidth(data.startDate, data.endDate, oneMonthInPixels)}
                  >
                    {data.careerName}
                  </Tag>
                )
              ))}
            </Line1>

            <Line2>
              {groups[1].map((data, idx) => (
                <Tag
                  key={idx}
                  category={data.categoryId}
                  left={calculateLeft(data.startDate, earliestDate, oneMonthInPixels)}
                  width={calculateWidth(data.startDate, data.endDate, oneMonthInPixels)}
                >
                  {data.careerName}
                </Tag>
              ))}
            </Line2>

            <Line3>
              {groups[2].map((data, idx) => (
                <Tag
                  key={idx}
                  category={data.categoryId}
                  left={calculateLeft(data.startDate, earliestDate, oneMonthInPixels)}
                  width={calculateWidth(data.startDate, data.endDate, oneMonthInPixels)}
                >
                  {data.careerName}
                </Tag>
              ))}
            </Line3>

            <Line4>
              {groups[3].map((data, idx) => (
                <Tag
                  key={idx}
                  category={data.categoryId}
                  left={calculateLeft(data.startDate, earliestDate, oneMonthInPixels)}
                  width={calculateWidth(data.startDate, data.endDate, oneMonthInPixels)}
                >
                  {data.careerName}
                </Tag>
              ))}
            </Line4>
          </>
        )}
        <XBox>
          <XLine>
            {xLabels.map((label, index) => (
              <XLabel
                key={index}
                style={{ left: `${(index / (xLabels.length - 1)) * 100}%` }}
                isJuneOrDecember={label.endsWith('.06') || label.endsWith('.12')}
              >
                {label}
              </XLabel>
            ))}
          </XLine>
        </XBox>
      </Chart>
    </div>
  );
}