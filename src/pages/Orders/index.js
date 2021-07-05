import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';

import './style.css';
import Layout from '../../components/Layout';
import { getOrders } from '../../actions';
import { imgPath } from '../../urlConfig';
import { Breed } from '../../components/MaterialUI';

const Orders = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getOrders())
    }, [])
    return (
        <Layout>
            <div style={{ maxWidth: '1400px', margin: '5px auto' }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" }
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {
                    user.orders.map(order => {
                        return order.items.map((item, index) => (
                            <div className="order" key={index}>
                                <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                                    <div className="orderImgContainer">
                                        <img className="orderImg" src={imgPath(item.productId.productPictures[0].img)} alt="product image" />
                                    </div>
                                    <div className="orderRow">
                                        <div className="orderName">{item.productId.name}</div>
                                        <div className="orderPrice">₹{item.payablePrice.toLocaleString('en-IN')}</div>
                                        <div className="orderStatus">{order.paymentStatus}</div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    })
                }
            </div>
        </Layout>
    )
}

export default Orders
