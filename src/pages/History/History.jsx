import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './history.css';
import { set } from 'react-hook-form';
// zustand, api
import useRecordStore from '../../stores/useRecordStore';
import { createRecord, readRecord, updateRecord } from '../../api/Record/record';
// components
import Layout from '../../components/Layout';
import AddEducationForm from '../../components/Record/addForms/AddEducationForm';
import AddAwardForm from '../../components/Record/addForms/AddAwardForm';
import AddSkillForm from '../../components/Record/addForms/AddSkillForm';
import AddLicenseForm from '../../components/Record/addForms/AddLicenseForm';
import AddFileForm from '../../components/Record/addForms/AddFileForm';
import EducationItem from '../../components/Record/readOnlyItems/EducationItem';
// import ActivityItem from '../../components/Record/readOnlyItems/ActivityItem';
import CareerItem from '../../components/Record/CareerItem';
import AwardItem from '../../components/Record/readOnlyItems/AwardItem';
import LicenseItem from '../../components/Record/readOnlyItems/LicenseItem';
import SkillItem from '../../components/Record/readOnlyItems/SkillItem';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import ScrollNavigator from '../../components/Record/ScrollNavigator';
import FileItem from '../../components/Record/readOnlyItems/FileItem';
import Profile from '../../components/Record/Profile';
import EmailAndAddress from '../../components/Record/EmailAndAddress';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const History = () => {
	// useRecordStore 호출
	const store = useRecordStore();
	const {
		// api call
		fetchRecord,
		addItem,
		updateItem,
		deleteItem,
		recordId,
		addEtcItem,
		deleteEtcItem,
		updateEtcItem,
		updateUserData,
		//사용자 정보
		userData,
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
		files,
		// 업데이트 날짜
		updated_at,
		status,
		error,
	} = store;

	// DATA
	const {profile, name, birth, mobile, email, address} = userData;
	const licenseSection = licenses.filter(item => item.licenseTag === 'LICENSE');
	const foreignSection = licenses.filter(item => item.licenseTag === 'FOREIGN');
	const skillSections = {
		IT: skills.filter(skill => skill.skillTag === 'IT'),
		OA: skills.filter(skill => skill.skillTag === 'OA'),
		GRAPHIC: skills.filter(skill => skill.skillTag === 'GRAPHIC'),
		FOREIGNLANGUAGE: skills.filter(skill => skill.skillTag === 'FOREIGNLANGUAGE'),
		ETC: skills.filter(skill => skill.skillTag === 'ETC'),
	};

	// useState
	const [showCreateButton, setShowCreateButton] = useState(false); // 이력서 생성 여부
	const [openedForms, setOpenedForms] = useState({ // 폼 오픈 상태 관리
		add: { // 추가 폼 관리
			educations: false,
			licenses: false,
			awards: false,
			skills: false,
			files: false,
		},
	});
	const [isAddCareerModalOpen, setIsAddCareerModalOpen] = useState(false); // 내 커리어 관련 활동 추가 모달 관리
	const [activeSection, setActiveSection] = useState("");	// 인디케이터 활성화 섹션
	const [editableUserData, setEditableUserData] = useState({	// 사용자 정보 수정
		profileImageUrl: profile,
		address: address,
		email: email,
	});
	const [profileBlob, setProfileBlob] = useState(profile);	// 프로필 이미지

	// useEffect
	// 이력서 불러오기
	useEffect(() => {
		const fetchData = async () => {
			try{
				await fetchRecord();
				if(error === "Record not created"){
					setShowCreateButton(true);
				}
				console.log('Record Id:', recordId);
			} catch (error) {
				console.error('Error: fetchRecord: ', error);
				setShowCreateButton(true);
			}
		}
		fetchData();

		// 인디케이터 관련 로직 - 화면 영역 계산
		// const observer = new IntersectionObserver(
		// 	(entries) => {
		// 		entries.forEach((entry)=>{
		// 			if(entry.isIntersecting){
		// 				setActiveSection(entry.target.id);
		// 			}
		// 		})
		// 	},
		// 	{ rootMargin: "-50% 0px -50% 0px" }
		// )

		// sections.forEach((section) => {
		// 	const element = document.getElementById(section.id);
		// 	if (element) observer.observe(element);

		// });

		// return ()=>observer.disconnect();

	}, [fetchRecord]);

	useEffect(() => {
		// 사용자 정보 업데이트
		updateUserData(editableUserData); //in useRecordStore
	}, [editableUserData]);


	// LOGIC
	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'failed') return <p>Error: {error}</p>;

	// 이력서 생성
	const handleCreateRecord = async () => {
		try {
			const response = await createRecord();
			window.location.reload();
			console.log('Success - createRecord: ', response.data);
		} catch (error) {
			console.error('Error: createRecord: ', error);
		}
	}

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

	// 인디케이터 관련 로직
	//(1) section, activeSection
	const sections = [
		{id: "user", name: "인적사항"},
		{id: "educations", name: "학력"},
		{id: "employments", name: "경력"},
		{id: "activitiesAndExperiences", name: "활동 및 경험"},
		{id: "projects", name: "프로젝트"},
		{id: "eduCareers", name: "교육"},
		{id: "awards", name: "수상"},
		{id: "licenses", name: "자격증 · 외국어"},
		{id: "skills", name: "스킬"},
		{id:"etc", name: "추가자료"}
	];
	

	//(2) 인디케이터 메뉴 클릭
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if(element) {
			element.scrollIntoView({behavior: "smooth", block: "start"});
		}
	}

	// 인적사항 변경 관련 로직
	//(1) 프로필 사진 변경 관련 로직
	const handleProfileChange = (file) => {
		setProfileBlob(file);
		setEditableUserData((prev) => ({
			...prev,
			profileImageUrl: file,
		}));
		console.log('Profile Image changed:', file);
	}

	//(2) 이메일 또는 주소 변경 시
	const handleEmailOrAddressChange = (data) => {
		if(data.type === 'email'){
			setEditableUserData((prev) => ({
				...prev,
				email: data.data
			}));
		} 
		
		if(data.type === 'address'){
			setEditableUserData((prev) => ({
				...prev,
				address: data.data
			}));
		}
	};

	return (
		<>
			{showCreateButton ? (
				<CreateRecordButton onClick={handleCreateRecord}>
					이력서 생성하기
				</CreateRecordButton>
			) : (
				// <Layout 
				// 	id = {sections[0].id}
				// 	key = {sections[0].id}
				// 	leftAsideContent={
				// 		<ScrollNavigator
				// 			sections = {sections}
				// 			activeSection={activeSection}
				// 			onClick={scrollToSection}
				// 		/>
				// 	}
				// >
					<div style={{width:'100%', minHeight:'100vh'}}>
						{/* <AddCareerModal></AddCareerModal> */}
						<ScrollNavigatorContainer>
							<ScrollNavigator
								sections = {sections}
								activeSection={activeSection}
								onClick={scrollToSection}
							/>
						</ScrollNavigatorContainer>
						{isAddCareerModalOpen &&
							<AddCareerModal
								onClose={() => setIsAddCareerModalOpen(false)}
							/>
						}
						<div style={{display:'flex', marginBlock:'30px'}}>
						{/* <ProfileBox/> */}
						<div
							id = {sections[0].id}	
							key = {sections[0].id}	
						/>
						<Profile
							profileBlob={profileBlob}
							onProfileChange={handleProfileChange}
						/>
						<UserInfoWrapper>
							<div style={{width:'100%'}}>
								<UpdatedAt>마지막 수정 일시: {updated_at}</UpdatedAt>
							</div>
							<InfoTable>
								<InfoLabel>이름</InfoLabel>
								<InfoValue>{name}</InfoValue>

								<InfoLabel>생년월일</InfoLabel>
								<InfoValue>{birth}</InfoValue>

								<InfoLabel>전화번호</InfoLabel>
								<InfoValue>{mobile}</InfoValue>

								<InfoLabel>이메일</InfoLabel>
								<InfoValue>
									<EmailAndAddress
										type="email"
										data={email}
										onSave={(data) => handleEmailOrAddressChange(data)}
									/>
								</InfoValue>

								<InfoLabel>주소</InfoLabel>
								<InfoValue>
									<EmailAndAddress
										type="address"
										data={address}
										onSave={(data) => handleEmailOrAddressChange(data)}
									/>
								</InfoValue>
							</InfoTable>
						</UserInfoWrapper>
						</div>
						<Line></Line>
						<SectionWrapper>
							<SectionHeader
								id = {sections[1].id}
								key = {sections[1].id}
							>
								<h2>학력</h2>
								<AddButton onClick={() => toggleAddForm('educations')}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{openedForms.add.educations && 
								<AddEducationForm 
									onClose={() => toggleAddForm('educations')}
									onSave={(updates) => addItem('educations', recordId, updates)}
								/>}
								{educations.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{educations.map((education, index) => (
									<EducationItem
										key={education.id}
										data={education}
										isLastItem={index === educations.length - 1}
										onUpdate = {(updates) => updateItem('educations', education.id, updates)}
										onDelete={() => deleteItem('educations', education.id)}
									/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[2].id}
								key = {sections[2].id}
							>
								<h2>경력</h2>
								<AddButton onClick={()=>setIsAddCareerModalOpen(true)}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{employments.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{employments.map((employment, index) => (
									<CareerItem
										key={employment.id}
										data={employment}
										isLastItem={index === employments.length - 1}
										setIsOpen={(isOpen) => setIsAddCareerModalOpen(isOpen)}
									/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader						
								id = {sections[3].id}
								key = {sections[3].id}
							>
								<h2>활동 및 경험</h2>
								<AddButton onClick={()=>setIsAddCareerModalOpen(true)}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{activitiesAndExperiences.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{activitiesAndExperiences.map((activity, index) => (
										<CareerItem
											key={activity.id}
											data={activity}
											isLastItem={index === activitiesAndExperiences.length - 1}
											setIsOpen={(isOpen) => setIsAddCareerModalOpen(isOpen)}
										/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[4].id}
								key = {sections[4].id}
							>
								<h2>프로젝트</h2>
								<AddButton onClick={()=>setIsAddCareerModalOpen(true)}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{projects.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{projects.map((project, index) => (
									<CareerItem
										key={project.id}
										data={project}
										isLastItem={index === projects.length - 1}
										setIsOpen={(isOpen) => setIsAddCareerModalOpen(isOpen)}
									/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[5].id}
								key = {sections[5].id}
							>
								<h2>교육</h2>
								<AddButton onClick={()=>setIsAddCareerModalOpen(true)}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{eduCareers.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{eduCareers.map((eduCareer, index) => (
									<CareerItem
										key={eduCareer.id}
										data={eduCareer}
										isLastItem={index === eduCareers.length - 1}	
										setIsOpen={(isOpen) => setIsAddCareerModalOpen(isOpen)}
									/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[6].id}
								key = {sections[6].id}
							>
								<h2>수상</h2>
								<AddButton onClick={() => toggleAddForm('awards')}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{openedForms.add.awards &&
								<AddAwardForm
									onSave={(updates) => addItem('awards', recordId, updates)}
									onClose={() => toggleAddForm('awards')}
								/>}
								{awards.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{awards.map((award, index) => (
									<AwardItem 
										key={award.id} 
										data={award} 
										onUpdate = {(updates) => updateItem('awards', award.id, updates)}
										onDelete={() => deleteItem('awards', award.id)}
									/>
								))}
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[7].id}
								key = {sections[7].id}
							>
								<h2>자격증 · 외국어</h2>
								<AddButton onClick={() => toggleAddForm('licenses')}>+</AddButton>
							</SectionHeader>
							<ContentWrapper style={{gap:'50px'}}>
								{openedForms.add.licenses &&
								<AddLicenseForm
									onSave={(updates) => addItem('licenses', recordId, updates)}
									onClose={() => toggleAddForm('licenses')}
								/>}
								{licenseSection.length === 0 && foreignSection.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								<Section>
									{licenseSection.length !== 0 && <Tag>자격증</Tag>}
									<ItemsWrapper>
										{licenseSection.map((license, index) => (
											<LicenseItem 
												key={license.id} 
												data={license} 
												isSecondColumn={index % 2 === 1}
												onUpdate = {(updates) => updateItem('licenses', license.id, updates)}
												onDelete={() => deleteItem('licenses', license.id)}
											/>
										))}
									</ItemsWrapper>
								</Section>

								<Section>
									{foreignSection.length!==0 && <Tag>외국어</Tag>}
									<ItemsWrapper>
										{foreignSection.map((foreign, index) => (
											<LicenseItem 
												key={foreign.id} 
												data={foreign} 
												isSecondColumn={index % 2 === 1}
												onUpdate = {(updates) => updateItem('licenses', foreign.id, updates)}
												onDelete={() => deleteItem('licenses', foreign.id)}
											/>
										))}
									</ItemsWrapper>
								</Section>
							</ContentWrapper>
						</SectionWrapper>
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[8].id}
								key = {sections[8].id}
							>
								<h2>스킬</h2>
								<AddButton onClick={() => toggleAddForm('skills')}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{openedForms.add.skills &&
								<AddSkillForm
									onSave={(updates) => addItem('skills', recordId, updates)}
									onClose={() => toggleAddForm('skills')}
								/>}
								{skills.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{Object.entries(skillSections).map(([sectionType, sectionSkills]) => 
									sectionSkills.length > 0 ? (
									<Section key={sectionType}>
										<Tag>{getSectionName(sectionType)}</Tag>
										<ItemsWrapper>
											{sectionSkills.map(skill => (
											<SkillItem
												key={skill.id}
												data={skill}
												onUpdate={(updates) => updateItem('skills', skill.id, updates)}
												onDelete={() => deleteItem('skills', skill.id)}
											/>
											))}
										</ItemsWrapper>
										<div style={{height:'50px'}}></div>
									</Section>
								):null)}
							</ContentWrapper>
						</SectionWrapper>
						{/* <Line></Line> */}

						{/* <SectionWrapper>
						<SectionHeader
							id = {sections[9].id}
							key = {sections[9].id}
						>
							<h2>추가자료</h2>
							<AddButton onClick={() => toggleAddForm('files')}>+</AddButton>
							</SectionHeader>
							<ContentWrapper>
								{openedForms.add.files &&
									<AddFileForm
										onClose={() => toggleAddForm('files')}
										onSave={(data) => addEtcItem(data)}
										
								/>}
								{files.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								{files.map((file, index)=>{
									<FileItem
										data={file}
										onDelete={(data) => deleteEtcItem(data)}
										onUpdate={(data) => updateEtcItem(data)}
									/>
								})}
							</ContentWrapper>
						</SectionWrapper> */}
					</div>
				// </Layout>
			)}
		</>
	);
};

export default History;

const CreateRecordButton = styled.button`
	width: 200px;
	height: 130px;
	font-size: 24px;
	font-family: 'Regular'
`

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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 2열 배치 */
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

const NoneContentBox = styled.div`
	font-family: Regular;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ScrollNavigatorContainer = styled.div`
  @media (max-width: 1460px) {
    display: none;
  }
`;
