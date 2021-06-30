import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import Layout from '../../components/Layout';
import AddressForm from './AddressForm';
import PriceDetails from '../../components/PriceDetails';
import Cart from '../Cart';
import Card from '../../components/UI/Card';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';
import { addOrder, getAddress } from '../../actions/user.actions';
import { getCartItems } from '../../actions';

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStepContainer">
            <div className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.stepTitle}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    )
}

const Checkout = (props) => {
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmPayment, setConfirmPayment] = useState(false);
    const dispatch = useDispatch();

    const onAddressSubmit = (addrr) => {
        setSelectedAddress(addrr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    useEffect(() => {
        const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }));
        setAddress(address);
    }, [user.address])

    const selectAddress = (adr) => {
        const updatedAddress = address.map(_adr =>
            _adr._id === adr._id ? { ..._adr, selected: true } : { ..._adr, selected: false });
        setAddress(updatedAddress);
    }

    const confirmDeliveryAddress = (adr) => {
        setConfirmAddress(true);
        setSelectedAddress(adr);
        setOrderSummary(true);
    }

    const changeConfirmAddress = () => {
        setConfirmAddress(false);
        setSelectedAddress(null);
        setOrderSummary(false);
    }

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
    }

    const onPaymentConfirmation = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
        }, 0);

        const items = Object.keys(cart.cartItems).map(key => ({ productId: key, payablePrice: cart.cartItems[key].price, purchaseQty: cart.cartItems[key].qty }));

        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentType: "COD",
            paymentStatus: 'pending'
        }
        // console.log(payload);
        dispatch(addOrder(payload));
        setConfirmPayment(true);
    }

    if (confirmPayment) {
        return (
            <Layout>
                <Card>
                    <div>Thank You for shopping</div>
                </Card>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <div className="checkoutContainer">

                    <CheckoutStep
                        stepNumber={'1'}
                        stepTitle={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>{`${auth.user.firstname} ${auth.user.lastname}`}</span>
                                    <span style={{ margin: '0 5px' }}>{auth.user.email}</span>
                                </div>
                            ) : (
                                <div>
                                    <MaterialInput
                                        label="Email"
                                    />
                                </div>
                            )
                        }
                    />
                    <CheckoutStep
                        stepNumber={'2'}
                        stepTitle={'DELIVERY ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {
                                    confirmAddress ? (
                                        <div className="confirmAddress" onClick={changeConfirmAddress}>
                                            <div className='selectedAddress'>
                                                {selectedAddress.name}<br />
                                                {`${selectedAddress.address} - ${selectedAddress.pinCode}`}
                                            </div>
                                            <div className="changeConfirmAddress">
                                                CHANGE ADDRESS
                                            </div>
                                        </div>
                                    ) :
                                        address?.map((adr, index) => (
                                            <div key={index} className="flexRow addressContainer">
                                                <div>
                                                    <input onClick={() => selectAddress(adr)} name="address" type="radio" />
                                                </div>
                                                <div className="flexRow addressInfo">
                                                    <div style={{ width: '100%' }}>
                                                        <div className="userDetails">
                                                            <span>{adr.name}</span>
                                                            <span>{adr.addressType}</span>
                                                            <span>{adr.mobileNumber}</span>
                                                        </div>
                                                        <div className="userAddress">
                                                            {adr.address}
                                                            <div>{adr.cityDistrictTown}</div>
                                                            <div>{adr.state} - {adr.pinCode}</div>
                                                        </div>
                                                        {
                                                            adr.selected && (
                                                                <MaterialButton
                                                                    title={'DELIVER HERE'}
                                                                    style={{ width: '250px', marginTop: '10px' }}
                                                                    onClick={() => confirmDeliveryAddress(adr)}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                    {
                                                        adr.selected && (
                                                            <div className='editBtn' title='Current not working'>Edit</div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                }
                            </>
                        }
                    />
                    {
                        confirmAddress ? null : auth.authenticate ? (
                            <AddressForm
                                onSubmit={onAddressSubmit}
                                onCancel={() => { }}
                            />
                        ) : null
                    }

                    <CheckoutStep
                        stepNumber={'3'}
                        stepTitle={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ? <Cart onlyCartItems={true} /> : 
                            orderConfirmation ? <div style={{ marginLeft: '2.4rem', padding: '0px 20px' }}>
                                {Object.keys(cart.cartItems).length} items
                            </div> : null
                        }
                    />
                    {orderSummary && (
                        <div className="checkoutStepContainer" style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 60px', alignItems: 'center' }}>
                            <p style={{ fontWeight: 400, fontSize: '18px' }}>
                                Order Confirmation email will be sent to
                                <span style={{ color: 'darkBlue', fontWeight: 500, textDecoration: 'underline' }}> {auth.user.email}</span>
                            </p>
                            <MaterialButton
                                title={'Continue'}
                                onClick={userOrderConfirmation}
                                style={{
                                    width: '200px',
                                    fontSize: '18px',
                                    letterSpacing: '0.5px'
                                }}
                            />
                        </div>
                    )}

                    <CheckoutStep
                        stepNumber={'4'}
                        active={paymentOption}
                        stepTitle={'PAYMENT OPTIONS'}
                        body={
                            paymentOption && <div style={{ padding: '15px 0' }}>
                                <div className="paymentOptions">
                                    <input type="radio" id="cod" name="paymentOption" value="COD" />
                                    <label htmlFor="cod">Cash On Delivery</label>
                                </div>
                                <MaterialButton
                                    title={'CONFIRM ORDER'}
                                    onClick={onPaymentConfirmation}
                                    style={{
                                        width: '200px',
                                        marginLeft: '1.6rem'
                                    }}
                                />
                            </div>
                        }
                    />
                </div>
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

export default Checkout
