import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DashBoardComponent from '../components/DashBoard/DashBoard';
import Loader from '../components/Loader/Loader';
import { currentSignInUser } from '../actions/authAction';
import { getCourses } from '../actions/courseAction';

const DashBoardPage = (props) => {
    const authState = useSelector((state) => state.authReducer);
    const courseState = useSelector((state) => state.courseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (courseState.courses.length <= 0) {
            dispatch(getCourses());
        }

        dispatch(currentSignInUser());
    }, [dispatch, courseState.courses]);

    if (authState.user) {
        return <DashBoardComponent />;
    } else if (authState.loading) {
        return <Loader />;
    } else if (courseState.loading) {
        return <Loader />;
    } else {
        return <Loader />;
    }
};

export default DashBoardPage;
