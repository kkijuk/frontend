import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Affiliation1 } from './Affiliation';
import { Affiliation2 } from './Affiliation';
import SvgIcon from '../../shared/SvgIcon';
import { validateAndFilterForm } from './validateAndFilterForm';
import { createCareer, editCareer, deleteCareer } from '../../../api/Mycareer/Career';
import DateInput from './DateInput';
import UnknownRadio from './UnknownRadio';
import CareerTypeDropdown, { CareerTypeDropdown2 } from './CareerTypeDropdown';
import ParticipantType from './ParticipantType';
import { Form } from 'react-router-dom';
import moment from 'moment'; // moment 라이브러리 임포트(세연)

const AddCareerModal = ({ onClose, mode = 'add', initialData }) => {
	const navigate = useNavigate();

	//카테고리 정보
	const categoryMap = {
		1: '동아리',
		2: '대외활동',
		3: '공모전/대회',
		4: '프로젝트',
		5: '경력',
		6: '교육',
		7: '기타',
	};
	const categoryColors = {
		1: '#FCC400',
		2: '#77AFF2',
		3: '#C48DEF',
		4: '#78D333',
		5: '#FA7C79',
		6: '#F99538',
		7: '#707070',
	};

	// 현재 모달 모드(활동 추가 or 활동 수정)
	const isEditMode = mode === 'edit';

	// 현재 선택된 카테고리 (기본값은 1)
	const [selectedCategory, setSelectedCategory] = useState(1);

	useEffect(() => {
		if (initialData?.category) {
			// 한글 카테고리 이름을 숫자 키로 변환
			const categoryNumber = Object.keys(categoryMap).find(
				(key) => categoryMap[key] === initialData.category.categoryKoName, // 수정된 부분
			);
			setSelectedCategory(parseInt(categoryNumber, 10) || 1);
		}
	}, [initialData]);

	//12가지 유형의 form Data 상태관리
	const [name, setName] = useState(''); //활동명
	const [alias, setAlias] = useState(''); //별칭
	const [startdate, setStartdate] = useState(null); //시작일자
	const [enddate, setEnddate] = useState(null); //종료일자
	const [unknown, setUnknown] = useState(false); //종료일자 알 수 없음 여부
	const [location, setLocation] = useState('ON_CAMPUS'); //소속(ON_CAMPUS: 교내, OFF_CAMPUS: 교외, OTHER: 기타)
	const [role, setRole] = useState(''); //역할
	const [organizer, setOrganizer] = useState(''); //주최
	const [careerType, setCareerType] = useState(''); //경력분류
	const [workplace, setWorkplace] = useState(''); //근무처
	const [position, setPosition] = useState(''); //직급/직위
	const [jobField, setJobField] = useState(''); //직무/분야
	const [time, setTime] = useState(0); //교육시간
	// const [participantType, setParticipantType] = useState({}); //인원-팀인원-기여도
	const [isTeam, setIsTeam] = useState(false);
	const [teamSize, setTeamSize] = useState(0);
	const [contribution, setContribution] = useState(0);

	//각 폼 별 상태 모니터링
	/*
	useEffect(() => {
		console.log({
			name,
			alias,
			startdate,
			enddate,
			unknown,
			location,
			role,
			organizer,
			careerType,
			position,
			jobField,
			time,
			isTeam,
			teamSize,
			contribution,
		});
	}, [
		name,
		alias,
		startdate,
		enddate,
		unknown,
		location,
		role,
		organizer,
		careerType,
		position,
		jobField,
		time,
		isTeam,
		teamSize,
		contribution,
	]);
*/

	// 초기 데이터 설정
	useEffect(() => {
		if (initialData) {
			setName(initialData.name || '');
			setAlias(initialData.alias || '');
			setStartdate(initialData.startdate || null);
			setEnddate(initialData.endDate || null);
			setUnknown(initialData.unknown || false);
			setLocation(initialData.location || 'ON_CAMPUS');
			setRole(initialData.role || '');
			setOrganizer(initialData.organizer || '');
			setCareerType(initialData.careerType || '');
			setWorkplace(initialData.workplace || '');
			setPosition(initialData.position || '');
			setJobField(initialData.jobField || '');
			setTime(initialData.time || 0);
			setIsTeam(initialData.isTeam || false);
			setTeamSize(initialData.teamSize || 0);
			setContribution(initialData.contribution || 0);
		}
	}, [initialData]);

	// 기간 설정 관련
	const hasError = !startdate || (!unknown && !enddate);

	// 경력 Dropdown 옵션
	const careerOptions = ['아르바이트', '인턴', '정규직', '계약직', '프리랜서'];
	const [isCareerDropdownOpen, setIsCareerDropdownOpen] = useState(false);

	//Logic: 선택된 카테고리에 따라 상이한 forms 조합을 렌더링합니다.
	const renderFormByCategory = () => {
		switch (selectedCategory) {
			case 1: //동아리
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 소속 */}
						<FormItem>
							<label style={{ marginBottom: '5px' }}>
								소속 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<Affiliation1
								value={location}
								onAffiliationChange={(newLocation) => {
									setLocation(newLocation);
								}}
							/>
						</FormItem>

						{/* 역할 */}
						<FormItem>
							<label style={{ marginBottom: '5px' }}>역할</label>
							<input
								type="text"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								placeholder="ex) 팀장, 부원, 기획자 등"></input>
						</FormItem>
					</>
				);
			case 2: //대외활동
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 주최 */}
						<FormItem>
							<label>
								주최 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)}></input>
						</FormItem>

						{/* 역할 */}
						<FormItem>
							<label>역할</label>
							<input
								type="text"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								placeholder="ex) 팀장, 부원, 기획자 등"></input>
						</FormItem>

						{/* 개인-팀 */}
						<FormItem spanTwoColumns>
							<ParticipantType
								isTeam={isTeam}
								setIsTeam={setIsTeam}
								teamSize={teamSize}
								setTeamSize={setTeamSize}
								contribution={contribution}
								setContribution={setContribution}
							/>
						</FormItem>
					</>
				);
			case 3: //공모전/대회
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 주최 */}
						<FormItem spanTwoColumns>
							<label>
								주최 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)}></input>
						</FormItem>

						{/* 개인-팀 */}
						<FormItem spanTwoColumns>
							<ParticipantType
								isTeam={isTeam}
								setIsTeam={setIsTeam}
								teamSize={teamSize}
								setTeamSize={setTeamSize}
								contribution={contribution}
								setContribution={setContribution}
							/>
						</FormItem>
					</>
				);
			case 4: //프로젝트
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 소속 */}
						<FormItem spanTwoColumns>
							<label style={{ marginBottom: '5px' }}>
								소속 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<Affiliation2
								onAffiliationChange={(newLocation) => {
									setLocation(newLocation);
								}}
							/>
						</FormItem>

						{/* 개인-팀 */}
						<FormItem spanTwoColumns>
							<ParticipantType
								isTeam={isTeam}
								setIsTeam={setIsTeam}
								teamSize={teamSize}
								setTeamSize={setTeamSize}
								contribution={contribution}
								setContribution={setContribution}
							/>
						</FormItem>
					</>
				);
			case 5: //경력
				return (
					<>
						{/* 분류 */}
						<FormItem>
							<label>
								분류 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							{/* <CareerTypeDropdown onChange={(e)=>setCareerType(e.target.value)}></CareerTypeDropdown> */}
							<CareerTypeDropdown2
								options={careerOptions}
								placeholder="경력 구분을 선택해주세요."
								value={careerType}
								onChange={setCareerType}
								isOpen={isCareerDropdownOpen}
								onToggle={() => setIsCareerDropdownOpen(!isCareerDropdownOpen)}
							/>
						</FormItem>

						{/* 근무처 */}
						<FormItem>
							<label>
								근무처 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									근무한 곳의 이름을 작성해주세요.
								</span>
							</label>
							<input type="text" value={alias} onChange={(e) => setAlias(e.target.value)}></input>
						</FormItem>

						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									경력의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 직급/직위 */}
						<FormItem>
							<label>직급/직위</label>
							<input type="text" value={position} onChange={(e) => setPosition(e.target.value)}></input>
						</FormItem>

						{/* 직무/분야 */}
						<FormItem>
							<label>직무/분야</label>
							<input type="text" value={jobField} onChange={(e) => setJobField(e.target.value)}></input>
						</FormItem>
					</>
				);
			case 6: //교육
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>

						{/* 주최 */}
						<FormItem>
							<label>
								주최 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)}></input>
						</FormItem>

						{/* 교육 시간 */}
						<FormItem>
							<label>
								교육 시간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
							<input type="text" value={time} onChange={(e) => setTime(e.target.value)}></input>
						</FormItem>
					</>
				);
			case 7: //기타
				return (
					<>
						{/* 활동명 */}
						<FormItem spanTwoColumns>
							<label>
								활동명 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동의 성격이 잘 드러나도록 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)"></input>
						</FormItem>

						{/* 별칭 */}
						<FormItem spanTwoColumns>
							<label>
								별칭 <span style={{ color: '#FC5555' }}>*</span>
								<span style={{ color: '#3AAF85', fontSize: '14px', marginLeft: '10px' }}>
									활동(동아리, 프로젝트 등)의 이름을 작성해주세요.
								</span>
							</label>
							<input
								type="text"
								value={alias}
								onChange={(e) => setAlias(e.target.value)}
								placeholder="ex) UMC, 멋쟁이사자처럼 등(20자 이내)"></input>
						</FormItem>

						{/* 기간 */}
						<FormItem spanTwoColumns>
							<label>
								기간 <span style={{ color: '#FC5555' }}>*</span>
							</label>
						</FormItem>

						{/* 시작날짜 */}
						<FormItem>
							<DateInput value={startdate} onChange={setStartdate} />
						</FormItem>
						{/* 종료날짜 */}
						<FormItem>
							<DateInput value={enddate} onChange={setEnddate} disabled={unknown} />
							<UnknownRadio isUnknown={unknown} onToggle={() => setUnknown(!unknown)} />
						</FormItem>
					</>
				);
			default:
				return null;
		}
	};

	// 활동 추가 함수
	const handleAddCareer = async () => {
		// 날짜 입력 유효성 검증
		if (hasError) {
			alert('올바른 기간 입력이 아닙니다.');
			return;
		}

		// startdate와 enddate를 YYYY-MM-DD 형식으로 변환하기 위해 추가 (에러)
		const formattedStartdate = moment(startdate).format('YYYY-MM-DD');
		const formattedEnddate = unknown ? null : moment(enddate).format('YYYY-MM-DD');

		const allFormData = {
			name,
			alias,
			startdate: formattedStartdate,
			enddate: formattedEnddate,
			unknown,
			location,
			role,
			organizer,
			careerType,
			position,
			jobField,
			time,
			isTeam,
			teamSize,
			contribution,
		};
		console.log('Sending data:', allFormData);

		// 날짜 외 입력 데이터 검증 및 필터링 실행
		// 잘 수행되면 isValid:true와 filteredDate를, 오류가 있으면 isValid:false와 errors를 반환
		const { isValid, errors, filteredData } = validateAndFilterForm(selectedCategory, allFormData);

		//오류 생길 경우
		if (!isValid) {
			alert(errors.join('\n'));
			return;
		}

		if (mode === 'edit') {
			// 수정모드일 경우
			try {
				// 수정 모드에서는 id를 추가해줍니다.
				const careerId = initialData.id;
				console.log('Sending data:', filteredData);
				const response = await editCareer(selectedCategory, careerId, filteredData);
				console.log('Success - 활동 수정: ', response);
				// onClose();
				window.location.reload();
			} catch (error) {
				console.error('수정모드에서 id 추가 중 오류 발생: ', error);
			}
		} else {
			// 추가모드일 경우
			try {
				console.log('Sending data:', filteredData);
				const response = await createCareer(selectedCategory, filteredData);
				console.log('Success - 활동 추가: ', response);
				// onClose();
				window.location.reload();
			} catch (error) {
				console.error('createCareer 호출 중 오류 발생: ', error.response ? error.response.data : error.message);
			}
		}

		onClose();
	};

	// 활동 삭제 함수
	const handleDeleteCareer = async () => {
		if (mode === 'edit') {
			try {
				const careerId = initialData.id;
				const response = await deleteCareer(selectedCategory, careerId);
				console.log('Success - 활동 삭제: ', response);
				// onClose();
				navigate('/mycareer');
			} catch (error) {
				console.error('deleteCareer 호출 중 오류 발생: ', error.response ? error.response.data : error.message);
			}
		}
		onClose();
	};

	return (
		<ModalBackground>
			<ModalContainer>
				<CloseButton onClick={onClose}>
					<SvgIcon name="close" size={20} color="#999" />
				</CloseButton>
				<h1 style={{ textAlign: 'center' }}>{isEditMode ? '활동 수정' : '활동 추가'}</h1>
				<ButtonContainer>
					{Object.keys(categoryMap).map((key) => (
						<CategoryButton
							type="button"
							key={key}
							isSelected={selectedCategory === parseInt(key)}
							bgColor={categoryColors[key]}
							onClick={() => setSelectedCategory(parseInt(key))}>
							{categoryMap[key]}
						</CategoryButton>
					))}
				</ButtonContainer>
				<div style={{ height: '18px' }} />
				<ModalForm>{renderFormByCategory()}</ModalForm>
				{isEditMode ? (
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
						<DeleteButton type="button" onClick={handleDeleteCareer}>
							삭제
						</DeleteButton>
						<SaveButton type="button" onClick={handleAddCareer} style={{ width: '425px' }}>
							저장
						</SaveButton>
					</div>
				) : (
					<SaveButton type="button" onClick={handleAddCareer}>
						저장
					</SaveButton>
				)}
			</ModalContainer>
		</ModalBackground>
	);
};

export default AddCareerModal;

// Modal 전체 레이아웃
const ModalForm = styled.form`
	border-radius: 10px;
	background: #fff;
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
	grid-gap: 20px; /* 요소들 간의 간격 */
	column-gap: 50px;
	width: 100%;

	// 스크롤바
	max-height: 400px;
	overflow-y: scroll;
	overflow-x: hidden;

	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}
`;

// 전체 너비를 차지하는 폼 요소 (활동명, 별칭 등)
const FullWidthInput = styled.div`
	grid-column: span 2; /* 열 두 개를 차지 */
`;

// 개별 폼 요소 스타일
const FormItem = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: ${(props) => (props.spanTwoColumns ? 'span 2' : 'span 1')}; /* 열을 조건부로 설정 */
	// width: 560px;
	label {
		margin-bottom: 8px;
		margin-top: 22px;
		font-size: 18px;
		// font-weight: 400;
		font-family: 'SemiBold';
	}
	input {
		height: 30px;
		padding: 10px;
		font-size: 16px;
		font-family: 'Regular';
		border: none;
		border-radius: 10px;
		background: #f5f5f5;
		// width: 100%;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	gap: 10px; /* 버튼들 간의 간격 설정 */
	justify-content: space-between; /* 버튼을 가운데 정렬 */
	flex-wrap: wrap; /* 버튼들이 화면에 맞지 않을 경우 줄바꿈 처리 */
`;

const CategoryButton = styled.button`
	display: flex;
	height: 35px;
	padding: 6px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 10px;
	font-size: 14px;
	font-family: 'Regular';
	cursor: pointer;
	border: none;

	background-color: ${(props) => (props.isSelected ? props.bgColor : '#F5F5F5')};
	color: ${(props) => (props.isSelected ? '#FFF' : '#707070')};

	&:focus {
		outline: none;
	}
`;
const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 580px;
	max-width: 90%;
	background-color: #fff;
	border-radius: 10px;
	padding: 50px 120px;
	z-index: 1000;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 768px) {
		width: 100%;
		max-height: 90%;
		overflow-y: auto;
	}
`;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

const SaveButton = styled.button`
	width: 580px;
	height: 50px;
	background-color: #3aaf85;
	border: none;
	border-radius: 10px;
	color: white;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	font-size: 18px;
	font-family: 'Regular';
`;

const DeleteButton = styled.button`
	width: 140px;
	height: 50px;
	background-color: #fff;
	border-radius: 10px;
	border: 1.5px solid var(--sub-rd, #fa7c79);
	color: #fa7c79;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	margin-right: 15px;
	font-size: 18px;
	font-family: 'Regular';
`;

const CloseButton = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background: none;
	border: none;
	font-size: 24px;
	font-weight: bold;
	cursor: pointer;
	color: #999999;
`;
