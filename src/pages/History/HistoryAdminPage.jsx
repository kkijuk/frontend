import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useRecordStore from "@/stores/useRecordStore";

const HistoryAdminPage = () => {
    const store = useRecordStore();
    const {
        // api call
        recordId,
        memberId,
        fetchRecord,
        updateUserData,
        //사용자 정보
        userData,
    } = store;

    useEffect(() => {
        console.log('HistoryAdminPage userData:', userData);
    }, [userData]);

    // 이력서 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try{
                await fetchRecord();
            } catch (error) {
                console.error('Error: fetchRecord: ', error);
            }
        }
        fetchData();
        
        console.log('Record Id:', recordId);

    }, [fetchRecord]);

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if(file) {
                updateUserData(recordId, {
                    profileImageFile: file,
                },memberId)
                .then((response) => {
                    console.log('Profile image updated successfully:', response);
                })
                .catch((error) => {
                    console.error('Error updating profile image:', error);
                });
            }
        } else {
            alert('이미지 파일만 업로드할 수 있습니다.');
        }
    };

    return (
    <HistoryAdminPageContainer>
        <h1>History Admin Page</h1>
        <input
            type="file"
            id="profileInput"
            onChange={handleProfileChange}
        />
    </HistoryAdminPageContainer>
    );
};

export default HistoryAdminPage;

const HistoryAdminPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  @media (max-width: 768px) {
    padding: 10px;
    h1 {
      font-size: 20px;
    }
  }
`;