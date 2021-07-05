import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { getOrder } from '../../actions';
import invoice from '../../images/invoice.png';
import { imgPath } from '../../urlConfig';

const OrderDetails = (props) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.user.orderDetails);

    useEffect(() => {
        const payload = {
            orderId: props.match.params.orderId
        }
        dispatch(getOrder(payload));
    }, [dispatch])

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };

    const formatDate2 = (date) => {
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (date) {
            const d = new Date(date);
            return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        }
    };

    if (!(orderDetails && orderDetails.address)) {
        return null;
    }

    return (
        <Layout>
            {orderDetails.address ? (
                <div style={{ width: '1160px', margin: '10px auto' }}>
                    <div className="card">
                        <div className="delAdrContainer">
                            <div className="delAdrDetails">
                                <div className="delTitle">Delivery Address</div>
                                <div className="delName">{orderDetails.address.name}</div>
                                <div className="delAddress">
                                    {orderDetails.address.address},&nbsp;{orderDetails.address.landmark},<br />{orderDetails.address.cityDistrictTown},&nbsp;{orderDetails.address.state}-{orderDetails.address.pinCode}
                                </div>
                                <div className="delPhoneNumber">
                                    <span style={{ fontWeight: 500 }}>Phone Number</span>&nbsp; {orderDetails.address.mobileNumber}
                                </div>
                            </div>
                            <div className="delMoreActionContainer">
                                <div className="delTitle">More Actions</div>
                                <div className="delName invoice">
                                    <img src={invoice} alt="invoice" />
                                    <span>Download Invoice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {orderDetails.items.map((item, index) => (
                        <div
                            className="card orderDetailsSummary"
                            key={index}
                        >
                            <div className="flexRow">
                                <div className="delItemImgContainer">
                                    <img src={imgPath(item.productId.productPictures[0].img)} alt="" />
                                </div>
                                <div style={{ width: "250px" }}>
                                    <div className="delItemName">{item.productId.name}</div>
                                    <span style={{ marginTop: '0.5rem' }}>₹{item.payablePrice.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <div style={{ padding: "25px 50px" }}>
                                <div className="orderTrack">
                                    {orderDetails.orderStatus.map((status) => (
                                        <div
                                            className={`orderStatus ${status.isCompleted ? "active" : ""
                                                }`}
                                            key={status._id}
                                        >
                                            <div
                                                className={`point ${status.isCompleted ? "active" : ""}`}
                                            ></div>
                                            <div className="orderInfo">
                                                <div className="status">{status.type}</div>
                                                <div className="date">{formatDate(status.date)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 14 }}>
                                {orderDetails.orderStatus[3].isCompleted &&
                                    `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </Layout>
    )
}

export default OrderDetails
