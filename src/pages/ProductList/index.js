import React from 'react';

import './style.css'
import ClothingAndAccessories from './ClothingAndAccessories';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import Layout from '../../components/Layout';
import getParams from '../../utils/getParams';

const ProductList = (props) => {

    let content = null;

    const renderProducts = () => {
        const params = getParams(props.location.search);
        // console.log(params);

        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />;
                break;
            case 'page':
                content = <ProductPage {...props} />;
                break;
            default:
                content = <ClothingAndAccessories {...props} />;
        }
        return content;
    }

    return (
        <Layout>
            {renderProducts()}
        </Layout>
    )
}

export default ProductList
