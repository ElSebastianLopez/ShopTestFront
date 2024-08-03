/** @format */

// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../reducers/productsSlice';
import clientReducer from '../reducers/clientReducer';
import cartReducer from '../reducers/cartReducer';
import payCarReducer from '../reducers/payCarReducer';
import TransactionOpen from '../reducers/TransactionOpenReducer';
import WompiReducers from '../reducers/WompiReducer';
// Importa otros reducers si los tienes
// import ordersReducer from '../features/orders/ordersSlice';

const store = configureStore({
	reducer: {
		products: productsReducer,
		clients: clientReducer,
		cart: cartReducer,
		payCar: payCarReducer,
		TransactionOpen: TransactionOpen,
		Wompi: WompiReducers,
		// Agrega otros reducers aquí si los tienes
		// orders: ordersReducer,
	},
	// Puedes agregar middleware adicional aquí si es necesario
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
});

export default store;
