import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import '../../pages/History/history.css'
import Edu from './Edu'
import Date from './Date'

const AddItem=({ onCancel, onAdd })=>{
    const [formData, setFormData] = useState({
        category : '',
        schoolName :'',
        major :  '',
        admissionDate :  '',
        graduationDate :  '',
        state :  ''

    })

    useEffect(()=>{
        console.log("formDataChanged: ", formData);
    },[formData])

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]:value}));
    }

    const handleLevelChange =(category)=>{
        setFormData(prev=>({...prev, category}));
    }

    const handleStatusChange =(state)=>{
        setFormData(prev=>({...prev, state}));
    }

const handleStartDateChange = (startDate) => {
    setFormData(prev => ({ ...prev, admissionDate: startDate }));
};

const handleEndDateChange = (endDate) => {
    setFormData(prev => ({ ...prev, graduationDate: endDate }));
};

    return(
        <div style={{display:'flex'}}>
            <Container>
                <form style={{position:'relative'}}>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Edu isLevel="학력구분" onChange={handleLevelChange} value={formData.level}/>
                        <Input 
                            name="schoolName"
                            placeholder='학교명(ex.00대학교)' 
                            style={{width:'455px'}} 
                            value={formData.schoolName}
                            onChange={handleChange}>
                        </Input>
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Input 
                            name="major"
                            placeholder='전공 및 계열(ex. 00학과 또는 인문계열)' 
                            style={{width:'610px'}}
                            value={formData.major}
                            onChange={handleChange}>
                        </Input>    
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Edu isLevel="학력상태" onChange={handleStatusChange} value={formData.state}/>
                        <div style={{width:'150px'}}>
                            <Date 
                                place_holder={"입학연월"} 
                                value={formData.startDate}
                                onChange={handleStartDateChange}></Date>  
                        </div>
                        
                        <div style={{width:'10px', height:'45px', top:'-25px', right:'50px'}}>~</div>
                        <div style={{width:'150px'}}>
                            <Date 
                                place_holder={"졸업연월"}
                                value={formData.endDate}
                                onChange={handleEndDateChange}></Date>  
                        </div>

                        <Button style={{color:'#77AFF2', border:'1px solid #77AFF2',backgroundColor:'#FFF',marginRight:'5px'}}
                                onClick={onCancel}>
                            취소
                        </Button>
                        <Button style={{color:'#FFF', borderColor:'#3AAF85',backgroundColor:'#3AAF85'}}
                                onClick={()=>{if(onAdd) onAdd(formData)}}>
                            추가
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}
export default AddItem


const Container = styled.div`
    width:610px;
    padding: 30px 0px;
    margin: 15px 0px 50px 0px;
    display:flex;
    justify-content:space-between;
    background-color:#F5F5F5;
    border-radius:10px;
    padding:20px;
    font-family:Regular;
`

const Input = styled.input`
    height:45px;
    border-radius: 10px;
    background: var(--white, #FFF);
    border:none;
`

const Button = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;

`