import { userConstants } from '../actions/constants';

const initialState = {
    address: [],
    orders: [],
    error: null,
    loading: false,
    orderDetails: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            return state = {
                ...state,
                loading: false,
                address: action.payload.address
            }
        case userConstants.GET_USER_ADDRESS_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            return state = {
                ...state,
                loading: false,
                address: action.payload.address,
            }
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.GET_USER_ORDER_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case userConstants.GET_USER_ORDER_SUCCESS:
            return state = {
                ...state,
                loading: false,
                orders: action.payload.orders
            }
        case userConstants.GET_USER_ORDER_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.GET_USER_ORDER_DETAIL_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case userConstants.GET_USER_ORDER_DETAIL_SUCCESS:
            return state = {
                ...state,
                loading: false,
                orderDetails: action.payload.order
            }
        case userConstants.GET_USER_ORDER_DETAIL_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default userReducer;