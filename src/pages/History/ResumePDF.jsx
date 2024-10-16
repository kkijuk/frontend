import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import SelectContent from "../../components/ResumeExport/SelectContent"; //1. 이력서에 ~ 아래 있는 박스
import SelectResume from "../../components/ResumeExport/SelectResume"; //2. 내보내기할 양식~ 아래 있는 박스

const Section  = styled.div`
  width: 820px;
  height: 100%;

`;

const Text = styled.div`
  width: 820px;
  height: 21px;
  margin-bottom: 24px;
  margin-top: ${(props) => props.marginTop || '0px'};

  /*text 스타일*/
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  border: 1px solid black;
  box-sizing: border-box;

`;

const Box1 = styled.div`
  width: 820px;
  height:300px;

  border: 1px solid black;
  box-sizing: border-box;
`;

const Box2 = styled.div`
  width: 820px;
  height: 505px;

  border: 1px solid black;
  box-sizing: border-box;
`;

export default function ResumePdf() {
  
    return (
      <div>
        <Layout title="이력서 내보내기">
          <Section>
            <Text marginTop="36px">1. 이력서에 포함할 내용을 선택하세요.</Text> 
            <Box1>
              <SelectContent></SelectContent>
            </Box1>
            <Text marginTop="48px">2. 내보내기할 양식을 선택하세요.</Text> 
            <Box2>
              <SelectResume></SelectResume>
            </Box2>
          </Section>
        </Layout>
        
      </div> 
      
      
    );
  }