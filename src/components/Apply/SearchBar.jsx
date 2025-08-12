import React, { useState } from 'react';
import styled from 'styled-components';
import FilterPage from './FilterPage';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import { Color } from '../../constants/color';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
   background-color: ${Color.gray01};
  padding: 10px 20px;
  background-color: ${Color.gray06};
  border-radius: 12px;
  margin-left: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background-color: transparent;
    padding: 0;
  }
`;

const SearchInput = styled.input`
  width: 350px;
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  font-size: 17px;
  color: ${Color.gray02};
  font-family: Light;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/filter?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleMobileSearch = () => {
    navigate('/filter'); // 모바일에서는 검색 페이지로 이동
  };

  return (
    <SearchBarContainer>
      <SearchInput
        placeholder="공고 이름이나 태그를 검색하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <SearchIcon onClick={handleMobileSearch}>
        <img src={searchIcon} alt="검색" />
      </SearchIcon>
    </SearchBarContainer>
  );
};

export default SearchBar;
