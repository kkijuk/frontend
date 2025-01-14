//components/MyCareerDetail/ DetailAdd, DetailAddEdit

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TagBoxFetchList, TagBoxCreateTag, TagBoxDeleteTag } from '../../api/Mycareer/TagBoxAPI';

const Box = styled.div`
	width: 720px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
	margin-bottom: 13px;
	position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 설정 */
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const Text = styled.div`
	width: 32px;
	height: 21px;
	margin-top: 5px;
	display: flex;
	align-items: center; /* 세로 중앙 정렬 */
	color: var(--black, #000);
	font-family: semibold;
	font-size: 18px;
	font-style: light;
	line-height: normal;
	margin-bottom: 5px;
`;

const TagInputContainer = styled.div`
	width: 650px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 5px;
	padding-left: 5px; /* 전체 컨테이너의 좌측에 패딩 추가 */
	padding-top: 5px;
	padding-bottom: 5px;
`;

const TagInput = styled.input`
	flex: 1;
	border: 1px solid black;

	border: none; /* 테두리 제거 */
	padding-left: 5px;
	background: #f5f5f5;
	font-family: Pretendard;
	font-size: 16px;
	color: #999;

	&:focus {
		outline: none; /* 포커스 시 외곽선 제거 */
		color: #000; /* 입력 시 텍스트 색상 변경 */
	}
`;

const TagBoxList = styled.div`
	width: 300px;
	height: 350px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--white, #fff);
	box-shadow: 0px 5px 10px 0px #d9d9d9;
	position: absolute; /* 절대 위치 */
	top: 40px; /* Tag 컴포넌트 아래에 위치시키기 위한 값 조정 */
	left: 0;
	z-index: 1000; /* 다른 요소 위에 표시되도록 */
	padding: 10px; /* 패딩 추가 */
	display: flex;
	flex-direction: column;
	gap: 10px;
	border: 1px solid black;
`;

const TagBoxListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px; /* 태그 간 간격 추가 */
`;

const WhiteTag = styled.div`
	display: flex;
	align-items: center;
	height: 22px;
	padding: 0px 8px; /* 간격 조정 */
	justify-content: center;
	gap: 5px; /* 태그와 x 버튼 간 간격 조정 */
	border-radius: 10px;
	background: #fff; /* 흰색 배경 */
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: light;
	line-height: normal;
`;

const Tag = styled.div`
	display: flex;
	align-items: center;
	height: 22px;
	padding: 0px 8px; /* 간격 조정 */
	justify-content: center;
	gap: 5px; /* 태그와 x 버튼 간 간격 조정 */
	border-radius: 10px;
	background: #f5f5f5;
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	position: relative;
	cursor: pointer;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: #999;
	font-size: 12px;
	cursor: pointer;
	padding: 0; /* 패딩 제거 */
	margin-left: 4px; /* 왼쪽 여백 추가 */
`;

export default function TagBox({ externalTags, onTagListChange }) {
	const [tags, setTags] = useState([]); //TagInputContainer에 표시할 태그
	const [TagBoxTags, setTagBoxTags] = useState([]); // TagBoxListContainer에 표시할 태그

	const [inputValue, setInputValue] = useState(''); //TagInputContainer 안에 값
	const [isFocused, setIsFocused] = useState(false);

	const [isTagBoxListVisible, setIsTagBoxListVisible] = useState(false); //TagBoxListContainer 상태 나타내기
	const tagBoxRef = useRef(null);

	//아래 주석처리 날릴 예정 + 위에 externalTags도....
	/*
    useEffect(() => {
        setTags(externalTags || []);  // null 또는 undefined가 아닌 배열로 설정
    }, [externalTags]);
    */

	useEffect(() => {
		console.log('TagBox received externalTags:', externalTags);
		setTags(externalTags || []);
	}, [externalTags]);

	useEffect(() => {
		const fetchTags = async () => {
			const fetchedTags = await TagBoxFetchList();
			setTagBoxTags(fetchedTags);
		};
		fetchTags();
	}, []); //여기 tags를 써서 tags에 변화가 생길 때마다 해당 useEffect가 실행되게 함 (Warning메시지 떠서 삭제함...)

	//tags, TagBoxTags의 상태가 변경될 때마다 실행된다. onTagListChange라는 콜백 함수 호출해서
	//태그리스트의 ID값을 전달하는 역할
	useEffect(() => {
		if (typeof onTagListChange === 'function') {
			//onTagListChange가 함수인지 확인
			const tagIds = tags
				.map((tag) => {
					//tags 배열에 저장된 태그들의 이름을 사용, TagBoxTags에서 해당 이름에 해당하는 태그 객체 찾고 id값 추출
					const tagObject = TagBoxTags.find((t) => t.tagName === tag); //TagBoxTags에서 tagName이 일치하는 객체 찾아서 반환
					return tagObject ? tagObject.id : null; //태그 객체 찾았다면 id 반환, dkslaus null 반환
				})
				.filter((id) => id !== null); //null값 제외하고 유효한 ID들만 tagIds 배열에 저장
			onTagListChange(tagIds);
		} else {
			console.error('onTagListChange prop is not a function');
		}
	}, [tags, TagBoxTags]); //여기도 원래 tags, TagBoxTags, onTagListChange 였었음

	//사용자가 태그 입력 필드에 값 입력 때마다 InputValue 상태 업데이트 해주기
	const handleInputChange = (e) => {
		setInputValue(e.target.value); //여기서 e.target.value는 사용자가 입력한 텍스트
	};

	//엔터 눌렀을 때 태그 추가
	const handleKeyDown = async (e) => {
		if (e.nativeEvent.isComposing) {
			//마지막 한글자 태그로 만들어지는거 막는 부분
			e.stopPropagation();
			return;
		}

		if (e.key === 'Enter' && inputValue.trim() !== '') {
			//엔터키 눌렸음 + 입력된 값 공백 아닐때만 실행한다
			const newTag = inputValue.trim(); //입력된 태그 값의 앞뒤 공백 제거 후 newTag에 저장

			// 이미 TagInputContainer에 있는 태그라면 추가하지 않음
			if (tags.includes(newTag)) {
				//여기서 tags가 TagInputContainer에 있는 태그들인데 만약 newTag가 이미 tags에 있는 태그면
				setInputValue(''); //입력 필드 비워주고 함수 종료
				return;
			}

			// TagBoxListContainer에만 있고, TagInputContainer에는 없는 태그라면
			//여기서 some은 자바스크립트 배열 메서드 : 배열 내에서 조건을 만족하는 요소 하나라도 있는지 확인하는 역할로 불리언 값 반환
			if (TagBoxTags.some((tag) => tag.tagName === newTag)) {
				//TagBoxTags배열 순회하며 tag.tagName이 newTag와 같은지 확인 -> 같으면 true 반환
				setTags([...tags, newTag]); //true 반환하면 tags에만 newTag 저장 -> TagBoxListContainer에는 저장하지 않음. 왜냐 이미 있으니까!
				setInputValue('');
				return;
			}
			try {
				// API 호출해서 태그 전송, await: 비동기, 이 작업 완료 때까지 기다리기
				const response = await TagBoxCreateTag(newTag);
				//서버에서 받은 데이터 중 실제 생성된 태그 추출하기
				const createdTag = response.data;

				console.log('API 응답:', response);

				// TagInputContainer와 TagBoxListContainer에 태그 추가
				setTags((prevTags) => [...prevTags, createdTag.tagName]);
				setTagBoxTags((prevTagBoxTags) => [...prevTagBoxTags, createdTag]);

				setInputValue('');
				console.log(`태그 ${newTag} 서버로 전송 성공`);
			} catch (error) {
				console.log(`태그 ${newTag} 서버 전송 실패`, error);
			}
		}
	};

	// TagBoxListContainer에서 태그 클릭 시 TagInputContainer에 추가
	const handleTagClick = (tagName) => {
		//현재 클릭한 태그의 tagName이
		if (!tags.includes(tagName)) {
			//tags에 포함되어 있지 않다면
			setTags([...tags, tagName]); //tags에 추가해주기
		}
	};

	// TagInputContainer에서 태그 삭제
	//filter는 자바스크립트의 배열 메서드. 배열 순회하며 주어진 조건 만족하는 요소들만 추출해 새로운 배열 만드는 함수
	const handleTagRemove = (tagName) => {
		//삭제 버튼 누른 태그를
		setTags(tags.filter((tag) => tag !== tagName)); //tags배열에서 필터링 해서 새로운 배열 만들기
	};

	//TagBoxListContainer에서 태그 삭제하기
	const handleTagDelete = async (tagId, tagName) => {
		try {
			await TagBoxDeleteTag(tagId);
			console.log(`태그 ${tagId} 삭제 완료`);

			// TagBoxListContainer에서 태그 삭제
			setTagBoxTags(TagBoxTags.filter((tag) => tag.id !== tagId));

			// TagInputContainer에서도 해당 태그 삭제
			setTags(tags.filter((tag) => tag !== tagName));
		} catch (error) {
			console.log(`태그 ${tagId} 삭제 실패`, error);
		}
	};

	/*
    //(placeholder 내용없애기) 였었던 것. 필요 없음이제 날릴 예정
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    */

	//-------------------------------------------------------------------여기까지 주석처리 완------------------------------------------------------

	const handleClickOutside = (e) => {
		if (tagBoxRef.current && !tagBoxRef.current.contains(e.target)) {
			setIsTagBoxListVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<Box ref={tagBoxRef}>
			<Row>
				<Text>태그</Text>
				<TagInputContainer onClick={() => setIsTagBoxListVisible(true)}>
					{tags.map((tag) => (
						<WhiteTag key={tag.id}>
							{tag}
							<CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton>
						</WhiteTag>
					))}
					<TagInput
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						//태그가 하나도 선택되지 않았고, 입력창이 포커스 되지 않았고, 입력창에 아무 것도 입력되지 않았을 때 placeholder에 '태그 선택 혹은 입력' 문구 표시
						placeholder={tags.length === 0 && !isFocused && inputValue === '' ? '태그 선택 혹은 입력' : ''}
					/>
				</TagInputContainer>
			</Row>

			{isTagBoxListVisible && (
				<TagBoxList>
					<TagBoxListContainer>
						{TagBoxTags.map((tag) => (
							<Tag key={tag.id} onClick={() => handleTagClick(tag.tagName)}>
								{tag.tagName}
								<CloseButton
									onClick={(e) => {
										e.stopPropagation();
										handleTagDelete(tag.id, tag.tagName);
									}}>
									x
								</CloseButton>
							</Tag>
						))}
					</TagBoxListContainer>
				</TagBoxList>
			)}
		</Box>
	);
}
