import { courseConstants } from '../actions/constants';

const initialState = {
    loading: false,
    courses: [],
    courseContent: [],
    enrolledCourses: [],
    errorMessage: null,
};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case courseConstants.GET_COURSES_GET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case courseConstants.GET_COURSES_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: action.payload.courses,
            };
        case courseConstants.GET_COURSES_GET_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        case courseConstants.GET_COURSE_CONTENT_LOADING:
            return {
                ...state,
                loading: true,
            };
        case courseConstants.GET_COURSE_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                courseContent: action.payload.content,
            };
        case courseConstants.GET_COURSE_CONTENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        case courseConstants.GET_ENROLLED_COURSES_LOADING:
            return {
                ...state,
                loading: true,
            };
        case courseConstants.GET_ENROLLED_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                enrolledCourses: action.payload.enrolledCourses,
            };
        case courseConstants.GET_ENROLLED_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage,
            };
        case courseConstants.CLEAR_COURSES_FROM_STATE:
            return {
                ...state,
                enrolledCourses: [],
                courseContent: [],
                errorMessage: null,
            };
        default:
            return state;
    }
};

export default courseReducer;
