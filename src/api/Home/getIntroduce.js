import api from '../../Axios'; 

export const getIntroduce = async () => {
    try {
        const response = await api.get('/dashboard/introduce'); 
        //console.log('목록', response.data);
        return response.data; 
    } catch (error) {
        //console.error('Error fetching data:', error);
        return null; 
    }
};
