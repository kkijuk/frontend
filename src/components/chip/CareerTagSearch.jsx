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
        >
            {tagName}
        </SearchTagContainer>
    );
};

export default CareerTagSearch;

const SearchTagContainer = styled(TagContainer)`
    width: fit-content;
    min-width: 21px;
    padding: 0px 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: ${Color.gray05};
    }
`;
