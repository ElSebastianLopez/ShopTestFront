import axios from 'axios';
import { setProducts, setStatus, setError, } from '../reducers/productsSlice';
import { fetchCartDetails } from './cartActions'; // Asegúrate de que fetchCartDetails esté definido en cartActions.js

// Acción para obtener los productos
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setStatus('loading')); // Establece el estado como 'loading'
    const response = await axios.get(`${process.env.REACT_APP_API_URL}products`);
    dispatch(setProducts(response.data.data)); // Asegúrate de que esta línea refleje la estructura de tus datos
    dispatch(setStatus('succeeded')); // Establece el estado como 'succeeded'
  } catch (error) {
    dispatch(setStatus('failed'));
    dispatch(setError(error.message));
    console.error('Failed to fetch products:', error);
  }
};

// Acción para añadir un detalle de transacción
export const addTransactionDetail = (transactionDetail) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}transactions/create_transaction_detail`,
      transactionDetail
    );

    if (response.data.success) {
      // Despacha una acción para actualizar el estado del carrito si es necesario
      dispatch(fetchCartDetails());
      console.log('Transaction detail added successfully');
    } else {
      console.error('Failed to add transaction detail');
    }
  } catch (error) {
    console.error('Error adding transaction detail', error);
  }
};
