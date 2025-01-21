import { create } from 'zustand'; // zustand named export로 변경
import { createAward, updateAward, deleteAward } from '../api/Record/award.js';
import { createEducation, updateEducation, deleteEducation } from '../api/Record/education.js'; // default export
import { createLicense, updateLicense, deleteLicense } from '../api/Record/license.js'; // default export
import { createSkill, updateSkill, deleteSkill } from '../api/Record/skill.js';
import { readRecord } from '../api/Record/record.js'; // default export
import { createCareer } from '../api/Mycareer/Career.js';
import * as CareerEditAPI from '../api/Mycareer/CareerEdit.js';
import { CareerEdit, CareerDelete } from '../api/Mycareer/CareerEdit.js';
import { createPresignedUrl, saveKeyName, deleteS3File } from '../api/Record/s3File.js';
import { addURL, deleteURL } from '../api/Record/url.js';
import { updateUserData } from '../api/Record/user.js';

// 기존 코드 유지
const useRecordStore = create((set, get) => ({
	//초기 상태
    userData:{
        userId:null,
        name:null,
        birth:null,
        mobile:null,
        email:null,
        address:null
    },
    updated_at:null,
	educations: [],
	licenses: [],
	awards: [],
	skills: [],
	activitiesAndExperiences: [],
	employments: [],
	projects: [],
	eduCareers: [],
	files: [],
	recordId: null,
	status: 'idle',
	error: null,

	// 이력서 데이터 가져오기
	fetchRecord: async () => {
		set({ status: 'loading' });
		try {
			const response = await readRecord();

			console.log('Fetch Record Data:', data);

			if (data.message === '해당 유저의 이력서가 존재하지 않습니다.') {
				throw new Error('not created');
			}
			const data = response.data;

			// 임시
			const normalizeData = (items, idField) => items.map((item) => ({ ...item, id: item[idField] }));

			set({
                userData:{
                    userId:data.userId,
					profile: data.profile,
                    name:data.name,
                    birth:data.birth,
                    mobile:data.mobile,
                    email:data.email,
                    address:data.address
                },
                updated_at:data.updated_at,
				recordId: data.record_id,
				educations: data.educationList,
				licenses: data.licenses,
				awards: data.awards,
				skills: data.skills,
				educations: normalizeData(data.educationList, 'educationId'),
				licenses: normalizeData(data.licenses, 'licenseId'),
				awards: normalizeData(data.awards, 'awardId'),
				skills: normalizeData(data.skills, 'skillId'),
				activitiesAndExperiences: data.activitiesAndExperiences,
				employments: data.employments,
				projects: data.projects,
				eduCareers: data.eduCareers,
				files: data.files,
				status: 'succeeded',
				error: null,
			});
		} catch (error) {
			set({ status: 'failed', error: error.message });
			console.error('Fetch Record Error: ', error);
		}
	},

	// 항목 추가
	addItem: async (category, recordId, item) => {
		try {
			let response;
			switch (category) {
				case 'educations':
					response = await createEducation(recordId, item);
					break;
				case 'licenses':
					response = await createLicense(recordId, item);
					break;
				case 'awards':
					response = await createAward(recordId, item);
					break;
				case 'skills':
					response = await createSkill(recordId, item);
					break;
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					response = await createCareer(item);
					break;
				default:
					throw new Error('Invalid category');
			}
			set((state) => ({
				[category]: [...state[category], response],
			}));
		} catch (error) {
			console.error('Add Item Error:', error);
		}
	},

	// 항목 수정
	updateItem: async (category, id, updates) => {
		try {
			let response;
			switch (category) {
				case 'educations':
					response = await updateEducation(id, updates);
					break;
				case 'licenses':
					response = await updateLicense(id, updates);
					break;
				case 'awards':
					response = await updateAward(id, updates);
					break;
				case 'skills':
					response = await updateSkill(id, updates);
					break;
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					response = await CareerEdit(id, updates);
					break;
				default:
					throw new Error('Invalid category');
			}
			set((state) => ({
				[category]: state[category].map((item) => (item.id === id ? { ...item, ...updates } : item)),
			}));
		} catch (error) {
			console.error('Update Item Error:', error);
		}
	},

	// 항목 삭제
	deleteItem: async (category, id) => {
		try {
			switch (category) {
				case 'educations':
					await deleteEducation(id);
					break;
				case 'licenses':
					await deleteLicense(id);
					break;
				case 'awards':
					await deleteAward(id);
					break;
				case 'skills':
					await deleteSkill(id);
					break;
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					await CareerDelete(id);
					break;
				default:
					throw new Error('Invalid category');
			}
			set((state) => ({
				[category]: state[category].filter((item) => item.id !== id),
			}));
		} catch (error) {
			console.error('Delete Item Error:', error);
		}
	},

	// 기타 항목 추가
	addEtcItem: async(data) => {
		try{
			let response;
			if(data.fileType === 'File'){
				const { keyName, presignedURL } = await createPresignedUrl(data);
				const data = await saveKeyName(keyName, presignedURL)
			} else if(data.fileType === 'URL'){
				const data = await addURL(data);
			} else {
				throw new Error('Invalid fileType');
			}
			set((state) => ({
				files: [...state.files, data],
			}));
		} catch (error) {
			console.error('Add Etc Item Error:', error);
		}
	},

	// 기타 항목 삭제
	deleteEtcItem: async(data) => {
		try{
			if(data.fileType === 'File'){
				const data = await deleteS3File(data);
				set((state) => ({
					files: state.files.filter((item) => item.fileTitle !== data.fileTitle && item.keyName !== data.keyName),
				}))
			} else if(data.fileType === 'URL'){
				const data = await deleteURL(data);
				set((state)=>({
					files: state.files.filter((item) => item.urlTitle !== data.urlTitle && item.url !== data.url),
				}));
			} else {
				throw new Error('Invalid fileType');
			}
		} catch (error) {
			console.error('Delete Etc Item Error:', error);
		}
	},

	updateUserData: async (data) => {
		try {
			const response = await updateUserData(data);
			set((state) => ({
				userData: { ...state.userData, ...data },
			}));
		} catch (error) {
			console.error('Update User Data Error:', error);
		}
	}
}));

export default useRecordStore;
