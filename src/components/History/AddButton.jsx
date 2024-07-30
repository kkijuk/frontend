import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import AddJobButton from "../shared/AddJobButton";
import '../../assets/pencil.svg'

const AddButton=()=>{
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddClick =()=>{
        navigate('/history/select')
    }

    return(
        <>
            <Button onClick={()=>handleAddClick()} style={{right:'20px',fontSize:'36px',fontWeight:700}}>+</Button>
            {/* {!isHistoryListState
            && 
            (<EditButton onClick={()=>handleEditClick()} style={{right:'100px'}}>
                <svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z" fill="white"/>
                </svg>
            </EditButton>)} */}
            
            
        </>
    )
}

export default AddButton;

const EditButton=styled.button`
    width:60px;
    height:60px;
    border:none;
    border-radius:50%;
    background-color:#B0B0B0;
    color:white;

    position:fixed;
    bottom: 20px;

    cursor:pointer;
`

const Button=styled.button`
    width:60px;
    height:60px;
    border:none;
    border-radius:50%;
    background-color:#3AAF85;
    color:white;

    position:fixed;
    bottom: 20px;

    cursor:pointer;
`
