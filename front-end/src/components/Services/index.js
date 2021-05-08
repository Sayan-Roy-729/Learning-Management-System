import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sweetalert from 'sweetalert2';

import { getCourses, getEnrolledCourses } from '../../actions/courseAction';
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from './ServicesElements'

const Services = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const courseState = useSelector(state => state.courseReducer);
    const authState = useSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(getCourses());

        if (!courseState.enrolledCourses['user']) {
            dispatch(getEnrolledCourses(authState.user && authState.user['email']));
        }
    }, []);

    const onOrder = (courseId) => {
        if (!authState.user) {
            sweetalert.fire({
                title: 'Error',
                text: 'Please sign in & go further!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'red',
            }).then(result => {
                if (result.isConfirmed) {
                    history.replace('/');
                }
            });
        } else if (courseState.enrolledCourses['user']) {
            const course = courseState.enrolledCourses['user']['payments'].filter(course => {
                return course['courseId'] === courseId;
            });

            if (course.length > 0) {
                sweetalert.fire({
                    title: 'Already Enrolled!',
                    text: "You already enrolled in this course. Want to go to dashboard?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: 'green',
                    cancelButtonText: 'No',
                    cancelButtonColor: 'red',
                    reverseButtons: true
                }).then(result => {
                    if (result.isConfirmed) {
                        history.push('/dashboard');
                    } else if (result.dismiss === sweetalert.DismissReason.cancel) {
                        history.push('/');
                    }
                });
            } else {
                history.push(`/order/${courseId}`);
            }
        } else {
            history.push(`/order/${courseId}`);
        }
    }

    return (
        <ServicesContainer id="services">
        <ServicesH1>Our Courses</ServicesH1>
        <ServicesWrapper>

            {
                courseState.courses.length > 0 ? (
                    courseState.courses.map(course => {
                        return (
                            // <Link to = {`/order/${course._id}`} style={{textDecoration: 'none'}} key = {course['_id']} onClick = {() => onOrder(course._id, )}>
                            <Link style={{textDecoration: 'none'}} key = {course['_id']} onClick = {() => onOrder(course._id)}>
                                <ServicesCard>
                                    <ServicesIcon src={`https://lms-backend-rest-api.herokuapp.com/${course.imageUrl}`} />
                                    <ServicesH2 style={{textTransform: 'capitalize'}}><b>{course.name}</b></ServicesH2>
                                    <ServicesP>{course.description}</ServicesP>
                                </ServicesCard>
                            </Link>
                        );
                    })
                ) : (<h1>Courses is not uploaded yiet!</h1>)
            }

            {/* <ServicesCard>
                <ServicesIcon src={Icon1} />
                <ServicesH2>Web Development</ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </ServicesP>
            </ServicesCard>

            <ServicesCard>
                <ServicesIcon src={Icon2} />
                <ServicesH2>Android Development </ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ServicesP>
            </ServicesCard>

            <ServicesCard>
                <ServicesIcon src={Icon3} />
                <ServicesH2>Artificial Intelligence</ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ServicesP>
            </ServicesCard> */}

        </ServicesWrapper>
        </ServicesContainer>
    );
};
 
export default Services ;
