import axios from 'axios';

export const deleteUserAccount = async (token) => {
    try {
        const response = await axios.patch('https://api.kkijuk.com/member/inactive', null, {
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
