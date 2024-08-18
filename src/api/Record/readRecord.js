import api from "../../Axios";

const readRecord =(data)=>{
    api.get('/history/resume')
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.log(error);
    })
}

export default readRecord;