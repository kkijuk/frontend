import React, { useState } from 'react';
import styled from 'styled-components';
import FilterPage from './FilterPage';
import { useNavigate } from 'react-router-dom';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 12px;
  margin-left: 5px;
`;

const SearchInput = styled.input`
  width: 500px;
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  font-size: 16px;
  color: #707070;
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar = () => { // 컴포넌트 이름 수정
    const navigate = useNavigate();
  
    const handleSearchClick = () => {
      navigate('/filter'); 
    };
  
    return (
      <SearchBarContainer>
        <SearchInput placeholder="공고 이름이나 태그를 검색하세요." />
        <SearchIcon onClick={handleSearchClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18.0682 19.6871L11.7045 13.3144C11.1364 13.7696 10.483 14.1299 9.74432 14.3954C9.00568 14.661 8.2197 14.7937 7.38636 14.7937C5.32197 14.7937 3.575 14.078 2.14545 12.6464C0.715152 11.214 0 9.4642 0 7.39687C0 5.32954 0.715152 3.57971 2.14545 2.14737C3.575 0.715789 5.32197 0 7.38636 0C9.45076 0 11.1981 0.715789 12.6284 2.14737C14.058 3.57971 14.7727 5.32954 14.7727 7.39687C14.7727 8.23139 14.6402 9.01849 14.375 9.75818C14.1098 10.4979 13.75 11.1522 13.2955 11.7212L19.6875 18.1223C19.8958 18.331 20 18.587 20 18.8905C20 19.1939 19.8864 19.4595 19.6591 19.6871C19.4508 19.8957 19.1856 20 18.8636 20C18.5417 20 18.2765 19.8957 18.0682 19.6871ZM7.38636 12.5178C8.80682 12.5178 10.0144 12.0201 11.0091 11.0248C12.003 10.0286 12.5 8.81935 12.5 7.39687C12.5 5.9744 12.003 4.7651 11.0091 3.76899C10.0144 2.77364 8.80682 2.27596 7.38636 2.27596C5.96591 2.27596 4.75833 2.77364 3.76364 3.76899C2.7697 4.7651 2.27273 5.9744 2.27273 7.39687C2.27273 8.81935 2.7697 10.0286 3.76364 11.0248C4.75833 12.0201 5.96591 12.5178 7.38636 12.5178Z" fill="#707070"/>
          </svg>
        </SearchIcon>
      </SearchBarContainer>
    );
  };
  
  export default SearchBar;