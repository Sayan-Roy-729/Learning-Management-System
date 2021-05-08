import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import sweetalert from 'sweetalert2';

import CourseOrder from '../components/CourseOrder/CourseOrder';
import Loader from '../components/Loader/Loader';
import { currentSignInUser } from '../actions/authAction';
import { getEnrolledCourses, getCourses } from '../actions/courseAction';
import { CalendarViewDay } from '@material-ui/icons';

const Order = (props) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const authState = useSelector((state) => state.authReducer);
    const courseState = useSelector((state) => state.courseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authState.user) {
            history.replace('/');
        }
    });

    if (!authState.user) {
        console.log('order page');
        history.replace('/');
    } else {
        return <CourseOrder id={props.match.params.id} />;
    }
};

export default Order;
