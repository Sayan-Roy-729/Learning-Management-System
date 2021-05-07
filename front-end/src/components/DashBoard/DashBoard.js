import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEnrolledCourses } from '../../actions/courseAction';
import LoadingSpinner from '../Loader/Loader';

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
                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <Link className="navbar-brand" to="/">
                        CampusX
                    </Link>
                </nav>

                <div className="container">
                    <div className="row mt-4">
                        {
                            courseState.enrolledCourses['user'] ? courseState.enrolledCourses['user']['payments'].map(course => {
                                const courseDetails = courseState.courses.find(item => item['_id'] === course['courseId']);
                                if (courseDetails) {
                                    return (
                                        <div className="col-md-4" key = {courseDetails['_id']}>
                                            <div class="card" style = {{width: '18rem'}}>
                                                <img src={`https://lms-backend-rest-api.herokuapp.com/${courseDetails.imageUrl}`} class="card-img-top" alt={courseDetails['name']} style={{height: '250px'}}/>
                                                <div class="card-body">
                                                    <h5 class="card-title" style = {{textTransform: 'capitalize'}}>{courseDetails['name']}</h5>
                                                    <p class="card-text">{courseDetails['description']}</p>
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