import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, DropDown, MenuItem } from './subComponents.styles';
import SvgIcon from '../shared/SvgIcon';

const KebabMenu1 = ({onModalOpen, onDetailOpen}) => {
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

    return (
        <Container
          onMouseLeave={() => setIsKebabMenuOpen(false)}
        >
          <IconButton onClick={() => setIsKebabMenuOpen(!isKebabMenuOpen)}>
            <SvgIcon name="kebab" />
          </IconButton>
          {isKebabMenuOpen && (
            <DropDown>
              <MenuItem onClick={onModalOpen}>활동 수정하기</MenuItem>
              <MenuItem onClick={()=>{
                setIsKebabMenuOpen(false);
                onDetailOpen();
              }}>
                활동내역 수정하기
              </MenuItem>
            </DropDown>
          )}
        </Container>
      );

}
export { KebabMenu1}

const KebabMenu2 = ({onModalOpen}) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

  return (
      <Container
        onMouseLeave={() => setIsKebabMenuOpen(false)}
      >
        <IconButton onClick={() => setIsKebabMenuOpen(!isKebabMenuOpen)}>
          <SvgIcon name="kebab" />
        </IconButton>
        {isKebabMenuOpen && (
          <DropDown style={{height:'34px'}}>
            <MenuItem onClick={onModalOpen}>활동 수정하기</MenuItem>
          </DropDown>
        )}
      </Container>
    );

}
export { KebabMenu2 };

const Container = styled.div`
    position: relative;
`


