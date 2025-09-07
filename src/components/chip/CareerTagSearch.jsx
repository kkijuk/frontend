import React, { useEffect } from "react";
import styled from "styled-components";
import { Color } from "@/constants/color";
import { TagContainer } from "./careerTag.styles";

const CareerTagSearch = ({tag, surface = 'white', isSelected = false, onClick}) => {
    const clickable = typeof onClick === 'function';

    const tagName = tag?.name || tag?.tagName || tag || '';
    const tagId = tag?.id;

    useEffect(() => {
        console.log('CareerTagSearch 렌더링:', tag);
    }, [tag]);

    return (
        <SearchTagContainer
            $surface={surface}
            $selected={isSelected}
            onClick={clickable ? () => onClick(tagId) : undefined}
            role={clickable ? 'button' : undefined}
            maxLength={6} // 최대 길이 제한
        >
            {tagName}
        </SearchTagContainer>
    );
};

export default CareerTagSearch;

const SearchTagContainer = styled(TagContainer)`
    box-sizing: border-box;
    flex: 0 0 auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: auto;
    min-width: 53px;
    max-width: 80px;
    padding: 0px 16px;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:hover {
        background-color: ${Color.gray05};
    }
`;
