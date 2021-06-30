import { cartConstants } from '../actions/constants';

const initialState = {
    cartItems: {},
    updatingCart: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            return state = {
                ...state,
                updatingCart: true
            }
        case cartConstants.ADD_TO_CART_SUCCESS:
            return state = {
                ...state,
                updatingCart: false,
                cartItems: action.payload.cartItems
            }
        case cartConstants.ADD_TO_CART_FAILURE:
            return state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
        case cartConstants.REMOVE_CART_ITEM_REQUEST:
            return state = {
                ...state,
                updatingCart: true
            }
        case cartConstants.REMOVE_CART_ITEM_SUCCESS:
            return state = {
                ...state,
                updatingCart: false
            }
        case cartConstants.REMOVE_CART_ITEM_FAILURE:
            return state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
        case cartConstants.RESET_CART:
            return state = {
                updatingCart: false,
                cartItems: {},
                error: null
            }
        default:
            return state;
    }
}

export default cartReducer