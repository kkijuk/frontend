import api from "../../Axios";

const deleteEdcation =(data)=>{
    api.delete('/history/resume/education', data)
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.log(error);
    })
} 

export default deleteEdcation;
