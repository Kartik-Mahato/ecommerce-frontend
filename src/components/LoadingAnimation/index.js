import React from 'react';

import './style.css';

const LoadingAnimation = (props) => {
    return (
        <div style={{ ...props.style }} className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default LoadingAnimation
