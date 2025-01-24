import api from "../../Axios";

const addURL = async (data) => {
    try{
        const { urlTitle, url } = data;
        const response = await api.post("/history/url",{
            urlTitle: urlTitle,
            url: url
        });
        console.log("URL added successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding URL: ", error);
        if(error.response){
            console.error('Server responded with status code:', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    };
};

const deleteURL = async (data) => {
    try{
        const {urlTitle, url} = data;
        const response = await api.delete("/history/url",{
            urlTitle: urlTitle,
            url: url
        });
        console.log("URL deleted successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting URL: ", error);
        if(error.response){
            console.error('Server responded with status code:', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    };

};

export { addURL, deleteURL };