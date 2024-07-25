import React from 'react'
import styled from 'styled-components'
import '../../pages/moni/history.css'

const ListItem =({title,content})=>{

    return(
        <>
            <h3>{title}</h3>
            <div style={{height:'100px'}}>
                <p>{content}</p>
            </div>   
        </>
    );
}

export default ListItem;