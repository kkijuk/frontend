import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Alert from '../../components/History/Alert'
import Date from '../../components/History/Resume/Date'
import Edu from '../../components/History/Resume/Edu'
import EducationList from '../../components/History/Resume/EducationList'

const Portfolio=()=>{
    const [modalOpend, setModalOpend] = useState(false);

    const toggle=()=>{
        setModalOpend(!modalOpend);
    }

    

    return(
        <>  
            {modalOpend && <Alert closeModal={toggle}></Alert>}
            <p>포트폴리오</p>
            <button onClick={toggle}>삭제</button>
            <Date
                place_holder="입학년월"
                controls={['date']}
                dateFormat="MM/YYYY"
                dateWheels="|MMMM YYYY|"
                touchUi={true}
            />
            <Edu/>
            <EducationList/>

        </>
    )
}
export default Portfolio