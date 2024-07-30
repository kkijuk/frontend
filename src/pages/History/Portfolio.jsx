import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Alert from '../../components/History/Alert'

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
        </>
    )
}
export default Portfolio