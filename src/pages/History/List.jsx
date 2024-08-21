import api from "../../Axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ListItem from "../../components/History/ListItem";

const List = () => {
    let { state } = useParams(); // state 0(작성중), 1(작성완료), 2(보관중), 3(전체) 중 하나

    const navigate = useNavigate();

    // (Data) 지원 공고 목록
    const [recruits, setRecruits] = useState([]);
    const [expiredRecruits, setExpiredRecruits] = useState([]); // 경과한 공고 목록

    // 0. 마스터 마지막 수정 일시 가져오기
    const [masterData, setMasterData] = useState({});
    useEffect(() => {
        api.get('/history/intro/master')
            .then(response => {
                const Data = response.data.data;
                console.log("내용조회: ", Data);
                setMasterData({
                    updated_at: Data.updatedAt,
                    state: Data.state
                });
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }, []);

    // 1. 자기소개서 목록 조회
    useEffect(() => {
        api.get('/history/intro/list')
            .then(response => {
                console.log(response.data);
                const Data = response.data.data;

                // 현재 날짜
                const now = new Date();

                // 경과한 공고 목록 필터링
                const expiredItems = Data.filter(item => new Date(item.deadline) < now);
                //  setExpiredRecruits(expiredItems);

                // 전체 공고 목록 설정
                setRecruits(Data);
                console.log("경과한 공고 목록:", expiredItems);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filterdData = state === "3"
        ? recruits
        : recruits.filter(item => item.state.toString() === state);

    return (
        <BaseDiv>
            <ListItem
                title="MASTER"
                updated_at={masterData.updated_at}
                state={masterData.state}
                onClick={() => navigate('/history/master')}
            />
            {filterdData.map(item => (
                <ListItem
                    key={item.id}
                    title={item.recruitTitle}
                    updated_at={item.updatedAt}
                    deadline={item.deadline}
                    state={item.state}
                    timeSinceUpdate={item.timeSinceUpdate}
                    onClick={() => navigate(`/history/others/${item.id}`)}
                />
            ))}
            <br></br>
            {expiredRecruits.length > 0 && (
                <div>
                    <h3 style={{marginLeft:10}}>마감일이 지난 자기소개서 보기</h3>
                    {expiredRecruits.map(item => (
                        <ListItem
                            key={item.id}
                            title={item.recruitTitle}
                            updated_at={item.updatedAt}
                            deadline={item.deadline}
                            state={item.state}
                            timeSinceUpdate={item.timeSinceUpdate}
                            onClick={() => navigate(`/history/others/${item.id}`)}
                        />
                    ))}
                </div>
            )}
        </BaseDiv>
    );
};

export default List;

const BaseDiv = styled.div`
    width: 820px;
    max-width: 820px;
    position:relative;
`;
