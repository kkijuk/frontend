import api from '../../Axios';

export const getUserInfo = async () => {
	try {
		const response = await api.get('/dashboard/user-info', {
			withCredentials: true, // 요청에 쿠키 포함
		});
	} catch (error) {
		console.error('Error fetching user info:', error.message);
		return null;
	}
};
