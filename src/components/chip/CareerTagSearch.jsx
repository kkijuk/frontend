import React from "react";
import styled from "styled-components";
import { Color } from "@/constants/color";
import { TagContainer } from "./careerTag.styles";

const CareerTagSearch = ({tag, surface = 'white', isSelected = false, onClick}) => {
    return (
        <SearchTagContainer
            $surface={surface}
            $selected={isSelected}
            onClick={onClick}
        >
            {tag}
        </SearchTagContainer>
    );
};

export default CareerTagSearch;

const SearchTagContainer = styled(TagContainer)`
    padding: 0px 16px;
    &:hover {
        background-color: ${Color.gray05};
    }
`;
