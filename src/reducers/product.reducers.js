import { productConstants } from "../actions/constants"

const initialState = {
    products: [],
    priceRange: {},
    productsByPrice: {},
    pageRequest: false,
    page: {},
    error: null,
    loading: false,
    productDetails: {}
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            return state = {
                ...state,
                products: action.payload.products,
                priceRange: action.payload.priceRange,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            return state = {
                ...state,
                pageRequest: true
            }
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            return state = {
                ...state,
                pageRequest: false,
                page: action.payload.page
            }
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            return state = {
                ...state,
                pageRequest: false,
                error: action.payload.error
            }
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return state = {
                ...state,
                laoding: true
            }
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails
            }
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }

        default:
            return state
    }
}

export default productReducer