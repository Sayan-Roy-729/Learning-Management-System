import axios from '../axios';
import { courseConstants } from './constants';

export const getCourses = () => {
    return (dispatch) => {
        dispatch({
            type: courseConstants.GET_COURSES_GET_LOADING,
        });

        axios
            .get('/courses/get')
            .then((response) => {
                const courses = response.data['courses'];
                dispatch({
                    type: courseConstants.GET_COURSES_GET_SUCCESS,
                    payload: {
                        courses,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: courseConstants.GET_COURSES_GET_FAILURE,
                    payload: {
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const getCourseContent = (name) => {
    return (dispatch) => {
        dispatch({
            type: courseConstants.GET_COURSE_CONTENT_LOADING,
        });

        axios
            .get(`/courses/get?name=${name}`)
            .then((response) => {
                const content = response.data['content'];
                dispatch({
                    type: courseConstants.GET_COURSE_CONTENT_SUCCESS,
                    payload: {
                        content,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: courseConstants.GET_COURSE_CONTENT_FAILURE,
                    payload: {
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const getEnrolledCourses = (userEmail) => {
    return (dispatch) => {
        dispatch({
            type: courseConstants.GET_ENROLLED_COURSES_LOADING,
        });

        axios({
            method: 'POST',
            url: '/courses/enrolled',
            data: {
                userEmail: userEmail,
            },
        })
            .then((response) => {
                const enrolledCourses = response.data;
                dispatch({
                    type: courseConstants.GET_ENROLLED_COURSES_SUCCESS,
                    payload: {
                        enrolledCourses,
                    },
                });
            })
            .catch((error) => {
                console.log('Error: ', error);
                dispatch({
                    type: courseConstants.GET_ENROLLED_COURSES_FAILURE,
                    payload: {
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const clearCourseState = () => {
    console.log('Clear course');
    return {
        type: courseConstants.CLEAR_COURSES_FROM_STATE,
    };
}
