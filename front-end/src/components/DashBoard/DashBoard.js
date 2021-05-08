import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEnrolledCourses } from '../../actions/courseAction';
import LoadingSpinner from '../Loader/Loader';
import BootstrapNavbar from '../BootstrapNavbar/BootstrapNavbar';

const DashBoard = props => {
    const authState = useSelector(state => state.authReducer);
    const courseState = useSelector(state => state.courseReducer);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getEnrolledCourses(authState.user['email']));
    }, []);

    if (courseState.loading) {
        return <LoadingSpinner />
    } else {
        return (
            <>
                <BootstrapNavbar />

                <div className="container">
                    <div className="row">
                        {
                            courseState.enrolledCourses['user'] ? courseState.enrolledCourses['user']['payments'].map(course => {
                                const courseDetails = courseState.courses.find(item => item['_id'] === course['courseId']);
                                if (courseDetails) {
                                    return (
                                        <div className="col-md-4 mt-3" key = {courseDetails['_id']}>
                                            <div className="card">
                                                <img src={`https://lms-backend-rest-api.herokuapp.com/${courseDetails.imageUrl}`} className="card-img-top" alt={courseDetails['name']} style={{height: '200px'}}/>
                                                <div className="card-body">
                                                    <h5 className="card-title" style = {{textTransform: 'capitalize'}}>{courseDetails['name']}</h5>
                                                    <p className="card-text">{courseDetails['description']}</p>
                                                    <Link to={`/course/${courseDetails['_id']}`} class="btn btn-block btn-success">Go to Course</Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            }) :
                            <h2 className="text-muted" style={{margin: 'auto'}}>You have not enrolled any courses yet!</h2>
                        }
                    </div>
                </div>
            </>
        );
    }
};

export default DashBoard;