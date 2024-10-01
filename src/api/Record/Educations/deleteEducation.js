import api from "../../../Axios";

const deleteEducation = async (educationId) => {
    try {
        const response = await api.delete(`/history/resume/education?educationId=${educationId}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting education:', error);
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
};

export default deleteEducation;
