import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCart, IoIosArrowForward, IoIosStar } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';

import './style.css';
import { MaterialButton } from '../../components/MaterialUI';
import Layout from '../../components/Layout';
import { addToCart, getProductDetailsById } from '../../actions';
import { imgPath } from '../../urlConfig';

const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = { param: { productId } }
        dispatch(getProductDetailsById(payload));
    }, [])

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    return (
        <Layout>
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            product.productDetails.productPictures.map((thumbnail, index) => (
                                <div key={index} className="thumbnail">
                                    <img src={imgPath(thumbnail.img)} alt="thumbnail" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img src={imgPath(product.productDetails.productPictures[0].img)} alt="" />
                        </div>
                        <div className="flexRow" style={{ marginTop: '1rem' }}>
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{ marginRight: '5px', boxShadow: 'rgba(255, 159, 0, 0.4) 0px 6px 12px -2px, rgba(255, 159, 0, 0.4) 0px 3px 7px -3px' }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    props.history.push('/cart');
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{ marginLeft: '5px', boxShadow: 'rgba(251, 100, 27, 0.4) 0px 6px 12px -2px, rgba(251, 100, 27, 0.4) 0px 3px 7px -3px' }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="breed">
                        <ul>
                            <li><a href="#">Home</a><IoIosArrowForward /></li>
                            <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                            <li><a href="#">Samsung</a><IoIosArrowForward /></li>
                            <li><a href="#">{product.productDetails.name}</a></li>
                        </ul>
                    </div>
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="ratingCount">4.3 <IoIosStar /></span>
                            <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                        </div>
                        {/* <div className="extraOffer">Extra <BiRupee />4500 off</div> */}
                        <div className="flexRow priceContainer">
                            <span className="price">
                                <BiRupee />{product.productDetails.price.toLocaleString('en-IN')}
                            </span>
                            {/* <span className="discount" style={{ margin: '0 10px' }}>22% off</span> */}
                        </div>
                        <div>
                            <p style={{ display: 'flex' }}>
                                <span style={{
                                    width: '110px',
                                    fontSize: '14px',
                                    color: '#878787',
                                    fontWeight: '500',
                                    paddingRight: '10px'
                                }}>Description</span>
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    color: '#212121',
                                    textAlign: 'justify',
                                    marginLeft: '2rem',
                                    marginRight: '5rem',
                                    lineHeight: 1.3
                                }}>{product.productDetails.description}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
