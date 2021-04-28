import { authConstants } from '../actions/constants';

const initialState = {
    user: null,
    errorMessage: null,
    loading: false,
    sendMail: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case authConstants.CLEAR_ERROR_MESSAGE_STATE:
            return {
                ...state,
                errorMessage: null,
            };
        case authConstants.USER_SIGN_IN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.USER_SIGN_IN_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            };
        case authConstants.USER_SIGN_IN_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        case authConstants.USER_SIGN_OUT_LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.USER_SIGN_OUT_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                user: null,
            };
        case authConstants.USER_SIGN_OUT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        case authConstants.USER_RESET_PASSWORD_BY_MAIL_LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.USER_RESET_PASSWORD_BY_MAIL_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                user: null,
                sendMail: true,
            };
        case authConstants.USER_RESET_PASSWORD_BY_MAIL_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
                sendMail: true,
            };
        case authConstants.USER_RESET_PASSWORD_BY_MAIL_CLEAR_STATE:
            return {
                ...state,
                errorMessage: null,
                sendMail: false,
            };
        case authConstants.USER_GOOGLE_SIGN_IN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.USER_GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            };
        case authConstants.USER_GOOGLE_SIGN_IN_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default authReducer;
