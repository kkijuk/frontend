import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './history.css';
import { set } from 'react-hook-form';
// zustand, api
import useRecordStore from '../../stores/useRecordStore';
import { readRecord, updateRecord } from '../../api/Record/record';
// components
import Layout from '../../components/Layout'
import AddEducationForm from '../../components/Record/addForms/AddEducationForm';
import AddAwardForm from '../../components/Record/addForms/AddAwardForm';
import AddSkillForm from '../../components/Record/addForms/AddSkillForm';
import AddLicenseForm from '../../components/Record/addForms/AddLicenseForm';
import EducationItem from '../../components/Record/readOnlyItems/EducationItem';
// import ActivityItem from '../../components/Record/readOnlyItems/ActivityItem';
import CareerItem from '../../components/Record/CareerItem';
import AwardItem from '../../components/Record/readOnlyItems/AwardItem';
import LicenseItem from '../../components/Record/readOnlyItems/LicenseItem';
import SkillItem from '../../components/Record/readOnlyItems/SkillItem';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';

const History = () => {
	const store = useRecordStore();
	const {
		// api call
		fetchRecord,
		addItem,
		updateItem,
		deleteItem,
		recordId,
		// ** 학력
		educations,
		// ** 내 커리어 카테고리
		employments, // 경력
		activitiesAndExperiences, //활동 및 경험
		projects, // 프로젝트
		eduCareers, // 교육
		// ** 신규 추가
		licenses, // 자격증
		awards, // 수상
		skills, // 스킬
		status,
		error,
	} = store;

	const [userData, setUserData] = useState({
		updatedAt: '',
		name: '',
		birthday: '',
		phone: '',
		email: '',
		address: '',
		});
	
	  // 주소 편집 모드 관리 State
	  const [isEditingAddress, setIsEditingAddress] = useState(false);
	  // input에 임시로 입력되는 주소
	  const [tempAddress, setTempAddress] = useState('');	

	// 이력서 불러오기
	useEffect(() => {
		fetchRecord().then(()=>{
			console.log(`Record ID: `, recordId);
		})
	}, [fetchRecord, recordId]);

	useEffect(() => {
		async function getUserData() {
		  const response = await readRecord(); 
		  const result = response.data;
		  if (result) {
			const { updatedAt, name, birthday, phone, email, address, profileImageUrl } = result;
			setUserData({
			  updatedAt: updatedAt || '',
			  name: name || '',
			  birthday: birthday || '',
			  phone: phone || '',
			  email: email || '',
			  address: address || '',
			  profileImageUrl: profileImageUrl || '',
			});
		  }
		}
		getUserData();
	  }, []);


	//폼 오픈 상태 관리
	const [openedForms, setOpenedForms] = useState({
		edit: { // 수정 폼 관리
			educations: null,
			licenses: null,
			awards: null,
			skills: null,
		},
		add: { // 추가 폼 관리
			educations: false,
			licenses: false,
			awards: false,
			skills: false,
		},
	});

	//수정 폼 토글
	const toggleEditForm = (category, id = null) => {
		setOpenedForms((prev) => ({
			...prev,
			edit: {
				...prev.edit,
				[category]: prev.edit[category] === id ? null : id,
			},
		}));
	};

	//추가 폼 토글
	const toggleAddForm = (category) => {
		setOpenedForms((prev) => ({
			...prev,
			add: {
				...prev.add,
				[category]: !prev.add[category], // 현재 상태를 반전
			},
		}));
	};

	// 데이터 분류
	const licenseSection = licenses.filter(item => item.licenseTag === 'LICENSE');
	const foreignSection = licenses.filter(item => item.licenseTag === 'FOREIGN');
	const skillSections = {
		IT: skills.filter(skill => skill.skillTag === 'IT'),
		OA: skills.filter(skill => skill.skillTag === 'OA'),
		GRAPHIC: skills.filter(skill => skill.skillTag === 'GRAPHIC'),
		FOREIGNLANGUAGE: skills.filter(skill => skill.skillTag === 'FOREIGNLANGUAGE'),
		ETC: skills.filter(skill => skill.skillTag === 'ETC'),
	  };

	// 섹션 이름 변환 함수
	const getSectionName = (type) => {
		const names = {
		IT: 'IT',
		OA: 'OA',
		GRAPHIC: '그래픽',
		FOREIGNLANGUAGE: '외국어',
		ETC: '기타',
		};
		return names[type] || '기타';
    };
	
	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'failed') return <p>Error: {error}</p>;

	//주소 관련 로직
	// (1) '주소를 입력하세요' 클릭 -> 편집 모드로 전환
	const handleAddressPlaceholderClick = () => {
		setIsEditingAddress(true);
		setTempAddress(''); // input 초기화
	}

	// (2) 이미 주소가 있는 상태에서 '수정' 버튼 클릭 -> 편집 모드로 전환
	const handleEditAddressClick = () => {
		setIsEditingAddress(true);
		setTempAddress(userData.address || ''); // 기존 주소값을 input에 넣음
	};
	
	// (3) input에서 변경값 반영
	const handleAddressInputChange = (e) => {
		setTempAddress(e.target.value);
	};
	
	// (4) 수정 완료 시 호출
	const handleUpdateAddress = async () => {
		try {
		// updateRecord API 호출
		const responseData = await updateRecord(recordId, 
		{
			address: tempAddress,
			profileImageUrl: "string",
		});

		// 서버에서 수정된 address를 받아온 경우
		if (responseData && responseData.address) {
			// userData에 반영
			setUserData((prev) => ({
			...prev,
			address: responseData.address,
			}));
		}

		// 편집 모드 종료
		setIsEditingAddress(false);
		} catch (err) {
		console.error('주소 업데이트 실패:', err);
		}
	};

	// (5) 취소
	const handleCancelEdit = () => {
		setIsEditingAddress(false);
		setTempAddress('');
	};

	return (
		<Layout title="서류준비">
			<div>
				{/* <AddCareerModal></AddCareerModal> */}
				<div style={{display:'flex', marginBlock:'30px'}}>
				<ProfileBox/>
				<UserInfoWrapper>
					<div style={{width:'100%'}}>
						<UpdatedAt>마지막 수정 일시: {userData.updatedAt}</UpdatedAt>
					</div>
					<InfoTable>
						<InfoLabel>이름</InfoLabel>
						<InfoValue>{userData.name}</InfoValue>

						<InfoLabel>생년월일</InfoLabel>
						<InfoValue>{userData.birthday}</InfoValue>

						<InfoLabel>전화번호</InfoLabel>
						<InfoValue>{userData.phone}</InfoValue>

						<InfoLabel>이메일</InfoLabel>
						<InfoValue>{userData.email}</InfoValue>

						<InfoLabel>주소</InfoLabel>
						<InfoValue>
							{/* 주소가 NULL 인 경우 */}
							{!userData.address && !isEditingAddress && (
								<NullModeAddress onClick={handleAddressPlaceholderClick}>
									주소를 입력하세요
								</NullModeAddress>
								)}

								{/* 주소가 NULL이 아닌데 편집 모드가 아닐 때 */}
								{userData.address && !isEditingAddress && (
								<HoverWrapper>
									<span>{userData.address}</span>
									<EditButton onClick={handleEditAddressClick}>수정</EditButton>
								</HoverWrapper>
								)}

								{/* 편집 모드일 때 */}
								{isEditingAddress && (
								<EditAddressContainer>
									<AddressInput
									type="text"
									value={tempAddress}
									onChange={handleAddressInputChange}
									placeholder="주소를 입력하세요"
									/>
									<ButtonGroup>
										<SaveButton onClick={handleUpdateAddress}>수정</SaveButton>
										<CancelButton onClick={handleCancelEdit}>취소</CancelButton>
									</ButtonGroup>
								</EditAddressContainer>
								)}
						</InfoValue>
					</InfoTable>
				</UserInfoWrapper>
				</div>
				<Line></Line>
				<SectionWrapper>
					<SectionHeader>
						<h2>학력</h2>
						<AddButton onClick={() => toggleAddForm('educations')}>+</AddButton>
					</SectionHeader>
					<ContentWrapper>
						{openedForms.add.educations && 
						<AddEducationForm 
							onClose={() => toggleAddForm('educations')}
						/>}
						<div style={{height:'50px'}}></div>
						{educations.map((education, index) => (
							<EducationItem
								key={education.id}
								data={education}
								isLastItem={index === educations.length - 1}
								// onEdit={() => toggleEditForm('educations', education.id)}
							/>
						))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>경력</h2>
						{/* <AddButton onClick={()=>toggleForm('educations')}>+</AddButton> */}
					</SectionHeader>
					<ContentWrapper>
						{employments.map((employment, index) => (
								<CareerItem
									key={employment.id}
									data={employment}
									isLastItem={index === employments.length - 1}
							/>
						))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>활동 및 경험</h2>
						{/* <AddButton onClick={()=>toggleForm('educations')}>+</AddButton> */}
					</SectionHeader>
					<ContentWrapper>
					{activitiesAndExperiences.map((activity, index) => (
							<CareerItem
								key={activity.id}
								data={activity}
								isLastItem={index === activitiesAndExperiences.length - 1}
							/>
					))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>프로젝트</h2>
						{/* <AddButton onClick={()=>toggleForm('educations')}>+</AddButton> */}
					</SectionHeader>
					<ContentWrapper>
						{projects.map((project, index) => (
							<CareerItem
								key={project.id}
								data={project}
								isLastItem={index === projects.length - 1}
							/>
						))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>교육</h2>
						{/* <AddButton onClick={()=>toggleForm('educations')}>+</AddButton> */}
					</SectionHeader>
					<ContentWrapper>
						{eduCareers.map((eduCareer, index) => (
							<CareerItem
								key={eduCareer.id}
								data={eduCareer}
								isLastItem={index === eduCareers.length - 1}	
							/>
						))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>수상</h2>
						<AddButton onClick={() => toggleAddForm('awards')}>+</AddButton>
					</SectionHeader>
					<ContentWrapper>
						{openedForms.add.awards &&
						<AddAwardForm
							onClose={() => toggleAddForm('awards')}
						/>}
						<div style={{height:'50px'}}></div>
						{awards.map((award, index) => (
							<AwardItem 
								key={award.id} 
								data={award} 
								onEdit={() => toggleEditForm('awards', award.id)} 
							/>
						))}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>자격증 · 외국어</h2>
						<AddButton onClick={() => toggleAddForm('licenses')}>+</AddButton>
					</SectionHeader>
					<ContentWrapper>
						{openedForms.add.licenses &&
						<AddLicenseForm
							onClose={() => toggleAddForm('licenses')}
						/>}
						<div style={{height:'50px'}}></div>
						<Section>
							<Tag>자격증</Tag>
							<ItemsWrapper>
								{licenseSection.map((license, index) => (
									<LicenseItem 
										key={license.id} 
										data={license} 
										// onEdit={() => toggleEditForm('licenses', license.id)} 
									/>
								))}
							</ItemsWrapper>
						</Section>
						<div style={{height:'50px'}}></div>
						<Section>
							<Tag>외국어</Tag>
							<ItemsWrapper>
								{foreignSection.map((foreign, index) => (
									<LicenseItem 
										key={foreign.id} 
										data={foreign} 
										// onEdit={() => toggleEditForm('licenses', license.id)} 
									/>
								))}
							</ItemsWrapper>
						</Section>
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>스킬</h2>
						<AddButton onClick={() => toggleAddForm('skills')}>+</AddButton>
					</SectionHeader>
					<ContentWrapper>
						{openedForms.add.skills &&
						<AddSkillForm
							onClose={() => toggleAddForm('skills')}
						/>}
						<div style={{height:'50px'}}></div>
						{Object.entries(skillSections).map(([sectionType, sectionSkills]) => 
							sectionSkills.length > 0 ? (
							<Section key={sectionType}>
								<Tag>{getSectionName(sectionType)}</Tag>
								<ItemsWrapper>
									{sectionSkills.map(skill => (
									<SkillItem
										key={skill.id}
										data={skill}
										// onEdit={() => console.log(`Edit Skill: ${skill.id}`)}
									/>
									))}
								</ItemsWrapper>
								<div style={{height:'50px'}}></div>
							</Section>
						):null)}
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>

				<SectionWrapper>
					<SectionHeader>
						<h2>추가자료</h2>
						{/* <AddButton onClick={()=>toggleForm('educations')}>+</AddButton> */}
					</SectionHeader>
					<ContentWrapper>
						
					</ContentWrapper>
				</SectionWrapper>
				<Line></Line>
			</div>
		</Layout>
	);
};

export default History;

const SectionWrapper = styled.div`
  margin-bottom: 40px;
  width:820px;
  padding-top:25px;
  padding-bottom:25px;
`;

const SectionHeader = styled.div`
width:820px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:0px;
.
  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    background: var(--main-01, #3AAF85);
    color: var(--white, #FFF);
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 수평 가운데 정렬 */
    justify-content: center; /* 수직 가운데 정렬 (필요 시) */
    margin-top: 20px; /* SectionHeader와 간격 조절 */
    width: 100%; /* 부모 컨테이너의 너비 사용 */
`;


const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddButton = styled.div`
	width: 47px;
	height: 37px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #D9D9D9);
	background:#FFFFFF;
	color: var(--gray-03, #D9D9D9);
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor:pointer;
	padding-bottom:5px;
`

const Line = styled.div`
	width: 820px;
	height: 2px;
	background:#F1F1F1;
`

const Section = styled.div`
	width:100%;
  display: flex;
  align-items: flex-start;
  gap: 40px;
`;

const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 배치 */
  gap: 25px;
`;

const Tag = styled.div`
	width: 81px;
	height: 22px;
	flex-shrink: 0;
	background:#707070;
	color: var(--white, #FFF);
	font-family: Regular;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
`

const ProfileBox = styled.div`
	width: 150px;
	height: 200px;
	background: var(--gray-05, #F1F1F1);
`

const UserInfoWrapper = styled.div`
	width: 650px;
	display:flex;
	flex-direction:column;
	margin-left: 40px;
	position: relative;
`
const UpdatedAt = styled.div`
  width: 250px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  color: #707070;
  font-family: Regular;
`;

const InfoTable = styled.div`
	display: grid;
	grid-template-columns: auto 1fr; 
	row-gap: 15px; 
	column-gap: 30px;
	margin-top: 20px;
`

const InfoLabel = styled.div`
  font-size: 18px;
  color: #707070;
  font-family: Regular;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #707070;
  font-family: Regular;
`;

const NullModeAddress = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #999;
`;

// 주소가 존재할 때 hover 시 '수정' 버튼 보이기
const HoverWrapper = styled.div`
  display: inline-block;
  position: relative;

`;

const EditButton = styled.button`
	width: 40px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #707070);
	font-size: 12px;
	background: var(--gray-06, #F5F5F5);
	cursor: pointer;
	border:none;
	margin-left: 20px;
	justify-content:center;
`;

// 편집모드일 때 나타나는 컴포넌트
const EditAddressContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const AddressInput = styled.input`
  font-size: 14px;
  color:#707070;
  width: 200px;
  border:none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
	width: 42px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #707070);
	font-size: 12px;
	background: var(--gray-06, #F5F5F5);
	cursor: pointer;
	border:none;
	display:flex;
	justify-content:center;
`;

const CancelButton = styled.button`
	width: 42px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #F5F5F5);
	font-size: 12px;
	background: var(--gray-06, #707070);
	cursor: pointer;
		border:none;
	display:flex;
	justify-content:center;
`;
