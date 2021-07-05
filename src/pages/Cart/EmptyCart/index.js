import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import { MaterialButton } from '../../../components/MaterialUI';

const EmptyCart = () => {
    const history = useHistory();
    return (
        <div className="empty-cart">
            <div>My Cart</div>
            <div>
                <div className="empty-cart-logo">
                    <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="empty-cart-logo" />
                </div>
                <div className="empty-cart-text">
                    <h3>Your cart is empty!</h3>
                    <h6>Add items to it now</h6>
                </div>
                <div className="empty-cart-button">
                    <div style={{ width: '200px' }}>
                        <MaterialButton
                            title={'Shop Now'}
                            onClick={() => history.push('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart
