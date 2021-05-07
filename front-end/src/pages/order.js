import CourseOrder from '../components/CourseOrder/CourseOrder';

const Order = props => {
    return (
        <CourseOrder id = {props.match.params.id}/>
    );
};

export default Order;