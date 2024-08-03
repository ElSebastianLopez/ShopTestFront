/** @format */

import axios from 'axios';

export const FETCH_CART_DETAILS_REQUEST = 'FETCH_CART_DETAILS_REQUEST';
export const FETCH_CART_DETAILS_SUCCESS = 'FETCH_CART_DETAILS_SUCCESS';
export const FETCH_CART_DETAILS_FAILURE = 'FETCH_CART_DETAILS_FAILURE';

export const fetchCartDetails = () => async (dispatch) => {
	dispatch({ type: FETCH_CART_DETAILS_REQUEST });

	try {
		// Obtén el JSON del localStorage y parsea
		const clientString = localStorage.getItem('clients');
		const client = clientString ? JSON.parse(clientString) : null;

		// Verifica si el cliente y su ID existen
		if (!client || !client.data || !client.data.id) {
			throw new Error('Client ID not found in localStorage');
		}

		// Realiza la solicitud con el ID del cliente para obtener transacciones abiertas
		const transactionsResponse = await axios.get(
			`${process.env.REACT_APP_API_URL}transactions/open_by_client/${client.data.id}`,
		);

		const transaction = transactionsResponse.data.data;

		// Verifica si transaction es un objeto
		if (typeof transaction !== 'object' || !transaction.id) {
			throw new Error('Invalid transaction data');
		}

		// Obtén detalles de la transacción
		const transactionDetailsResponse = await axios.get(
			`${process.env.REACT_APP_API_URL}transactions/by_transaction/${transaction.id}`,
		);

		const transactionDetails = transactionDetailsResponse.data.data;

		// Verifica si transactionDetails es un array
		if (!Array.isArray(transactionDetails)) {
			throw new Error('Invalid transaction details data');
		}

		dispatch({
			type: FETCH_CART_DETAILS_SUCCESS,
			payload: transactionDetails, // Ajusta según la estructura de tu respuesta
		});
	} catch (error) {
		dispatch({
			type: FETCH_CART_DETAILS_FAILURE,
			payload: error.message,
		});
	}
};
