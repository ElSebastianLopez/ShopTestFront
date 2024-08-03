/** @format */

import axios from 'axios';
import {
	setTransactions,
	setStatus,
	setError,
} from '../reducers/payCarReducer';


// Acción para obtener los productos
export const fetchTransactionsDet = () => async (dispatch) => {
	try {
		const clientString = localStorage.getItem('clients');
		const client = clientString ? JSON.parse(clientString) : null;
		if (!client || !client.data || !client.data.id) {
			throw new Error('Client ID not found in localStorage');
		}
		dispatch(setStatus('loading')); // Establece el estado como 'loading'
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}transactions/open_by_client/${client.data.id}`,
		);
        const transaction = response.data.data;
		if (typeof transaction !== 'object' || !transaction.id) {
			throw new Error('Invalid transaction data');
		}
		const transactionDetailsResponse = await axios.get(
			`${process.env.REACT_APP_API_URL}transactions/by_transaction/${transaction.id}`,
		);
		const transactionDetails = transactionDetailsResponse.data.data;
        console.log(transactionDetails)
		dispatch(setTransactions(transactionDetails)); // Asegúrate de que esta línea refleje la estructura de tus datos
		dispatch(setStatus('succeeded')); // Establece el estado como 'succeeded'
	} catch (error) {
		dispatch(setStatus('failed'));
		dispatch(setError(error.message));
		console.error('Failed to fetch products:', error);
	}
};



