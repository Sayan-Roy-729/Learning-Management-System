import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import { getCourses } from '../../actions/courseAction';
// import Icon1 from '../../images/Icon1.svg'
// import Icon2 from '../../images/Icon2.svg'
// import Icon3 from '../../images/Icon3.svg'
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
    const dispatch = useDispatch();
    const courseState = useSelector(state => state.courseReducer);

    useEffect(() => {
        dispatch(getCourses());
    }, []);

    return (
        <ServicesContainer id="services">
        <ServicesH1>Our Courses</ServicesH1>
        <ServicesWrapper>

            {
                courseState.courses.length > 0 ? (
                    courseState.courses.map(course => {
                        return (
                            <Link to = {`/order/${course._id}`} style={{textDecoration: 'none'}} key = {course['_id']}>
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
