import axios from '../axios';
import { paymentConstants } from './constants';

export const paymentHandler = (token) => {
    return dispatch => {
        axios.post('/payment ', {
            body: JSON.stringify({
                token,
                
            })
        })
    };
};