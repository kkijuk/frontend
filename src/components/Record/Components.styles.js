import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

// Profile, EmailAndAddress, ScrollNavigator

// Proflie
const ProfileContainer = styled.div`
    width: 150px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Placeholder = styled.div`
    width: 150px;
    height: 200px;
    flex-shrink: 0;
    background: ${Color.gray05};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HiddenSymbolArea = styled.svg`
    width: 0;
    height: 0;
    display: none;
`;

const SvgPlaceholder = styled.svg`
    width: 45px;
    height: 45px;
`;

export {
    ProfileContainer,
    ProfileImage,
    Placeholder,
    HiddenSymbolArea,
    SvgPlaceholder
};

// EmailAndAddress
const NullModeAddress = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${Color.gray02};
`;

const HoverWrapper = styled.div`
  display: inline-block;
  position: relative;
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: flex-start;
  }
`;

const EditButton = styled.button`
	width: 40px;
	height: 19px;
	border-radius: 7px;
	color: ${Color.gray02};
	font-size: 12px;
	background: ${Color.gray06};
	cursor: pointer;
	border:none;
	margin-left: 20px;
	justify-content:center;
    @media (max-width: ${theme.breakpoints.md}) {
        margin-left: 0px;
    }
`;

const EditAddressContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column; /* 두 줄로 배치 */
  }
`;

const AddressInput = styled.input`
  width: 200px;
  padding: 4px 8px;
  border:none;
  border-radius: 7px;
  color: ${Color.black}; 
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: ${Color.gray06};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 250px; 
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row-reverse; 
    justify-content: flex-end; 
  }
`;

const SaveButton = styled.button`
	width: 45px;
	height: 20px;
	border-radius: 7px;
	color: ${Color.white};
	font-size: 12px;
    font-weight: 400;
    font-family: 'Regular';
    line-height: normal;
	background: ${Color.main01};
	cursor: pointer;
	border:none;
	display:flex;
	justify-content:center;
    align-items:center;
`;

const CancelButton = styled.button`
	width: 45px;
	height: 20px;
	border-radius: 7px;
	color: ${Color.gray02};
	font-size: 12px;
    font-weight: 400;
    font-family: 'Regular';
    line-height: normal;
	background: ${Color.white};
	cursor: pointer;
	border: 1px solid ${Color.gray02};;
	display:flex;
	justify-content:center;
    align-items:center;
`;

export {
    NullModeAddress,
    HoverWrapper,
    EditButton,
    EditAddressContainer,
    AddressInput,
    ButtonGroup,
    SaveButton,
    CancelButton
};

// ScrollNavigator
const Container = styled.nav`
    position: fixed;
    top: 210px;
    left: 130px;
    padding: 25px 15px;
    width: 141px;
    border: none;
    border-radius: 16px;
    background: ${Color.gray05};
    height: 520px;
`

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Button = styled.button`
    width: 100%;
    height: 35px;
    background: ${({ isActive }) => (isActive ? Color.white : "transparent")};
    color: black;
    border:none;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 16px;
    font-family: 'SemiBold';
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
        background: ${Color.white};
    }
`

export {
    Container,
    List,
    Button
};