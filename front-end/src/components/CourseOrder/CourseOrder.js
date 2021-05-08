import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCourseContent, getCourses } from '../../actions/courseAction';
import BootstrapNavbar from '../BootstrapNavbar/BootstrapNavbar';
import OrderButton from '../PaymentOrderButton/PaymentOrderButton';
import LoadingSpinner from '../Loader/Loader';

const CourseOrder = (props) => {
    const [courseDetail, setCourseDetail] = useState();

    const courseState = useSelector((state) => state.courseReducer);
    const authState = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    // Fetch the course details
    useEffect(() => {
        if (courseState.courses.length <= 0) {
            dispatch(getCourses());
        } else {
            const course = courseState.courses.find(
                (course) => course._id === props.id
            );
            setCourseDetail(course);
            dispatch(getCourseContent(course.name));
        }
    }, [courseState.courses, props.id]);

    // If loading true, then show loader else return JSX
    if (courseState.loading) {
        console.log('loading again');
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <BootstrapNavbar />

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <h3 className="text-muted">Video Contents</h3>
                            {courseState.courseContent.map((course) => {
                                return (
                                    <ul className="list-group" key={course._id}>
                                        <li className="list-group-item">
                                            {course['name']}
                                        </li>
                                    </ul>
                                );
                            })}
                        </div>

                        <div className="col-md-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <img
                                    src={
                                        courseDetail &&
                                        `https://lms-backend-rest-api.herokuapp.com/${courseDetail['imageUrl']}`
                                    }
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5
                                        className="card-title"
                                        style={{ textTransform: 'uppercase' }}
                                    >
                                        {courseDetail && courseDetail['name']}
                                    </h5>
                                    {courseDetail && (
                                        <OrderButton
                                            className="btn btn-block btn-success"
                                            userEmail={authState.user['email']}
                                            courseAmount={courseDetail['price']}
                                            courseName={courseDetail['name']}
                                            courseId={courseDetail['_id']}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default CourseOrder;
