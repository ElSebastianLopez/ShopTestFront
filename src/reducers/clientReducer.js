/** @format */

// src/reducers/clientReducer.js
import {
	FETCH_CLIENTS_REQUEST,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAILURE,
} from '../actions/ClientsActions';

const initialState = {
	loading: false,
	clients: JSON.parse(localStorage.getItem('clients')) || [], // Carga los clientes desde localStorage si están presentes
	error: null,
};

const clientReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CLIENTS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_CLIENTS_SUCCESS:
			return {
				...state,
				loading: false,
				clients: action.payload,
			};
		case FETCH_CLIENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default clientReducer;
