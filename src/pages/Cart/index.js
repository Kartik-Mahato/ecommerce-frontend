import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import PriceDetails from '../../components/PriceDetails';
import { addToCart, getCartItems } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';

const Cart = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate])

    const incrementQty = (_id) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1))
    }

    const decrementQty = (_id) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1))
    }

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((item, index) => (
                        <CartItem
                            key={index}
                            cartItem={cartItems[item]}
                            increment={incrementQty}
                            decrement={decrementQty}
                            onlyCartProducts={true}
                        />
                    ))
                }
            </>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <Card style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}>
                    <div className="cardHeader">
                        <div>My Cart</div>
                        <div>Deliver To</div>
                    </div>
                    {
                        Object.keys(cartItems).map((item, index) => (
                            <CartItem
                                key={index}
                                cartItem={cartItems[item]}
                                increment={incrementQty}
                                decrement={decrementQty}
                            />
                        ))
                    }
                    <div className="goToCheckoutBtn">
                        <div style={{ width: '250px' }}>
                            <MaterialButton
                                title={'Place Order'}
                                onClick={() => props.history.push('/checkout')}
                            />
                        </div>
                    </div>
                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default Cart
