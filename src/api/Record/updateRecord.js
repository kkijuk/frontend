import api from "../../Axios";

const updateRecord=(data)=>{
    api.patch('/history/resume', data)
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.log(error);
    })
}

export default updateRecord;