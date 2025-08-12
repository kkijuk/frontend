import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import { normalizeKeyword } from "@/utils/normalizeKeyword";

// onDebounceSearch : 검색 api를 여기에 연결하면 됩니다. debounce로 0.5초마다 해당 api 호출해요
// 외부 제어(검색어를 직접 변경하는 것)가 필요 없는 경우 value와 onChangeValue는 설정하지 않아도 됩니당
const SearchBar = ({
    initialKeyword = '', 
    value, // 외부 제어값(선택)
    onChangeValue, // 외부 setter(선택)
    onDebounceSearch, 
    placeholder = ''
}) => {
    // 비제어 모드용 내부 상태
    const [internal, setInternal] = useState(initialKeyword);

    // 제어/비제어 통합
    const val = value !== undefined ? value : internal; 
    const setVal = onChangeValue || setInternal;
    
    const timeRef = useRef(null);

    useEffect(() => {
        console.log('value: ', normalizeKeyword(internal));
    }, [internal]);


    // 디바운스 검색
    useEffect(() => {
        clearTimeout(timeRef.current); // 이전 타이머 정리

        const trimmed= normalizeKeyword(val);
        if (trimmed) {
            timeRef.current = setTimeout(() => {
                onDebounceSearch(trimmed);
            }, 500); // 500ms 후에 검색 함수 호출
        }

        // 이전 타이머를 정리해서 입력 중엔 호출되지 않도록 함 
        return () => {
            clearTimeout(timeRef.current);
        }
    }, [val]);

    const handleChange = (e) => {
        setVal(e.target.value);
    };

    // 엔터키로 즉시 검색
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && val.trim()) {
            clearTimeout(timeRef.current); // 타이머 정리
            onDebounceSearch(normalizeKeyword(val)); // 즉시 검색 호출
        }   
    }

    return (
        <SearchBarContainer>
			<SearchIcon onClick={() => val.trim() && onDebounceSearch(val.trim())}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
					<path
						d="M18.0682 19.6871L11.7045 13.3144C11.1364 13.7696 10.483 14.1299 9.74432 14.3954C9.00568 14.661 8.2197 14.7937 7.38636 14.7937C5.32197 14.7937 3.575 14.078 2.14545 12.6464C0.715152 11.214 0 9.4642 0 7.39687C0 5.32954 0.715152 3.57971 2.14545 2.14737C3.575 0.715789 5.32197 0 7.38636 0C9.45076 0 11.1981 0.715789 12.6284 2.14737C14.058 3.57971 14.7727 5.32954 14.7727 7.39687C14.7727 8.23139 14.6402 9.01849 14.375 9.75818C14.1098 10.4979 13.75 11.1522 13.2955 11.7212L19.6875 18.1223C19.8958 18.331 20 18.587 20 18.8905C20 19.1939 19.8864 19.4595 19.6591 19.6871C19.4508 19.8957 19.1856 20 18.8636 20C18.5417 20 18.2765 19.8957 18.0682 19.6871ZM7.38636 12.5178C8.80682 12.5178 10.0144 12.0201 11.0091 11.0248C12.003 10.0286 12.5 8.81935 12.5 7.39687C12.5 5.9744 12.003 4.7651 11.0091 3.76899C10.0144 2.77364 8.80682 2.27596 7.38636 2.27596C5.96591 2.27596 4.75833 2.77364 3.76364 3.76899C2.7697 4.7651 2.27273 5.9744 2.27273 7.39687C2.27273 8.81935 2.7697 10.0286 3.76364 11.0248C4.75833 12.0201 5.96591 12.5178 7.38636 12.5178Z"
						fill={`${Color.gray05}`}
					/>
				</svg>
            </SearchIcon>
            <SearchInput
                placeholder={placeholder || "검색어를 입력하세요..."}
                value={val}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;

const SearchBarContainer = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;
	padding: 8px 12px;
	border-radius: 8px;
	border: 1px solid ${Color.gray03};
	box-sizing: border-box;
	width: 100%;
    background: ${Color.white};

	@media (max-width: ${theme.breakpoints.md}) {
		max-width: 100%;
		margin-left: 0;
	}
`;

const SearchInput = styled.input`
	width: 100%;
	border: none;
	background: none;
	outline: none;
	flex-grow: 1;
	font-size: 12px;
	font-family: regular;
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
