import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3AAF85;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 36px;
  cursor: pointer;

  &:hover {
    background-color: #3AAF85;
  }
`;

const AddJobButton = ({ onClick }) => {
  return <Button onClick={onClick}>+</Button>;
};

export default AddJobButton;