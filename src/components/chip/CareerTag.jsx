import React from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import ScrollNavigator from "../Record/ScrollNavigator";
import { SvgIcon } from "../MyCareerDetail/CareerList.styles";

const CareerTag = ({ tag, onClick, onDelete }) => {
    return(
        <TagContainer onClick={onClick}>
            <TagText>{tag}</TagText>
            {onDelete && (
                <SvgIcon
                    name="xButton"
                    onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트 전파 방지
                        onDelete(tag);
                    }}
                />
            )}
        </TagContainer>
    )
}

const TagContainer = styled.div`
    height: 22px;
    padding: 0px 16px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;

    background-color: ${Color.gray06};
    border-radius: 10px;
    
    font-size: 12px;
    font-family: 'Regular';
    color: ${Color.main01};
    font-weight: 400;

    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border: 1px solid ${Color.main01};
    }

    svg {
        opacity: 0;
        width: 0px;
        transition: all 0.3s ease;
        pointer-events: none; // 마우스 이벤트 차단
    }

    &:hover svg {
        opacity: 1;
        pointer-events: auto;
    }
`;