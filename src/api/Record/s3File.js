import api from "../../Axios";

const createPresignedUrl = async (data) => {
    try{
        const fileTitle = data.fileTitle;
        const response = await api.get(`/history/file=fileName?=${fileTitle}`);
        const { keyName, presignedURL } = response.data;

        console.log("keyName: ", keyName);
        console.log("presignedURL: ", presignedURL);

        return { keyName, presignedURL };
    } catch (error) {
        console.error("Error creating presigned URL: ", error);
        if(error.response){
            console.error('Server responded with status code:', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error; //saveKeyName에서 에러 처리 받기 위함
    }
};

const saveKeyName = async(keyName, fileTitle) => {
    try{
        const response = await api.post("/history/file", { 
            keyname: keyName,
            fileTitle: fileTitle
        });

        console.log("Key Name saved successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error saving key name: ", error);
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

const deleteS3File = async (data) => {
    try{
        const fileTitle = data.fileTitle;
        const response = await api.delete(`/history/file?fileTitle=${fileTitle}`);
        console.log("Success - deleteS3File: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting S3 file: ", error);
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

const downS3File = async (data) => {
    try{
        // api 호출
        const fileTitle = data.fileTitle;
        const response = await api.get(`/history/file/download?fileTitle=${fileTitle}`);
        
        // s3의 presendURL로 파일 다운로드
        if(response.status === 200 && response.data.signedURL){
            return response.data.signedURL;
        } else{
            console.error('Failed to get presigned URL:', response.statusText);
            alert('파일 다운로드 URL을 가져오는데 실패했습니다.');
        }
    
    } catch (error) {
        console.error("Error downloading S3 file: ", error);
        if(error.response){
            console.error('Server responded with status code:', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        alert("파일 다운로드에 실패했습니다.");
    }
};

export { createPresignedUrl, saveKeyName, deleteS3File, downS3File };