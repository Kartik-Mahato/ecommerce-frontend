import React from 'react';

import './style.css';
// import Card from '../UI/Card';

const PriceDetails = (props) => {
    return (
        <div className="card">
            <div className="cardHeader">
                <div style={{ color: '#878787', textTransform: 'uppercase', fontSize: '16px' }}>
                    Price Details
                </div>
            </div>
            <div style={{ padding: '10px 15px', boxSizing: 'border-box' }}>
                <div className="priceDetails">
                    <div>Price: ({props.totalItem} items)</div>
                    <div>₹{props.totalPrice.toLocaleString('en-IN')}</div>
                </div>
                <div className="priceDetails">
                    <div>Delivery Charges:&nbsp;</div>
                    <div style={{ color: 'green' }}>FREE</div>
                </div>
                <hr />
                <div className="priceDetails total">
                    <div>Total Amount: </div>
                    <div>₹{props.totalPrice.toLocaleString('en-IN')}</div>
                </div>
            </div>
        </div>
    )
}

export default PriceDetails
