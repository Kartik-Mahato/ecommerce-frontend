import { authConstants } from "../actions/constants"

const initialState = {
    token: null,
    user: {
        _id: '',
        email: '',
        firstname: '',
        lastname: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return state = {
                ...state,
                authenticating: true,
                authenticate: false
            }
        case authConstants.LOGIN_SUCCESS:
            return state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
        case authReducer.LOGIN_FAILURE:
            return state = {
                ...state,
                authenticating: false,
                authenticate: false,
                message: action.payload.error
            }
        case authConstants.LOGOUT_REQUEST:
            return state = {
                loading: true,
                ...initialState,
            }
        case authConstants.LOGOUT_SUCCESS:
            return state = {
                loading: false,
                ...initialState,
            }
        case authConstants.LOGOUT_FAILURE:
            return state = {
                ...initialState,
                loading: false,
                error: action.payload.error,
            }
        case authConstants.SIGNUP_FAILURE:
            return state = {
                ...initialState,
                loading: false,
                message: action.payload.error
            }
        default:
            return state;
    }
}

export default authReducer