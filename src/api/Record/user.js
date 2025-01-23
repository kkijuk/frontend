import axios from "axios";

const updateUserData = async (data) => {
    try{
        const response = await axios.patch("/history/resume", data);
        console.log("User data updated successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user data: ", error);
        if(error.response){
            console.error('Server responded with status code:', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export { updateUserData };