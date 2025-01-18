import { create } from 'zustand'; // zustand named export로 변경
import { createAward, updateAward, deleteAward } from '../api/Record/award.js';
import {createEducation, updateEducation, deleteEducation} from '../api/Record/education.js'; // default export
import {createLicense, updateLicense, deleteLicense} from '../api/Record/license.js'; // default export
import { createSkill, updateSkill, deleteSkill } from '../api/Record/skill.js';
import { readRecord } from '../api/Record/record.js'; // default export
import createCareer from '../api/Mycareer/createCareer.js';
import * as CareerEditAPI from "../api/Mycareer/CareerEdit.js"
import { CareerEdit, CareerDelete } from "../api/Mycareer/CareerEdit.js"

// 기존 코드 유지
const useRecordStore = create((set, get) => ({
    //초기 상태
    educations: [], 
    licenses: [], 
    awards: [],
    skills: [],
    activitiesAndExperiences: [],
    employments: [],
    projects: [],
    eduCareers: [],
    recordId: null,
    status: 'idle',
    error: null,

    // 이력서 데이터 가져오기
    fetchRecord: async () => {
        set({ status: 'loading' });
        try {
            const response = await readRecord(); 
            const data = response.data;
            console.log('Fetch Record Data:', data);

            if(!data.record_id){
                throw new Error('Record not found');
            }
            
            // 임시
            const normalizeData = (items, idField) =>
                items.map(item => ({...item, id: item[idField]}));

            set({
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
                [category]: state[category].map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                ),
            }));
        } catch (error) {
            console.error('Update Item Error:', error);
        }
    },

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
}));

export default useRecordStore;
