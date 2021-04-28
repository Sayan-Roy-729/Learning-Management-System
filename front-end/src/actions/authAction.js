import firebase from '../config/firebaseConfig';

import { authConstants } from './constants/index';

export const userResult = (user) => {
    return {
        type: authConstants.GET_CURRENT_USER_SIGN_IN,
        user: user,
    };
};

// ? Get the currently signed-in user
export const currentSignInUser = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(userResult(user));
            } else {
                dispatch(userResult(null));
            }
        });
    };
};

export const createNewUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: authConstants.USER_SIGN_UP_LOADING,
        });

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('New User: ', userCredential);
                const user = userCredential.user;
                dispatch({
                    type: authConstants.USER_SIGN_UP_SUCCESSFUL,
                    payload: {
                        user: user,
                    },
                });
            })
            .catch((error) => {
                // const errorCode = error.code;
                console.log(error);
                const errorMessage = error.message;
                dispatch({
                    type: authConstants.USER_SIGN_UP_ERROR,
                    payload: {
                        errorMessage: errorMessage,
                    },
                });
            });
    };
};
