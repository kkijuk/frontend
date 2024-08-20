export const getUserInfo = async () => {
    try {
        const response = await fetch('https://api.kkijuk.com/dashboard/user-info',{
            credentials: "include", // 쿠키와 인증 정보를 함께 보냄

        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch data:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};