import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import SearchAndSelect from './SearchAndSelect';
import TagBox from "@/components/shared/TagBox";
import ReactCalendar from "@/components/MyCareerDetail/Calendar";
import { DateBox } from "@/components/MyCareerDetail/DetailAdd.styles";
import SvgIcon from "@/components/shared/SvgIcon";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import useScrollLock from "@/utils/scrollLock";

const categoryToTypeMap = {
  대외활동: 'activity',
  동아리: 'circle',
  프로젝트: 'project',
  교육: 'edu',
  공모전대회: 'competition',
  경력: 'employment',
  기타: 'etc',
};

const AddQuickCareerDetailModal = ({onSave, onClose}) => {
    useScrollLock();
    
    const [careerId, setCareerId] = useState('');
    const [careerType, setCareerType] = useState(''); // categoryEnName
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [tagList, setTagList] = useState([]); // 태그 ID 리스트를 상태로 관리
    const [errorMessage, setErrorMessage] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        // selectedDate, title, content, taList가 변경될 때마다 값 확인
        console.log('AddQuickCareerDetailModal 상태 변경:', careerId, careerType);
        console.log('selectedDate:', selectedDate);
        console.log('title:', title);
        console.log('content:', content);
        console.log('tagList:', tagList);

    }, [careerId, careerType, selectedDate, title, content, tagList]);

    // [onChange 핸들러]
    // 제목, 내용 변경 핸들러
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        }
    };

    // 날짜 선택 핸들러
    const handleDateChange = (date) => {
        if (Array.isArray(date) && date.length === 2) { // 기간으로 선택 시
            const [startDate, endDate] = date;
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

            if (formattedStartDate === formattedEndDate) {
                setSelectedDate(formattedStartDate);
            } else {
                setSelectedDate(`${formattedStartDate} ~ ${formattedEndDate}`);
            }
        } else { // 단일 날짜 선택 시
            const formattedDate = moment(date).format('YYYY-MM-DD');
            setSelectedDate(formattedDate);
        }
        setShowCalendar(false);
    }

    // [폼 제출]
    const handleSubmit = () => {
        if (!careerId || !careerType || !title || !selectedDate || !content) {
            setErrorMessage('모든 필드를 입력해주세요.');
            return;
        }

        const [startDate, endDate] = selectedDate.split(' ~ ');
        const data = {
            careerType,
            title,
            startDate,
            endDate,
            content,
            tagList
        }

        onSave(
            careerId,
            data,
        );
        onClose(); // 모달 닫기
    }

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseIcon onClick={onClose}>
                    <SvgIcon name="close" size={20}/>
                </CloseIcon>
                <ModalHeader>
                    <ModalTitle>새로운 활동 기록</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormItem>
                        <FormTitle>
                            활동
                            <SvgIcon name="ellipse"/>
                        </FormTitle>
                        <SearchAndSelect 
                            onChange={(item) => {
                                setCareerId(item.careerId);
                                setCareerType(categoryToTypeMap[item.category.categoryKoName]);
                            }}
                        />
                    </FormItem>

                    <FormsWrapper>
                        <FormItem>
                            <FormTitle>
                                제목
                                <SvgIcon name="ellipse"/>
                                <span>활동의 성격이 잘 드러나도록 작성해주세요.</span>
                            </FormTitle>
                            <InputForm
                                name="title"
                                value={title}
                                onChange={handleFormChange}
                                maxLength ={30}
                                placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)" 
                            />
                        </FormItem>

                        <FormItem>
                            <FormTitle>날짜</FormTitle>
                            <DateBox 
                                style ={{ width: '100%' }}
                                onClick={() => setShowCalendar(!showCalendar)}>
                                    {selectedDate || 'YYYY-MM-DD'}
                            </DateBox>
                            {showCalendar && (
                                <ReactCalendar
                                    onChange={handleDateChange}
                                />
                            )}
                        </FormItem>
                    </FormsWrapper>

                    <FormItem>
                        <FormTitle>
                            활동 세부 내용
                            <SvgIcon name="ellipse"/>
                            <span>주요 활동 내용을 요약하여 작성해주세요.</span>
                        </FormTitle>
                        <InputTextarea
                            name="content"
                            value={content}
                            onChange={handleFormChange}
                            maxLength={800}
                            placeholder="활동 세부 내용을 작성해주세요" 
                        />
                    </FormItem>

                    <FormItem style={{ flexDirection: 'row', gap: '20px' }}>
                        <TagBox onTagListChange={setTagList} />
                    </FormItem>
                </ModalBody>
                <ModalFooter>
                    <ButtonRow>
                        <CloseButton type="button" onClick={onClose}>취소</CloseButton>
                        <SubmitButton type="button" onClick={handleSubmit}>저장</SubmitButton>
                    </ButtonRow>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                </ModalFooter>
            </ModalContainer>
        </ModalBackground>
    );
}

export default AddQuickCareerDetailModal;

const ModalBackground = styled.div`
    flex: 1 1 auto;
	width: 100vw;
	height: 100vh;

	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;

	@media (max-width: ${theme.breakpoints.md}) {
		background-color: none;
        
	}
`;

const ModalContainer = styled.div`
    box-sizing: border-box;
    flex: 1 1 auto;
    width: 820px;
    height: auto;
    max-height: 820px;

	position: fixed;
	top: calc(50% + 35px);
	left: 50%;
	transform: translate(-50%, -50%);

	background-color: ${Color.white};
	border-radius: 10px;
	padding: 40px 122px;
	z-index: 1000;

	display: flex;
	flex-direction: column;
    gap: 40px; // 여백 추가 조정 필요(하단은 32px)

	@media (max-width: ${theme.breakpoints.md}) {
        top: calc(50% + 70px);
        padding: 20px 24px;
		width: 100vw;
		height: 100vh;
		border-radius: 0;
	}
`;

const CloseIcon = styled.button`
    position: absolute;
    top: 18px;
    right: 18px;
    background: none;
    border: none;
    cursor: pointer;
`

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: ${Color.black};
    text-align: center;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const FormsWrapper = styled.div`
    display: grid;
    grid-template-columns: 38fr 17fr;
    gap: 24px;
    width: 100%;

    @media (max-width: ${theme.breakpoints.md}) {
        grid-template-columns: 1fr;
    }
`;

const FormItem = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (max-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`;

const FormTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;

    font-family: 'SemiBold';
    font-size: 16px;
    font-weight: 500;

    & span {
        color: ${Color.main01};
        font-size: 12px;
        font-weight: 400;
    }

    & svg {
        width: 19px;
        height: 19px;
    }
`;

const InputForm = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    padding: 15px 20px;
    border: none;
    border-radius: 10px;
    background-color: ${Color.gray06};

    &:focus {
        outline: none;
    }
`;

const InputTextarea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    padding: 15px 20px;
    border: none;
    border-radius: 10px;
    background-color: ${Color.gray06};  
    font-family: 'Regular';
    font-size: 14px;
    resize: none;

    &:focus {
        outline: none;  
    }
`;

const ModalFooter = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`;

const ButtonBase = styled.button`
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-family: 'Regular';
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
`;

const CloseButton = styled(ButtonBase)`
    width: 150px;
    color: ${Color.gray02};
    background-color: ${Color.white};
    border: 1.5px solid ${Color.gray04};

    @media (max-width: ${theme.breakpoints.md}) {
        display: none;
    }
`;

const SubmitButton = styled(ButtonBase)`
    width: 413px;
    color: ${Color.white};
    background-color: ${Color.main01};
    border: none;

    @media (max-width: ${theme.breakpoints.md}) {
        width: 100%;
    }
`;

const ErrorMessage = styled.div`
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${Color.error};
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;