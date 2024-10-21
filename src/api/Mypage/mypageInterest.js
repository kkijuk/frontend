import axios from 'axios';

export const mypageInterest = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/myPage/field`, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		return response.data.field;
	} catch (error) {
		console.error('Error', error.message);
		throw error;
	}
};
