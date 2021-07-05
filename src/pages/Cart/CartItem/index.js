import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './style.css';
import { imgPath } from '../../../urlConfig';
import { removeCartItem } from '../../../actions/cart.actions';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { _id, name, price, img } = props.cartItem;

    const [currentQty, setCurrentQty] = useState(props.cartItem.qty);

    const setIncrement = () => {
        setCurrentQty(currentQty + 1);
        props.increment(_id);
    }
    const setDecrement = () => {
        if (currentQty <= 1) return;
        setCurrentQty(currentQty - 1);
        props.decrement(_id);
    }

    if (props.onlyCartProducts) {
        return (
            <>
                <div className="flexRow" style={{ margin: '10px 5px 0px 5px', ...props.style }}>
                    <div className="cartProImgContainer">
                        <img src={imgPath(img)} alt="image" />
                    </div>
                    <div className="cartItemDetails">
                        <div>
                            <p>{name}</p>
                            <p>₹{price.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '5px 25px', paddingBottom: '1rem' }}>
                    <div className="quantityControl">
                        <button style={{ color: 'red', border: '1px solid red' }} onClick={setDecrement}>-</button>
                        <input value={currentQty} readOnly />
                        <button style={{ color: 'green', border: '1px solid green' }} onClick={setIncrement}>+</button>
                    </div>
                    <button className="cartActionBtn" style={{ color: 'red' }} onClick={() => removeItem(_id)}>
                        Remove
                    </button>
                </div>
            </>

        )
    }

    const removeItem = (productId) => {
        dispatch(removeCartItem(productId));
    }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={imgPath(img)} alt="image" />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', margin: '5px 0' }}>
                <div className="quantityControl">
                    <button style={{ color: 'red', border: '1px solid red' }} onClick={setDecrement}>-</button>
                    <input value={currentQty} readOnly />
                    <button style={{ color: 'green', border: '1px solid green' }} onClick={setIncrement}>+</button>
                </div>
                <button className="cartActionBtn" style={{ color: '#2874f0' }}>Save For Later</button>
                <button className="cartActionBtn" style={{ color: 'red' }} onClick={() => removeItem(_id)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
