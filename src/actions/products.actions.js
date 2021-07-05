import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
    
    const res = await axios.get(`/products/${slug}`);

    if (res.status === 200) {
        dispatch({
            type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
            payload: res.data
        })
    } else {
        console.log('Error');

    }
}

export const getProductPage = (payload) => async (dispatch) => {
    const { cid, type } = payload.params;
    const res = await axios.get(`/page/${cid}/${type}`);
    dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
    try {
        if (res.status === 200) {
            const { page } = res.data;
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                payload: { page }
            });
        } else {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                payload: { error: res.data.error }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProductDetailsById = (payload) => async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    const { productId } = payload.param;
    try {
        const res = await axios.get(`/product/${productId}`);
        // console.log(res);
        dispatch({
            type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
            payload: { productDetails: res.data.productDetails }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            payload: { error: "Internal Server Error" }
        });
    }
}