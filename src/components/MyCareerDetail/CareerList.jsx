import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AbilityTag from '../shared/AbilityTag';
import EditIcon from '@mui/icons-material/Edit';
import DetailAddEdit from './DetailAddEdit';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';

const Box = styled.div`
    display: flex;
    width: 720px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 24px 40px;
    position: relative;
`;

const Title = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Contents = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    p {
        margin: 0;
    }
`;

const Date = styled.div`
    color: var(--gray-02, #707070);
    text-align: right;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: flex-start;
`;

const TitleDateContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Line = styled.div`
    width: 800px;
    height: 2px;
    background: var(--gray-03, #D9D9D9);
`;

const EditIconStyled = styled(EditIcon)`
    position: absolute;
    bottom: 24px;
    right: 40px;
    cursor: pointer;
`;

export default function CareerList({ title, date, contents, detailTag, careerId, detailId, onClose, onUpdate }) {
    const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [currentCareerId, setCurrentCareerId] = useState(careerId); // 현재 careerId를 상태로 저장

    const handleEditClick = async () => {
        try {
            const data = await ViewCareerDetail(careerId); // careerId로 데이터 불러오기
            const selectedDetail = data.data.details.find(detail => detail.id === detailId); // detailId로 해당 데이터를 찾기
            setDetailData(selectedDetail); // 찾은 데이터를 상태로 저장
            console.log("찾은 데이터: ", selectedDetail)
            setIsDetailAddVisible(true); // DetailAddEdit 보이기
        } catch (error) {
            console.error("Error fetching career details:", error);
        }
    };

    const handleCloseDetailEdit = () => {
        setIsDetailAddVisible(false); // DetailAddEdit 창 닫기
        onUpdate(); // 부모 컴포넌트에서 데이터를 다시 로드하도록 콜백 실행 -> 바로 적용 안되는 에러

    };

    // careerId가 변경되었을 때 DetailAddEdit을 숨기도록 하는 useEffect
    useEffect(() => {
        if (currentCareerId !== careerId) {
            setIsDetailAddVisible(false); // DetailAddEdit 창 닫기
            setCurrentCareerId(careerId); // 현재 careerId 업데이트
        }
    }, [careerId]);

    return (
        <div>
            <Line></Line>
            <Box>
                <TitleDateContainer>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                </TitleDateContainer>
                <Contents>
                    {contents.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </Contents>
                <AbilityTag tags={detailTag} />
                <EditIconStyled titleAccess="Edit" onClick={handleEditClick} />
            </Box>
            {isDetailAddVisible && detailData && (
                <DetailAddEdit
                    initialTitle={detailData.title}
                    initialDate={detailData.startDate}
                    initialContents={detailData.content}
                    initialTags={detailData.careerTagList}
                    careerId={careerId}
                    detailId={detailId}
                    onClose={handleCloseDetailEdit}  /* 창을 닫는 콜백 함수 전달 */
                />
            )}
        </div>
    );
}
