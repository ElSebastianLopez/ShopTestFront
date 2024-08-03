/** @format */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './views/ProductPage';
import PayCarPage from './views/PayCarPage';
import { useDispatch } from 'react-redux';
import { fetchClients } from './actions/ClientsActions';
import Header from './components/Header';
// import HomePage from './views/HomePage'; // Asegúrate de tener una página de inicio u otras páginas

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<Routes>
				 <Route path='/' element={<ProductPage />} /> 
				<Route path='/products' element={<ProductPage />} />
				<Route path='/paycar' element={<PayCarPage />} />
				{/* Agrega otras rutas aquí */}
			</Routes>
		</Router>
	);
};

export default App;
