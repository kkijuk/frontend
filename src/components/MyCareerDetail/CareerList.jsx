import React,{useState} from 'react';
import styled from 'styled-components';
import AbilityTag from '../shared/AbilityTag';
import EditIcon from '@mui/icons-material/Edit';
import DetailAdd from './DetailAdd';


const Box = styled.div`
    display: flex;
    width: 720px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 24px 40px; /*양옆 40, 위아래 24씩 띄워줘야 해서 추가*/
    position: relative; /* 아이콘 위치를 위해 상대 위치로 설정 */

`;

const Title = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Contents = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    p {
        margin: 0; /* <p> 태그의 상하 여백을 제거 */
    }
`

const Date = styled.div`
    color: var(--gray-02, #707070);
    text-align: right;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* 제목 아래에 배치 되어서 위치 바꿔야 함. TitleDateContainer 추가*/
    align-self: flex-start; /* Date를 위쪽에 배치 */

`

const TitleDateContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between; /* Title과 Date를 양쪽 끝으로 배치 */
`;

const Line = styled.div`
    width : 800px;
    height: 2px;
    background: var(--gray-03, #D9D9D9);
`
const EditIconStyled = styled(EditIcon)`
    position: absolute;
    bottom: 24px; /* 패딩 내에서 아래쪽으로 24px */
    right: 40px; /* 패딩 내에서 오른쪽으로 40px */
    cursor: pointer; /* 커서를 포인터로 변경 */
`;

export default function CareerList({title, date, contents, detailTag}) {
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
            {isDetailAddVisible && <DetailAdd />}

            <Line></Line>
        </div>
    );
}
