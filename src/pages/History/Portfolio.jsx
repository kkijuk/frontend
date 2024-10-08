import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import './history.css'
import AddActivityModal from '../../components/Modal/AddActivityModal/AddActivityModal'
import { Affiliation1, Affiliation2 } from '../../components/Modal/AddActivityModal/Affiliation'

const Portfolio=()=>{
    const setAffiliation =()=>{
        console.log("Test");
    }

    

    return(
        <>  
            <Affiliation1 onAffiliationChange={(value) => setAffiliation(value)}/>
            <br></br><br></br><br></br><br></br>
            <Affiliation2 onAffiliationChange={(value) => setAffiliation(value)}/>
            <br></br><br></br><br></br><br></br><br></br>
            {/* <AddActivityModal></AddActivityModal> */}
        </>
    )
}
export default Portfolio