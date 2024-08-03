/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addTransactionDetail } from '../actions/productActions';
import {
	incrementQuantity,
	decrementQuantity,
} from '../reducers/productsSlice';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus, mdiCartPlus } from '@mdi/js';

const ProductsComponent = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.list);
	const status = useSelector((state) => state.products.status);
	const error = useSelector((state) => state.products.error);
	const quantities = useSelector((state) => state.products.quantities);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);

	const handleAddToCart = (product) => {
		const clientData = JSON.parse(localStorage.getItem('clients'));
		const clientId = clientData?.data?.id;

		if (!clientId) {
			console.error('Client ID not found in localStorage');
			return;
		}

		const transactionDetail = {
			transaction_detail: {
				product_id: product.id,
				quantity: quantities[product.id],
				price: product.price, // Asegúrate de usar la propiedad correcta
				client_id: clientId,
			},
		};
		debugger;

		dispatch(addTransactionDetail(transactionDetail));
	};

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<Grid container spacing={2}>
				{products.map((product) => (
					<Grid
						item
						key={product.id}
						xs={12} // Ocupa 12 columnas en pantallas pequeñas
						sm={6} // Ocupa 6 columnas en pantallas medianas
						md={4} // Ocupa 4 columnas en pantallas grandes (3 columnas totales)
					>
						<Card sx={{ width: '100%', boxShadow: 3 }}>
							<CardMedia
								component='img'
								image='https://images.pexels.com/photos/2531608/pexels-photo-2531608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
								alt={product.Name}
							/>
							<CardContent>
								<Box sx={{ mb: 2 }}>
									<Typography variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>
										{product.name}
									</Typography>
									<Typography variant='body2' color='textSecondary'>
										{product.description}
									</Typography>
								</Box>
								<Box
									sx={{
										mb: 2,
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography
										variant='body2'
										sx={{ fontWeight: 'bold', fontSize: '17px' }}
									>
										Cantidad en stock: {product.quantity}
									</Typography>
									<Typography
										variant='body2'
										sx={{ fontWeight: 'bold', fontSize: '17px' }}
									>
										Precio: ${product.price}
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={() =>
											dispatch(decrementQuantity({ id: product.id }))
										}
									>
										<Icon path={mdiMinus} size={1} />
									</Button>
									<Typography variant='body2' sx={{ mx: 2 }}>
										{quantities[product.id]}
									</Typography>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={() =>
											dispatch(
												incrementQuantity({
													id: product.id,
													stock: product.quantity,
												}),
											)
										}
									>
										<Icon path={mdiPlus} size={1} />
									</Button>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '100%',
									}}
								>
									<Button
										variant='contained'
										color='primary'
										size='small'
										sx={{ width: '100%' }}
										onClick={() => handleAddToCart(product)}
									>
										<Icon path={mdiCartPlus} size={1} />
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};

export default ProductsComponent;
