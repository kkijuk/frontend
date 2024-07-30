import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  fill: #707070;
  margin-right: 40px;
`;

const EditIconBig = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
    <path d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z" fill="#707070"/>
  </Svg>
);

export default EditIconBig;
