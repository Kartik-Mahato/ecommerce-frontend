import React from 'react';

import './style.css';
import Card from '../UI/Card';

const PriceDetails = (props) => {
    return (
        <Card style={{ maxWidth: "380px", background: '#fff' }}>
            <div className="cardHeader">
                <div>Price Details</div>
            </div>
            <div style={{ padding: '20px', boxSizing: 'border-box' }}>
                <div className="priceDetails">
                    <div>Total Items: ({props.totalItem} items)</div>
                    <div>{props.totalPrice.toLocaleString('en-IN')}</div>
                </div>
                <div className="priceDetails">
                    <div>Delivery Charges:&nbsp;</div>
                    <div style={{ color: 'green' }}>FREE</div>
                </div>
                <hr />
                <div className="priceDetails">
                    <div>Total Payable: </div>
                    <div>{props.totalPrice.toLocaleString('en-IN')}</div>
                </div>
            </div>
        </Card>
    )
}

export default PriceDetails
