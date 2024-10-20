import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 820px;
    height: 300px;
`;

const Box = styled.div`
    width: 820px;
    height: 505px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);
`;



export default function SelectResume() {
    

    return (
      <Wrapper>
        <Box></Box>
      </Wrapper>
    );
  }