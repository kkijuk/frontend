import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Profile = ({ profileBlob, onProfileChange }) => {
    const [profileUrl, setProfileUrl] = useState(null);

    useEffect(() => {
        // profileBlob이 Blob 객체인 경우 URL.createObjectURL을 사용하여 Blob URL을 생성
        if (profileBlob instanceof Blob) {
            const newProfileUrl = URL.createObjectURL(profileBlob);
            setProfileUrl(newProfileUrl);

            // 메모리 누수를 방지하기 위해 URL.revokeObjectURL을 사용하여 URL을 해제
            return () => URL.revokeObjectURL(newProfileUrl);
        } else if(typeof profileBlob === 'string') {
            setProfileUrl(profileBlob);
        }
    }, [profileBlob]);

    const handleProfileClick = () => {
        document.getElementById('profileInput').click();
    };

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const newProfileUrl = URL.createObjectURL(file);
            setProfileUrl(newProfileUrl);
            onProfileChange(newProfileUrl);

            // 메모리 누수를 방지하기 위해 URL.revokeObjectURL을 사용하여 URL을 해제
            return () => URL.revokeObjectURL(newProfileUrl);
        } else {
            alert('이미지 파일만 업로드할 수 있습니다.');
        }
    };

    return (
        <ProfileContainer onClick={handleProfileClick}>
            {profileUrl ? (
                <ProfileImage src={profileUrl} alt="Profile" />
            ) : (
                <Placeholder />
            )}
            <input
                type="file"
                id="profileInput"
                style={{ display: 'none' }}
                onChange={handleProfileChange}
            />
        </ProfileContainer>
    );
};

export default Profile;

// Styled Components
const ProfileContainer = styled.div`
    width: 150px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Placeholder = styled.div`
    width: 150px;
    height: 200px;
    flex-shrink: 0;
    background: var(--gray-05, #F1F1F1);
`;