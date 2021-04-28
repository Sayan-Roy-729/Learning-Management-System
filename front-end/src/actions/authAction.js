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

// ? Create new user with email and password
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

// ? Sign In a user with email and password
export const signInUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: authConstants.USER_SIGN_IN_LOADING,
        });

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({
                    type: authConstants.USER_SIGN_IN_SUCCESSFUL,
                    payload: {
                        user,
                    },
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch({
                    type: authConstants.USER_SIGN_IN_FAILURE,
                    payload: {
                        errorMessage,
                    },
                });
            });
    };
};

// ? Clear the error messages in authentication global state
export const clearErrorMessage = () => {
    return {
        type: authConstants.CLEAR_ERROR_MESSAGE_STATE,
    };
};

// ? SignOut User
export const userSignOut = () => {
    return (dispatch) => {
        dispatch({
            type: authConstants.USER_SIGN_OUT_LOADING,
        });

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: authConstants.USER_SIGN_OUT_SUCCESSFUL,
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch({
                    type: authConstants.USER_SIGN_OUT_FAILURE,
                    payload: {
                        errorMessage,
                    },
                });
            });
    };
};

// ? Reset password by sending email
export const userResetPassword = (email) => {
    return (dispatch) => {
        dispatch({
            type: authConstants.USER_RESET_PASSWORD_BY_MAIL_LOADING,
        });

        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                dispatch({
                    type: authConstants.USER_RESET_PASSWORD_BY_MAIL_SUCCESSFUL,
                });
            })
            .catch((error) => {
                dispatch({
                    type: authConstants.USER_RESET_PASSWORD_BY_MAIL_FAILURE,
                    payload: {
                        errorMessage: error.message,
                    },
                });
            });
    };
};


// ? Clear the sent email state for forgetting password
export const clearSentEmail = () => {
    return {
        type: authConstants.USER_RESET_PASSWORD_BY_MAIL_CLEAR_STATE,
    };
}


// ? Sign In with Google
export const googleSignIn = () => {
    return dispatch => {
        dispatch({
            type: authConstants.USER_GOOGLE_SIGN_IN_LOADING,
        });

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;

            dispatch({
                type: authConstants.USER_GOOGLE_SIGN_IN_SUCCESS,
                payload: {
                    user,
                },
            });
        }).catch(error => {
            const errorMessage = error.message;
            const email = error.email;

            dispatch({
                type: authConstants.USER_GOOGLE_SIGN_IN_FAILURE,
                payload: {
                    errorMessage,
                }
            });
        });
    };
}
