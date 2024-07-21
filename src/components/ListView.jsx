import React from 'react';
import styled from 'styled-components';

const AdListStyled = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
`;

const AdItem = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const AdDate = styled.div`
  width: 100px;
  font-weight: bold;
`;

const AdDetails = styled.div`
  flex: 1;
`;

const Label = styled.span`
  background-color: #ddd;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 5px;
  font-size: 12px;
`;

const ListView = ({ data }) => {
  return (
    <AdListStyled>
      {data.map((ad, index) => (
        <AdItem key={index}>
          <AdDate>{ad.date}</AdDate>
          <AdDetails>
            <Label>{ad.label}</Label>
            {ad.details}
          </AdDetails>
        </AdItem>
      ))}
    </AdListStyled>
  );
};

export default ListView;


