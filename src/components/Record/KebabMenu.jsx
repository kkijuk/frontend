import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SvgIcon from '../shared/SvgIcon';

const KebabMenu = ({onModalOpen, onDetailOpen}) => {
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

    return (
        <Container>
          <IconButton onClick={() => setIsKebabMenuOpen(!isKebabMenuOpen)}>
            <SvgIcon name="kebab" />
          </IconButton>
          {isKebabMenuOpen && (
            <DropDown>
              <MenuItem onClick={onModalOpen}>활동 수정하기</MenuItem>
              <MenuItem onClick={onDetailOpen}>활동내역 수정하기</MenuItem>
            </DropDown>
          )}
        </Container>
      );

}

export default KebabMenu;

const Container = styled.div`
    position: relative;
`

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`

const DropDown = styled.div`
    width: 136px;
    height: 69px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 24px;
    display: flex;
    flex-direction: column;
`
const MenuItem = styled.div`
    width: 100%;
    height: 34px;
    font-size: 14px;
    font-family: 'Regular';
    text-align: center;
    line-height: 34px;
    cursor: pointer;
`
