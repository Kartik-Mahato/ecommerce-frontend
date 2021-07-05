import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoLocation } from 'react-icons/io5';

import './style.css';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceDetails from '../../components/PriceDetails';
import { addToCart, getAddress, getCartItems } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';
import Header from '../../components/Header';

const Cart = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const address = useSelector(state => state.user);
    const [cartItems, setCartItems] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getAddress());
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
                            style={props.style}
                        />
                    ))
                }
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                {
                    Object.keys(cart.cartItems).length > 0 ? (
                        <>
                            <Card className="cartCard">
                                <div className="cardHeader">
                                    <div>
                                        My Cart ({Object.keys(cart.cartItems).reduce(function (qty, key) {
                                            return qty + cart.cartItems[key].qty;
                                        }, 0)})
                                    </div>
                                    <div>
                                        <span style={{ verticalAlign: '-webkit-baseline-middle', marginRight: '0.2rem' }}>
                                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" alt="location" />
                                        </span>
                                        <span
                                            style={{ color: 'rgb(135, 135, 135)', fontWeight: 500, fontSize: '14px' }}
                                        >
                                            Deliver To: {address.address.length > 0 ? (
                                                <span style={{ color: '#000000', marginLeft: '0.4rem' }}>
                                                    {address.address[0].state} - {address.address[0].pinCode}
                                                </span>
                                            ) : null}
                                        </span>
                                    </div>
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
                                    <div style={{ width: '250px', marginRight: '1.5rem' }}>
                                        <MaterialButton
                                            title={'Place Order'}
                                            onClick={() => props.history.push('/checkout')}
                                        />
                                    </div>
                                </div>
                            </Card>
                            <div style={{ width: '380px' }}>
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
                        </>
                    ) : (
                        <div className="empty-cart-container">
                            <EmptyCart />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Cart
