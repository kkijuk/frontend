import React from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import useScrollLock from "@/utils/scrollLock";

const RightSideBar = ({ isOpen, onClose, children }) => {
    return (
        <>
            <Overlay isOpen={isOpen} onClick={onClose}/>
            <SidebarContainer isOpen={isOpen} >
                {/* <CloseButton onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 6L12 13M12 13L5 6M12 13L19 20M12 13L5 20" stroke={Color.gray05} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </CloseButton> */}
                {children}
            </SidebarContainer>
        </>
    );
}

export default RightSideBar;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => (props.isOpen ? "block" : "none")};
`;

const SidebarContainer = styled.div`
    position: fixed;
    top: 70px; // 내비게이터 높이 제외
    right: ${props => (props.isOpen ? "0" : "-100%")}; // 디자인 나오면 너비에 맞춰 조정하기
    width: 500px; // 너비 조정
    height: calc(100vh - 70px); // 내비게이터 높이 제외
    background: ${Color.gray04};
    transition: right 0.3s ease-in-out;
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
        fill: ${Color.gray05};
    }

    &:hover svg {
        fill: ${Color.gray03};
    }
`;