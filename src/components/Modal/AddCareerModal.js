//pages/Mycareer, MycareerDetail, Intro
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CategoryGroup from '../shared/CategoryGroup';
import ReactCalendar from '../shared/CalendarSingle';
import moment from 'moment';
import { addCareer } from '../../api/Mycareer/Mycareer';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 60vw;
  height: 80vh;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  width: 70%;
  max-width: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CategoryArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 25px;
  gap: 10px;
  overflow-x: auto; /* 가로 스크롤 추가 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  white-space: nowrap; /* 줄바꿈을 하지 않음 */
`;

const CloseButton = styled.button`
  position: absolute;
  display: flex;
  top: 20px;
  right: 30px;
  background: transparent;
  border: none;
  font-size: 3em;
  color: #999;
  cursor: pointer;
  font-family: Regular;
`;

const ModalTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 32px;

  color: var(--main-01, #3AAF85);
  text-align: center;
  font-family: Bold;
  font-style: normal;
  line-height: normal;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  color: var(--black, #000);
  font-family: SemiBold;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
`;

const Info = styled.label`
  color: var(--main-01, #3AAF85);
  font-family: Regular;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
  margin-left: 15px;
`

const Input = styled.input`
  width: 97%;
  height: 4%;
  padding: 12px;
  margin-bottom: 25px;
  border: 1px solid #F5F5F5;
  font-size: 1em;
  font-family: Regular;
  border-radius: 10px;
  background: #F5F5F5;
`;

const InputLong = styled.textarea`
  width: 97%;
  height: 15%;
  padding: 12px;
  margin-bottom: 25px;
  border: 1px solid #F5F5F5;
  font-family: Regular;
  font-size: 1em;
  border-radius: 10px;
  background: #F5F5F5;
  vertical-align: top;
  overflow: auto;
`;

const InputDate = styled.input`
  font-family: Regular;
  font-size: 1em;
  width: 93%;
  height: 100%;
  padding: 12px;
  margin-bottom: 25px;
  border: 1px solid #F5F5F5;
  border-radius: 10px;
  background: ${(props) => (props.disabled ? '#D9D9D9' : '#F5F5F5')};
  color: ${(props) => (props.disabled ? '#A9A9A9' : '#000')};
  font-size: 1em;
`;

const Row = styled.div`
  width: 100%;
  height: 4%;
  display: flex;
  gap: 10px;
`;

const DateBox = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: ${(props) => (props.align === 'right' ? 'flex-end' : 'flex-start')};
`

const CalendarWrapper = styled.div`
  position: absolute;
  top: 100%; /* input 바로 아래에 위치 */
  left: 0;
  z-index: 10;
`;

const SaveButton = styled.button`
  width: 100%;
  background-color: #3AAF85;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-family: SemiBold;
  font-size: 18px;
  font-style: normal;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #35a576;
  }
`;

const ErrorMessage = styled.p`
  color: ${(props) => (props.isError ? 'red' : 'white')};
  font-size: 0.9em;
  margin-top: 10px;
  font-family: Regular;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 35px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledRadio = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.isUnknown ? '#3AAF85' : '#F5F5F5')};
  border-radius: 50%;
  transition: all 150ms;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isUnknown ? '#3AAF85' : '#ccc')};

  &:after {
    content: "";
    display: ${(props) => (props.isUnknown ? 'block' : 'none')};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

//다현 추가
const categoryMap = {
  "동아리": 1,
  "대외활동": 2,
  "공모전/대회": 3,
  "프로젝트": 4,
  "아르바이트/인턴": 5,
  "교육": 6,
  "기타활동": 7
};

const AddCareerModal = ({ onClose, onSave }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [category, setCategory] = useState('');
  const [careerName, setCareerName] = useState('');
  const [alias, setAlias] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isUnknown, setIsUnknown] = useState(false);
  const [summary, setSummary] = useState('');

  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(moment(date).format('YYYY-MM-DD'));
    setShowStartCalendar(false);
  };

  const handleEndDateChange = (date) => {
    setEndDate(moment(date).format('YYYY-MM-DD'));
    setShowEndCalendar(false);
  };

  const handleClickOutside = (event) => {
    if ( (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) &&
    (endCalendarRef.current && !endCalendarRef.current.contains(event.target))) {
      setShowStartCalendar(false);
      setShowEndCalendar(false);
    }
  };
  
   //다현 추가
   const handleCategorySelect = (category) => {
    const categoryValue = categoryMap[category];
    setSelectedCategory(category);
    setCategory(categoryValue);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasError = !category || !careerName || !alias || (!isUnknown && (!startDate || !endDate)) || (isUnknown && !startDate);

 

    const handleSave = async() => {
      if (hasError) {
        alert("필수 정보를 입력하세요!");
        return;
      }
      else if(!isUnknown &&(moment(startDate).isAfter(moment(endDate)))){
        alert("시작일과 종료일을 다시 확인해 주세요!");
        return;
      }

      const addCareerData = {
        category,
        careerName,
        alias,
        startDate,
        endDate,
        isUnknown,
        summary,
      };

      if(isUnknown){
        onSave({
          category,
          careerName,
          alias,
          startDate,
          isUnknown,
          summary,
        });
        onClose();
      }
      else{
        onSave({
          category,
          careerName,
          alias,
          startDate,
          endDate,
          isUnknown,
          summary,
        });
        onClose();
      }

      try {
        console.log(addCareerData);
        await addCareer(addCareerData);
        onSave(addCareerData);
        onClose();
      } catch (error) {
        console.log("Error", error.message);
        if (error.response) {
          console.log("서버 오류 응답 데이터:", error.response.data);
          console.log("서버 오류 상태 코드:", error.response.status);
          console.log("서버 오류 헤더:", error.response.headers);
        }
      }

  
};

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ContentArea>
          <ModalTitle>활동 추가</ModalTitle>
          <Label>분류</Label>
          <CategoryArea>
            {["동아리", "대외활동", "공모전/대회", "프로젝트", "아르바이트/인턴", "교육", "기타활동"].map((category) => (
              <CategoryGroup 
                key={category} 
                category={category} 
                selected={selectedCategory === category} 
                onClick={() => handleCategorySelect(category)} 
                categoryValue={categoryMap[category]}
              />
            ))}
          </CategoryArea>
          <Label>활동명</Label>
          <Info>활동의 성격이 잘 드러나도록 작성해 주세요.</Info>
          <Input
            type="text"
            placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등"
            value={careerName}
            onChange={(e) => setCareerName(e.target.value)}
          />
          <Label>별칭</Label>
          <Info>활동(동아리, 프로젝트 등)의 이름을 작성해 주세요.</Info>
          <Input
            type="text"
            placeholder="ex) UMC, 멋쟁이사자처럼 등"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <Label>기간</Label>
          <Row>
            <DateBox>
              <InputDate
                type="text"
                placeholder="YYYY-MM-DD"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onClick={() => setShowStartCalendar(!showStartCalendar)}
                readOnly
              />
              {showStartCalendar && (
                <ReactCalendar
                  onChange={handleStartDateChange}
                  
                />
              )}
            </DateBox>
            <Label style={{margin: '10px 15px'}}>~</Label>
            <DateBox align="right">
              <InputDate
                type="text"
                placeholder="YYYY-MM-DD"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onClick={() => setShowEndCalendar(!showEndCalendar)}
                readOnly
                disabled={isUnknown}
              />
              {showEndCalendar && (
                <ReactCalendar
                  onChange={handleEndDateChange}
                  
                />
              )}
            </DateBox>
          </Row>
          <RadioContainer>
            <RadioWrapper onClick={() => setIsUnknown(!isUnknown)}>
              <HiddenRadio isUnknown={isUnknown} />
              <StyledRadio isUnknown={isUnknown} />
            </RadioWrapper>
            <Info style={{ marginLeft: '5px' }}>아직 모르겠어요</Info>
          </RadioContainer>
          <Label>활동내역(선택)</Label>
          <Info>주요 활동 내용을 요약하여 작성해 주세요.</Info>
          <InputLong
            type="text"
            placeholder="TIP! 서술형이 아닌 개조식으로 작성하는 것이 좋아요.(50자 이내)"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <SaveButton onClick={handleSave}>저장</SaveButton>
          <ErrorMessage isError={hasError}>필수 정보를 입력하세요!</ErrorMessage>
          <br></br>
        </ContentArea>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddCareerModal;



