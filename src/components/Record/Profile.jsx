import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { downS3File } from '../../api/Record/s3File';
import { theme } from '../../constants/theme'; 

const Profile = ({ profileKeyName, onProfileChange }) => {
    const [profileUrl, setProfileUrl] = useState('');

    // useEffect(() => {
    //     if (typeof profileBlob === 'string') { // presigned GET URL
    //         setProfileUrl(profileBlob);
    //     } 
    // }, [profileBlob]);

    useEffect(()=>{
        if(profileKeyName && profileKeyName !== 'string'){
            downS3File({ fileTitle: profileKeyName })
                .then((response) => {
                    if(response){
                        setProfileUrl(response);
                    }
                    console.log('Profile image downloaded successfully:', response);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setProfileUrl(''); 
                });
        }
    }, [profileKeyName]);

    useEffect(() => {
        console.log('Profile URL:', profileUrl);
    }, [profileUrl]);

    const handleProfileClick = () => {
        document.getElementById('profileInput').click();
    };

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // 미리보기를 위해 로컬 blob URL 생성
            const newProfileUrl = URL.createObjectURL(file);
            setProfileUrl(newProfileUrl);

            // 상위로는 "File 객체"를 전달
            onProfileChange(file);

            // 메모리 누수를 방지하기 위해 URL.revokeObjectURL을 사용하여 URL을 해제
            return () => URL.revokeObjectURL(newProfileUrl);
        } else {
            alert('이미지 파일만 업로드할 수 있습니다.');
        }
    };

    return (
        <ProfileContainer onClick={handleProfileClick}>
            <HiddenSymbolArea>
                <svg width="0" height="0">
                    <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 46" id="Vector">
                        <g id="Vector">
                        <path d="M45 23C45 35.4264 34.9264 45.5 22.5 45.5C10.0736 45.5 0 35.4264 0 23C0 10.5736 10.0736 0.5 22.5 0.5C34.9264 0.5 45 10.5736 45 23Z" fill="#D9D9D9"></path>
                        <path d="M20.5469 25.4062H14.7031V21.5H20.5469V15.6562H24.4531V21.5H30.2969V25.4062H24.4531V31.25H20.5469V25.4062Z" fill="white"></path>
                        </g>
                    </symbol>
                </svg>
            </HiddenSymbolArea>
            {profileUrl ? (
                <ProfileImage src={profileUrl} alt="Profile" />
            ) : (
                <Placeholder>
                    <SvgPlaceholder>
                        <use href="#Vector" />
                    </SvgPlaceholder>
                </Placeholder>
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
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HiddenSymbolArea = styled.svg`
    width: 0;
    height: 0;
    display: none;
`;

const SvgPlaceholder = styled.svg`
    width: 45px;
    height: 45px;
`;