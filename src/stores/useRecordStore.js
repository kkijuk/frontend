import { create } from 'zustand'; // zustand named export로 변경
import { createAward, updateAward, deleteAward } from '../api/Record/award.js';
import { createEducation, updateEducation, deleteEducation } from '../api/Record/education.js'; // default export
import { createLicense, updateLicense, deleteLicense } from '../api/Record/license.js'; // default export
import { createSkill, updateSkill, deleteSkill } from '../api/Record/skill.js';
import { readRecord } from '../api/Record/record.js'; // default export
import { createCareer } from '../api/Mycareer/Career.js';
import * as CareerEditAPI from '../api/Mycareer/CareerEdit.js';
import { CareerEdit, CareerDelete } from '../api/Mycareer/CareerEdit.js';
import { createPresignedUrl, saveKeyName, deleteS3File, uploadFileToS3, changeFileTitle } from '../api/Record/s3File.js';
import { addURL, deleteURL } from '../api/Record/url.js';
import { updateRecord } from '../api/Record/record.js';
import { updateUserData } from '../api/Record/user.js';

// 기존 코드 유지
const useRecordStore = create((set, get) => ({
	//초기 상태
    userData:{
        // userId:null,
        name:null,
        birthday:null,
        phone:null,
        email:null,
        address:null,
		profileImageUrl:null,
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
	memberId: null,
	status: 'idle',
	error: null,

	// 이력서 데이터 가져오기
	fetchRecord: async () => {
		set({ status: 'loading' });
		try {
			const response = await readRecord();
			const data = response.data;
			console.log('Fetch Record Data:', data);

			if (response.message === '해당 유저의 이력서가 존재하지 않습니다.') {
				throw new Error('not created');
			}

			// 임시
			const normalizeData = (items, idField) => items.map((item) => ({ ...item, id: item[idField] }));

			set({
                userData:{
                    // userId:data.userId,
					profileImageUrl: data.profileImageUrl,
                    name:data.name,
                    birthday:data.birthday,
                    phone:data.phone,
                    email:data.email,
                    address:data.address
                },
                updated_at:data.updatedAt,
				recordId: data.recordId,
				memberId: data.memberId,
				educations: data.educationList,
				licenses: data.licenses,
				awards: data.awards,
				skills: data.skills,
				educations: normalizeData(data.educationList, 'educationId'),
				licenses: data.licenses,
				awards: data.awards,
				skills: data.skills,
				activitiesAndExperiences: data.activitiesAndExperiences,
				employments: data.employments,
				projects: data.projects,
				eduCareers: data.eduCareers,
				files: data.files,
				status: 'succeeded',
				error: null,
			});
			console.log('Record Id:', data.recordId);
		} catch (error) {
			set({ status: 'failed', error: "Record not created" });
			console.error('Fetch Record Error: ', error);
		}
	},

	// 항목 추가
	addItem: async (category, recordId, item) => {
		try {
			let response;
			switch (category) {
				case 'educations':
					response = await createEducation(item);
					if(Array.isArray(response)){
						set({[category]: response});
					} else {
						set((state) => ({
							[category]: [...state[category], response],
						}));
					}
					break;
				case 'licenses':
					response = await createLicense(item);
					console.log('response: ', response);
					if(Array.isArray(response.data)){
						set({[category]: response.data});
					} else {
						set((state) => ({
							[category]: [...state[category], response],
						}));
					}
					break;
				case 'awards':
					response = await createAward(item);
					if(Array.isArray(response.data)){
						set({[category]: response.data});
					} else {
						set((state) => ({
							[category]: [...state[category], response],
						}));
					}
					break;
				case 'skills':
					response = await createSkill(item);
					if(Array.isArray(response.data)){
						set({[category]: response.data});
					} else {
						set((state) => ({
							[category]: [...state[category], response],
						}));
					}
					break;

				// 내커리어 항목 api 호출은 AddCareerModal에서 처리
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					set((state) => ({
                        [category]: [...state[category], item],
                    }));
					break;
				default:
					throw new Error('Invalid category');
			}

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
					if (Array.isArray(response)) {
                        set({ [category]: response });
                    } else {
                        set((state) => ({
                            [category]: state[category].map((item) =>
                                item.id === id ? { ...item, ...updates } : item
                            ),
                        }));
                    }
					break;
				case 'licenses':
					response = await updateLicense(id, updates);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].map((item) =>
                                item.id === id ? { ...item, ...updates } : item
                            ),
                        }));
                    }
					break;
				case 'awards':
					response = await updateAward(id, updates);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].map((item) =>
                                item.id === id ? { ...item, ...updates } : item
                            ),
                        }));
                    }
					break;
				case 'skills':
					response = await updateSkill(id, updates);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].map((item) =>
                                item.id === id ? { ...item, ...updates } : item
                            ),
                        }));
                    }
					break;

				// 내커리어 항목 api 호출은 AddCareerModal에서 처리
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					set((state) => ({
						[category]: state[category].map((item) => (item.id === id ? { ...item, ...updates } : item)),
					}));
					break;
				default:
					throw new Error('Invalid category');
			}
		} catch (error) {
			console.error('Update Item Error:', error);
		}
	},

	// 항목 삭제
	deleteItem: async (category, id) => {
		try {
			let response;
			switch (category) {
				case 'educations':
					response = await deleteEducation(id);
					if (Array.isArray(response)) {
                        set({ [category]: response });
                    } else {
                        set((state) => ({
                            [category]: state[category].filter(
                                (item) => item.id !== id
                            ),
                        }));
                    }
					break;
				case 'licenses':
					response = await deleteLicense(id);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].filter(
                                (item) => item.id !== id
                            ),
                        }));
                    }
					break;
				case 'awards':
					response = await deleteAward(id);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].filter(
                                (item) => item.id !== id
                            ),
                        }));
                    }
					break;
				case 'skills':
					response = await deleteSkill(id);
					if (Array.isArray(response.data)) {
                        set({ [category]: response.data });
                    } else {
                        set((state) => ({
                            [category]: state[category].filter(
                                (item) => item.id !== id
                            ),
                        }));
                    }
					break;

				// 내커리어 항목 api 호출은 AddCareerModal에서 처리
				case 'activitiesAndExperiences':
				case 'employments':
				case 'projects':
				case 'eduCareers':
					set((state) => ({
						[category]: state[category].filter((item) => item.id !== id),
					}));
					break;
				default:
					throw new Error('Invalid category');
			}
		} catch (error) {
			console.error('Delete Item Error:', error);
		}
	},

	// 기타 항목 추가
	addEtcItem: async(data) => {
		try{
			let savedEtcData;
			if(data.fileType === 'File'){
				// 1. presigned URL과 keyName 생성
				const { keyName, signedURL } = await createPresignedUrl(data);

				// 2. s3에 파일 업로드
				await uploadFileToS3(data.file, signedURL);

				// 3. 업로드 성공하면, keyName 백엔드에 저장
				savedEtcData = await saveKeyName(keyName, data.fileTitle, data.file.name);
				console.log('savedEtcData:', savedEtcData);
			} else if(data.fileType === 'URL'){
				savedEtcData = await addURL(data);
				console.log('savedEtcData:', savedEtcData);
			} else {
				throw new Error('Invalid fileType');
			}
			set((state) => ({
				files: [...state.files, savedEtcData.data],
			}));
		} catch (error) {
			console.error('Add Etc Item Error:', error);
		}
	},

	// 기타 항목 삭제
	deleteEtcItem: async(data) => {
		try{
			let deletedData;
			if(data.fileType === 'File'){
				deletedData = await deleteS3File(data);
				set((state) => ({
					files: state.files.filter((item) => item.fileTitle !== deletedData.data.fileTitle && item.keyName !== deletedData.data.keyName),
				}))
			} else if(data.fileType === 'URL'){
				deletedData = await deleteURL(data);
				console.log('deletedData:', deletedData);
				set((state)=>({
					files: state.files.filter((item) => item.urlTitle !== deletedData.data.urlTitle && item.url !== deletedData.data.url),
				}));
			} else {
				throw new Error('Invalid fileType');
			}
		} catch (error) {
			console.error('Delete Etc Item Error:', error);
		}
	},

	// 기타 항목 수정
	updateEtcItem: async (oldData, newData) => {
		try {
			console.log('oldData:', oldData);
			console.log('newData:', newData);
			let savedEtcData;
			let deletedEtcData;
			if (oldData.fileType === 'File') {
				if(newData.file){ // 파일도 변경된 경우
					await deleteS3File(oldData);
					const { keyName, signedURL } = await createPresignedUrl(newData);
					await uploadFileToS3(newData.file, signedURL, newData.file.name);
					savedEtcData = await saveKeyName(keyName, newData.fileTitle, newData.file.name);
					console.log('savedEtcData:', savedEtcData);
					set((state) => ({
						files: state.files.map((item) =>
							item.keyName === oldData.keyName ? savedEtcData.data : item
						),
					}));
				} else if(newData.fileTitle !== oldData.fileTitle){ // 파일 이름만 변경된 경우
					await changeFileTitle(oldData.fileTitle, newData.fileTitle);
					set((state) => ({
						files: state.files.map((item) =>
							item.keyName === oldData.keyName ? { ...item, fileTitle: newData.fileTitle } : item
						),
					}));
				}
				
			} else if (oldData.fileType === 'URL') {
				deletedEtcData = await deleteURL(oldData);
				console.log('deletedEtcData:', deletedEtcData);
				savedEtcData = await addURL(newData);
				console.log('savedEtcData:', savedEtcData);
				set((state) => ({
					files: state.files.map((item) =>
						item.url === oldData.url ? savedEtcData.data : item
					),
				}));
			} else {
				throw new Error('Invalid fileType');
			}
		} catch (error) {
			console.error('Update Etc Item Error:', error);
		}
	},

	updateUserData: async (recordId, data, memberId) => {
		// data : {address: adderss, profileImageFile: file}
		console.log('data:', data);
		try {
			const { email, profileImageUrl: oldProfileImageUrl, address: oldAddress } = get().userData;
			console.log('get().userData:', get().userData);
			console.log('oldProfileImageUrl:', oldProfileImageUrl);
			const addressToUse = data.address ?? oldAddress;
			// let newProfileImageUrl = oldProfileImageUrl;

			// (1) 주소 변경만 있는 경우
			if(data.address){
				// address만 업데이트
				const response = await updateUserData(recordId, {
					email, //email 고정
					address: data.address, // 새 주소
					profileImageUrl: oldProfileImageUrl, // 기존 프로필 유지
				});

				set((state) => ({
					userData: {
					  ...state.userData,
					  address: response.address,
					},
				  }));
			}

			// (2) 프로필 이미지 변경만 있는 경우
			if(data.profileImageFile) {
				// await deleteS3File({fileTitle: `profileImage_${recordId}`});
				console.log('oldprofileImage: ', oldProfileImageUrl);
				// 2-1) 기존 이미지가 있으면 s3에서 먼저 삭제
				if(oldProfileImageUrl && oldProfileImageUrl !== 'string'){
					await deleteS3File({fileTitle: oldProfileImageUrl});
				}
				// 2-2) Presigned URL 발급
				const {keyName, signedURL} = await createPresignedUrl({
					fileTitle: `profileImage_${memberId}`,
				})
                // 2-3) s3 업로드
				await uploadFileToS3(data.profileImageFile, signedURL);

				// 2-4) keyName 저장
				const savedNewProfileData = await saveKeyName(
					keyName,
					`profileImage_${memberId}`,
					data.profileImageFile.name
				);
				console.log('savedNewProfileData:', savedNewProfileData)
				//2-5) 사용자정보업데이트
				const newProfileImageUrl = `profileImage_${memberId}`;
				const response = await updateUserData(recordId, {
					email,                   // email은 고정
					address: oldAddress,     // 기존 주소 유지
					profileImageUrl: newProfileImageUrl,
				});
				// 2-6) store 업데이트
				set((state) => ({
					userData: {
					...state.userData,
					profileImageUrl: newProfileImageUrl,
					},
				}));
			}
		} catch (error) {
			console.error('Update User Data Error:', error);
		}
	}
}));

export default useRecordStore;
