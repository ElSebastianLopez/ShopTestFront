import axios from 'axios';

export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';

export const fetchClients = () => async (dispatch) => {
  dispatch({ type: FETCH_CLIENTS_REQUEST });
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}clients`);
    // Guarda la respuesta en localStorage
    localStorage.setItem('clients', JSON.stringify(response.data));
    dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CLIENTS_FAILURE, payload: error.message });
  }
};