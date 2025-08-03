import React, { act, useEffect, useState } from 'react';
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
import CareerItem from '../../components/Record/readOnlyItems/CareerItem';
import AwardItem from '../../components/Record/readOnlyItems/AwardItem';
import LicenseItem from '../../components/Record/readOnlyItems/LicenseItem';
import SkillItem from '../../components/Record/readOnlyItems/SkillItem';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import ScrollNavigator from '../../components/Record/ScrollNavigator';
import FileItem from '../../components/Record/readOnlyItems/FileItem';
import Profile from '../../components/Record/Profile';
import EmailAndAddress from '../../components/Record/EmailAndAddress';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import useAuthRedirect from '../../stores/useAuthRedirect'; 
import { trackEvent } from '../../utils/ga4';
import { isEqual } from 'lodash';
import { useDebounce } from 'use-debounce';
import { theme } from '../../constants/theme'; 
import { Color } from '@/constants/color';
import SvgIcon from '@/components/shared/SvgIcon';

const History = () => {
    useAuthRedirect();
	// useRecordStore 호출
	const store = useRecordStore();
	const {
		// api call
		fetchRecord,
		addItem,
		updateItem,
		deleteItem,
		recordId,
		memberId,
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
	const {profileImageUrl, name, birthday, phone, email, address} = userData;
	const licenseSection = licenses.filter(item => item.licenseTag === 'LICENSE');
	const foreignSection = licenses.filter(item => item.licenseTag === 'FOREIGN');
	const skillSections = {
		IT: skills.filter(skill => skill.skillTag === 'IT'),
		OA: skills.filter(skill => skill.skillTag === 'OA'),
		GRAPHIC: skills.filter(skill => skill.skillTag === 'GRAPHIC'),
		FOREIGNLANGUAGE: skills.filter(skill => skill.skillTag === 'FOREIGNLANGUAGE'),
		ETC: skills.filter(skill => skill.skillTag === 'ETC'),
	};
	const URLSection = files.filter(item => item.fileType === 'URL');
	const fileSection = files.filter(item => item.fileType === 'File');

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

	const [activeSection, setActiveSection] = useState("");	// 인디케이터 활성화 섹션
	const [profileURL, setProfileURL] = useState(profileImageUrl);	// 프로필 이미지
	const [isCareerModalOpen, setIsCareerModalOpen] = useState(false); // 내 커리어 관련 활동 추가 모달 관리
	const [modalMode, setModalMode] = useState('add');	// 모달 모드(add, edit)
	const [modalData, setModalData] = useState(null);	// 모달 카테고리(add mode)


	// useEffect
	// 이력서 불러오기
	useEffect(() => {
		const fetchData = async () => {
			try{
				await fetchRecord();
				if(error === "Record not created"){
					setShowCreateButton(true);
				}
			} catch (error) {
				console.error('Error: fetchRecord: ', error);
				setShowCreateButton(true);
			}
		}
		fetchData();
		
		console.log('Record Id:', recordId);

	}, [fetchRecord]);


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
		{id: "employments", name: "경력", count: employments.length},
		{id: "activitiesAndExperiences", name: "활동 및 경험", count: activitiesAndExperiences.length},
		{id: "projects", name: "프로젝트", count: projects.length},
		{id: "eduCareers", name: "교육", count: eduCareers.length},
		{id: "awards", name: "수상", count: awards.length},
		{id: "licenses", name: "자격증 · 외국어", count: licenses.length},
		{id: "skills", name: "스킬", count: skills.length},
		{id:"etc", name: "추가자료", count: files.length}
	];
	

	//(2) 인디케이터 메뉴 클릭
	const scrollToSection = (id) => {
		const element = document.getElementById(id);

		if (element) {
			const y = element.getBoundingClientRect().top + window.pageYOffset - 70; // 네비게이션 높이만큼 보정
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}

	// 인적사항 변경 관련 로직
	//(1) 프로필 사진 변경 관련 로직
	const handleProfileChange = (file) => {
		// setProfileURL(file);
		if(file) {
			updateUserData(recordId, {
				profileImageFile: file,
			},memberId);
		}
	}

	//(2) 이메일 또는 주소 변경 시
	const handleEmailOrAddressChange = (data) => {
		if(data.type === 'address'){
			updateUserData(recordId, {
				address: data.data,
			}, memberId);
		}
	};

	// addCareerModal 오픈 (활동 추가 버튼 클릭 시)
	const handleOpenCareerModal = (categoryEnName) => {
		setModalMode('add');
		setModalData({
			category: {
				categoryEnName: categoryEnName,
			}
		});
		setIsCareerModalOpen(true);
	}

	// addCareerModal 오픈 (커리어 아이템에서 수정 버튼 클릭 시)
	const handleEditCareerModal = (careerData) => {
		setModalMode('edit');
		setModalData(careerData);
		setIsCareerModalOpen(true);
	}

	return (
		<>
			{showCreateButton ? (
				<CreateRecordButton onClick={handleCreateRecord}>
					이력서 생성하기
				</CreateRecordButton>
			) : (

					<div style={{width:'100%', minHeight:'100vh',}}>
						<ScrollNavigatorContainer>
							<ScrollNavigator
								sections = {sections}
								activeSection={activeSection}
								onClick={scrollToSection}
							/>
						</ScrollNavigatorContainer>
						{isCareerModalOpen &&
							<AddCareerModal
								mode={modalMode}
								initialData={modalData}
								onClose={() => setIsCareerModalOpen(false)}
							/>
						}
						<UserDetailsContainer id={sections[0].id} key={sections[0].id}>
							<UpdatedAt>마지막 수정 일시: {updated_at}</UpdatedAt>
							<ProfileAndInfoWrapper>
								<Profile
									profileKeyName={profileImageUrl}
									onProfileChange={handleProfileChange}
								/>
								<UserInfoWrapper>
									<InfoTable>
										<InfoLabel>이름</InfoLabel>
										<InfoValue>{name}</InfoValue>

										<InfoLabel>생년월일</InfoLabel>
										<InfoValue>{birthday}</InfoValue>

										<InfoLabel>전화번호</InfoLabel>
										<InfoValue>{phone}</InfoValue>

										<InfoLabel>이메일</InfoLabel>
										{/* <InfoValue>
											<EmailAndAddress
												type="email"
												userData={email}
												onSave={(data) => handleEmailOrAddressChange(data)}
											/>
										</InfoValue> */}
										<InfoValue>{email}</InfoValue>

										<InfoLabel>주소</InfoLabel>
										<InfoValue>
											<EmailAndAddress
												type="address"
												userData={address}
												onSave={(data) => handleEmailOrAddressChange(data)}
											/>
										</InfoValue>
									</InfoTable>
								</UserInfoWrapper>
							</ProfileAndInfoWrapper>
						</UserDetailsContainer>
						<Line></Line>
						<SectionWrapper>
							<SectionHeader
								id = {sections[1].id}
								key = {sections[1].id}
							>
								<SectionTitle>학력</SectionTitle>
								<AddButton onClick={() => {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_education',
										action_type: 'add',
										label: '학력 추가',
									});
									toggleAddForm('educations');
								}}>
									<SvgIcon name='addButton'size='16' />
								</AddButton>
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
								<SectionTitle>경력</SectionTitle>
								<AddButton onClick={()=> {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_employments',
										action_type: 'add',
										label: '경력 추가',
									});
									handleOpenCareerModal("EMP");
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
										onEditCareer={handleEditCareerModal}
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
								<SectionTitle>활동 및 경험</SectionTitle>
								<AddButton onClick={()=> {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_activitiesAndExperiences',
										action_type: 'add',
										label: '활동 및 경험 추가',
									});
									handleOpenCareerModal("ACTIVITY");
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
											onEditCareer={handleEditCareerModal}
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
								<SectionTitle>프로젝트</SectionTitle>
								<AddButton onClick={()=> {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_project',
										action_type: 'add',
										label: '프로젝트 추가',
									});
									handleOpenCareerModal("PROJECT");
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
										onEditCareer={handleEditCareerModal}
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
								<SectionTitle>교육</SectionTitle>
								<AddButton onClick={()=> {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_training',
										action_type: 'add',
										label: '교육 추가',
									});
									handleOpenCareerModal("EDU");
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
										onEditCareer={handleEditCareerModal}
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
								<SectionTitle>수상</SectionTitle>
								<AddButton onClick={() => {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_award',
										action_type: 'add',
										label: '수상 추가',
									});
									toggleAddForm('awards');
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
								<SectionTitle>자격증 · 외국어</SectionTitle>
								<AddButton onClick={() => {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_certificate',
										action_type: 'add',
										label: '자격증/외국어 추가',
									});
									toggleAddForm('licenses');
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
							</SectionHeader>
							<ContentWrapper style={{gap:'50px'}}>
								<div style={{height: 'auto'}}>
									{openedForms.add.licenses &&
									<AddLicenseForm
										onSave={(updates) => addItem('licenses', recordId, updates)}
										onClose={() => toggleAddForm('licenses')}
									/>}
								</div>
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
								<SectionTitle>스킬</SectionTitle>
								<AddButton onClick={() => {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_skill',
										action_type: 'add',
										label: '스킬 추가',
									});
									toggleAddForm('skills');
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
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
						<Line></Line>

						<SectionWrapper>
							<SectionHeader
								id = {sections[9].id}
								key = {sections[9].id}
							>
								<SectionTitle>추가자료</SectionTitle>
								<AddButton onClick={() => {
									trackEvent('add_click', {
										category: 'resume',
										detail: 'add_attachment',
										action_type: 'add',
										label: '추가자료 추가',
									});
									toggleAddForm('files');
								}}>
									<SvgIcon name='addButton'size='16'/>
								</AddButton>
							</SectionHeader>
							<ContentWrapper style={{gap:'50px'}}>
								{openedForms.add.files &&
									<AddFileForm
										onClose={() => toggleAddForm('files')}
										onSave={(data) => addEtcItem(data)}
										
								/>}
								{files.length === 0 && 
								<NoneContentBox>
									새로운 활동을 추가해주세요!
								</NoneContentBox>}
								<Section>
									{URLSection.length !== 0 && <Tag>URL</Tag>}
									<ItemsWrapper style={{gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'}}>
										{URLSection.map((file, index) => (
											<FileItem
												data={file}
												onDelete={(data) => deleteEtcItem(data)}
												onUpdate={(oldData, newData) => updateEtcItem(oldData, newData)}
										/>
										))}
									</ItemsWrapper>
								</Section>

								<Section>
									{fileSection.length !== 0 && <Tag>첨부파일</Tag>}
									<ItemsWrapper style={{gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'}}>
										{fileSection.map((file, index) => (
											<FileItem
												data={file}
												onDelete={(data) => deleteEtcItem(data)}
												onUpdate={(oldData, newData) => updateEtcItem(oldData, newData)}
										/>
										))}
									</ItemsWrapper>
								</Section>
							</ContentWrapper>
						</SectionWrapper>
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
const UserDetailsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-block: 20px;

	@media (max-width: ${theme.breakpoints.md}) {
		display: block;
		margin-left: 0px;
		margin-block: 24px;
	}
`
const ProfileAndInfoWrapper = styled.div`
	width: 100%;
	display: flex;

	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column;
	}	

`

const UpdatedAt = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${Color.gray02};
  font-family: Regular;
  text-align: right;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

const UserInfoWrapper = styled.div`
	display:flex;
	flex-direction:column;
	margin-left: 40px;
	position: relative;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-left: 0px;
	}
`

const InfoTable = styled.div`
	display: grid;
	grid-template-columns: auto 1fr; 
	row-gap: 16px; 
	column-gap: 32px;
	margin-top: 15.5px;

	@media (max-width: ${theme.breakpoints.md}) {
		row-gap: 12px;
		column-gap: 20px;
		margin-top: 24px;
	}
`

const InfoLabel = styled.div`
  font-size: 18px;
  color: ${Color.gray02};
  font-family: Regular;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: ${Color.gray02};
  font-family: Regular;
`;

const SectionWrapper = styled.div`
	margin-block: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-family: 'normal';
  font-weight: 700;
  line-height: normal;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 20px;
  }
`;

const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
	padding: 0px;

  button {
    background: ${Color.main01};
    color: ${Color.white};
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
    width: 100%; /* 부모 컨테이너의 너비 사용 */
`;


const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddButton = styled.div`
	width: 42px;
	height: 42px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid ${Color.gray03};
	background: ${Color.white};
	color: ${Color.gray03};
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor:pointer;
`

const Line = styled.div`
	width: 100%;
	height: 2px;
	background: ${Color.gray05};
`

const Section = styled.div`
	width:100%;
	display: flex;
	align-items: flex-start;
	gap: 40px;
	@media (max-width: ${theme.breakpoints.md}) {
		gap: 20px;
	}	
`;

const ItemsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr)); /* 2열 배치 */
//   gap: 25px;

  @media (max-width: ${theme.breakpoints.md}) {
	grid-template-columns: 1fr; /* 모바일에서는 1열 배치 */
  }	
`;

const Tag = styled.div`
	width: 81px;
	height: 22px;
	flex-shrink: 0;
	background: ${Color.gray02};
	color: ${Color.white};
	font-family: Regular;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-top:10px;
`

const ProfileBox = styled.div`
	width: 150px;
	height: 200px;
	background: ${Color.gray05};
`


const NullModeAddress = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${Color.gray03};
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
	color: ${Color.gray02};
	font-size: 12px;
	background: ${Color.gray06};
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
  color: ${Color.gray02};
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
	color: ${Color.gray02};
	font-size: 12px;
	background: ${Color.gray06};
	cursor: pointer;
	border:none;
	display:flex;
	justify-content:center;
`;

const CancelButton = styled.button`
	width: 42px;
	height: 19px;
	border-radius: 7px;
	color: ${Color.gray02};
	font-size: 12px;
	background: ${Color.gray06};
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
