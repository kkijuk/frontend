import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';

const BackgroundDiv = styled.div`
	height: 100%;
	margin-top: 40px;
	display: flex;
	justify-content: center;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 20px;
	}
`;

const BaseDiv = styled.div`
    width: 820px;
    max-width: 820px;
    position: relative;
    z-index: 999;

    @media (max-width: ${theme.breakpoints.md}) {
        width: 100%;
    }
`;

const Dropdown = styled.div`
	width: 65px;
	height: 48px;
	padding: 12px 8px;

	display: flex;
	flex-direction: column;
	gap: 4px;

	border-radius: 13px;
	border: 1px solid ${Color.gray03};
	background: ${Color.white};

	position: absolute;
	top: 30px;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 66px;
		top: 70px;
	}
`;

const DropdownItem = styled.div`
	height: 14px;
	padding: 4px 8px;
	border-radius: 4px;

	background: ${Color.white};

	color: ${Color.gray01};
	text-align: center;
	font-family: Regular;
	font-size: 13px;
	font-weight: 400;

	cursor: pointer;

	&:hover {
		background: ${Color.gray06};
	}
`;

export {
    BackgroundDiv,
    BaseDiv,
    Dropdown,
    DropdownItem,
}