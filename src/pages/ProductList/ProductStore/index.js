import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css'
import ProductLoaderAnimation from '../../../components/MenuHeader/ProductLoaderAnimation';
import { getProductsBySlug } from '../../../actions';
import { imgPath } from '../../../urlConfig';

const ProductStore = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;

    useEffect(() => {
        dispatch(getProductsBySlug(props.match.params.slug))
    }, [dispatch])

    return (
        <>
            {product.loading ? (
                <div div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ProductLoaderAnimation />
                </div >
            ) : (
                <>
                    {
                        Object.keys(product.productsByPrice).map((key, index) => {
                            return (
                                <div className="productCard" key={index}>
                                    <div className="card-header">
                                        <div style={{ fontWeight: 500 }}>
                                            {props.match.params.slug} mobiles under ₹ {priceRange[key].toLocaleString('en-IN')}
                                        </div>
                                        <button className="viewAllBtn">View All</button>
                                    </div>
                                    {
                                        product.productsByPrice[key].length === 0 && (
                                            <div style={{ textAlign: 'center', padding: '0.2rem 0' }}>
                                                No products under this price range
                                            </div>
                                        )
                                    }
                                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                                        {
                                            product.productsByPrice[key].map(product => (
                                                <Link to={`/${product.slug}/${product._id}/p`} style={{ display: 'block' }} className="product-container" key={product._id}>
                                                    <div className="product-image-container">
                                                        <img src={imgPath(product.productPictures[0].img)} alt="samsung" />
                                                    </div>
                                                    <div className="product-info">
                                                        <div className="product-title">{product.name}</div>
                                                        <div>
                                                            <span className="rating">
                                                                4.3 ⭐
                                                            </span>&nbsp;&nbsp;&nbsp;
                                                            <span>(333)</span>
                                                        </div>
                                                        <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            )}
        </>
    )
}

export default ProductStore


