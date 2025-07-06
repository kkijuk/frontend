import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	top:10px;
	background-color: transparent;
	opacity: 0;
	padding: 0px 50px 70px 0px;
    z-index: 1000;
    @media (max-width: ${theme.breakpoints.md}) {
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    padding: 10px;
    font-family:Regular;
    margin-bottom: 20px;
    position: relative;
    &:hover ${EditButton} {
        opacity: 1;
        cursor: pointer;
    }
`;

const EditContainer = styled.div`
	width: 820px;
	display: flex;
	// justify-content: center;
	align-items: flex-start;
	// margin-bottom: 45px;
	font-family: 'Regular';
    margin-left: ${({ isSecondColumn }) => (isSecondColumn ? '-345px' : '0')};
    @media (max-width: ${theme.breakpoints.md}) {
        margin-left: 0px;
    }
`

const SkillInfo = styled.div`
    flex: 1;
`;

const SkillName = styled.div`
    font-size: 20px;
    font-weight: bold;
    @media (max-width: ${theme.breakpoints.md}) {
        font-size: 16px;
    };
`;

export {
    EditButton,
    Container,
    EditContainer,
    SkillInfo,
    SkillName
};