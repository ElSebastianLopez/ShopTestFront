// src/actions/TransactionOpenActions.js
import axios from 'axios';
import { setmerchant_details, setStatus, setError } from '../reducers/WompiReducer';

export const fetchmerchant_details = () => async (dispatch) => {
    try {
        
        dispatch(setStatus('loading')); // Establece el estado como 'loading'
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}wompi/merchant_details`,
        );
        const merchant = response.data.data;
        if (typeof merchant !== 'object') {
            throw new Error('Invalid transaction data');
        }

        dispatch(setmerchant_details(merchant)); // Asegúrate de que esta línea refleje la estructura de tus datos
        dispatch(setStatus('succeeded')); // Establece el estado como 'succeeded'
    } catch (error) {
        dispatch(setStatus('failed'));
        dispatch(setError(error.message));
        console.error('Failed to fetch products:', error);
    }
}
