import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';

import axios from '../../axios';

const PaymentOrderButton = (props) => {
    const history = useHistory();

    const paymentHandler = (token) => {
        axios({
            method: 'POST',
            url: '/payment',
            data: {
                token,
                userEmail: props.userEmail,
                coursePrice: props.courseAmount,
                courseName: props.courseName,
                courseId: props.courseId,
            },
        })
            .then((response) => {
                console.log(response);
                history.replace('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <StripeCheckout
            stripeKey="pk_test_51IiKV7SGTYp6ckpFSknK6V8Yt4FFJyQ0J8Gf9q4ab3OLdRRSgGmMHZAt547LEz0nKLEy1RfoUT57Cf83ijaiww4D00SFrRC0BU"
            token={paymentHandler}
            name={props.courseName}
            amount={props.courseAmount * 100}
            // shippingAddress
            // billingAddress
            allowRememberMe
            image={props.imageUrl}
            currency="INR"
        >
            <button className={props.className}>Order Now</button>
        </StripeCheckout>
    );
};

export default PaymentOrderButton;
