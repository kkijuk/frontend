import axios from 'axios';

export const deleteUserAccount = async (token) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/member/inactive`; 

    try {
        const response = await axios.patch(apiUrl, null, {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,  
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Unexpected response status' };
        }
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        return { success: false, message: error.message };
    }
};
