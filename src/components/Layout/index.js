import React from 'react';

import Header from '../Header';
import MenuHeader from '../MenuHeader'

const Layut = (props) => {
    return (
        <>
            <Header />
            <MenuHeader />  
            {props.children}  
        </>
    )
}

export default Layut
