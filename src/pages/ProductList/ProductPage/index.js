import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './style.css';
import Card from '../../../components/UI/Card';
import { getProductPage } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import getParams from '../../../utils/getParams';

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const page = product.page;

    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = { params }
        dispatch(getProductPage(payload));
    }, [dispatch]);

    return (
        <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => { }}
                autoPlay
                showArrows={false}
                showIndicators={false}
                interval={2500}
                infiniteLoop
            >
                {
                    page.banners && page.banners.map((banner, index) => (
                        <a
                            href={banner.navigateTo}
                            key={index}
                            style={{ display: 'block', maxHeight: '300px' }}
                        >
                            <img style={{ width: '100%' }} src={banner.img} alt="banne1" />
                        </a>
                    ))
                }
            </Carousel>
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                {
                    page.products && page.products.map((product, index) => (
                        <Card
                            key={index}
                            style={{
                                width: '150px',
                                height: '200px',
                                margin: '10px 20px'
                            }}
                        >
                            <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={product.img} alt="product" />
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductPage
