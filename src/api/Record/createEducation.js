import api from "../../Axios";

const createEdcation =(data)=>{
    api.post('/history/resume/education', data)
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.log(error);
    })
} 

export default createEdcation;
