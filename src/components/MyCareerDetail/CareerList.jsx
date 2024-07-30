import React, { useState } from 'react';
import styled from 'styled-components';
import AbilityTag from '../shared/AbilityTag';
import EditIcon from '@mui/icons-material/Edit';
import DetailAddEdit from './DetailAddEdit';

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

export default function CareerList({ title, date, contents, detailTag }) {
    const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);

    const handleEditClick = () => {
        setIsDetailAddVisible(!isDetailAddVisible);
    };

    return (
        <div>
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
            {isDetailAddVisible && (
                <DetailAddEdit
                    initialTitle={title}
                    initialDate={date}
                    initialContents={contents}
                    initialTags={detailTag}
                />
            )}
            <Line></Line>
        </div>
    );
}
