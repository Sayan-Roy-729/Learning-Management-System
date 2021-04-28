import { authConstants } from '../actions/constants'; 

const initialState = {
    user: null,
    errorMessage: null,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case authConstants.GET_CURRENT_USER_SIGN_IN:
            return {
                ...state,
                user: action.user,
            };
        case authConstants.USER_SIGN_UP_LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.USER_SIGN_UP_SUCCESSFUL:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case authConstants.USER_SIGN_UP_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                loading: false,
            };

        default:
            return state;
    }
}

export default authReducer;