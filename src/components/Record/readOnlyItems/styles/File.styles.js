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

    @media (max-width: ${theme.breakpoints.md}) {
    opacity: 1;
    }
`;

const FileOrURLName = styled.div`
    // width: 120px;
    color: ${Color.black};
    font-family: Regular;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ContentLink = styled.div`
    cursor: pointer;
    color: ${Color.black};
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60%;
`;

const DeleteButton = styled.button`
    width:65px;
    margin-left: auto;
    background-color: ${Color.gray06};
    color: ${Color.gray02};
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    opacity:0;
    transition: opacity 0.2s ease-in-out;
    position:absolute;
    right:20px;
    cursor: pointer;
`

const Container = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: relative;
    padding: 10px;

    &:hover ${EditButton} {
        opacity: 1;
        cursor: pointer;
	  }
    @media (max-width: ${theme.breakpoints.md}){
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
`;

const EditContainer = styled.div`
	width: 820px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
`

export {
    EditButton,
    FileOrURLName,
    ContentLink,
    DeleteButton,
    Container,
    EditContainer
};