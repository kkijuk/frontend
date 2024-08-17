import api from "../../Axios";

const createRecord =(data)=>{
    api.post('/history/resume', data)
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.log(error);
    })
} 

export default createRecord;
