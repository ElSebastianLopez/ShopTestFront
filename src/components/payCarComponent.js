/** @format */

// components/PayCardComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsDet } from '../actions/payCarActions';

import { Typography, Card, Box, Stack, Divider } from '@mui/material';

const PayCardComponent = () => {
	const dispatch = useDispatch();
	const transactions = useSelector((state) => state.payCar.list);
	const status = useSelector((state) => state.payCar.status);
	const error = useSelector((state) => state.payCar.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTransactionsDet());
		}
	}, [dispatch, status]);

	let content;

	if (status === 'loading') {
		content = <Typography variant='body1'>Loading...</Typography>;
	} else if (status === 'succeeded') {
		console.log(transactions);
		content = (
			<Box
				sx={{
					width: '100%',
					maxWidth: 400,
					overflowY: 'auto',
					p: 2,
					boxSizing: 'border-box', // Ensure padding is included in width calculation
				}}
			>
				{transactions.length === 0 ? (
					<Typography variant='body1'>
						No hay productos en el carrito.
					</Typography>
				) : (
					transactions.map((detail) => (
						<React.Fragment key={detail.id}>
							<Card variant='outlined' sx={{ mb: 2 }}>
								<Box sx={{ p: 2 }}>
									<Stack
										direction='row'
										justifyContent='space-between'
										alignItems='center'
									>
										<Typography gutterBottom variant='h6' component='div'>
											{detail.products?.name || 'Producto desconocido'}
										</Typography>
										<Typography gutterBottom variant='h6' component='div'>
											${detail.price}
										</Typography>
									</Stack>
									<Typography
										color='text.secondary'
										variant='body2'
										gutterBottom
									>
										{detail.products?.description ||
											'Descripción no disponible'}
									</Typography>
									<Typography gutterBottom variant='h6' component='div'>
										Cantidad: {detail.quantity}
									</Typography>
								</Box>
							</Card>
							<Divider />
						</React.Fragment>
					))
				)}
			</Box>
		);
	} else if (status === 'failed') {
		content = <Typography variant='body1'>{error}</Typography>;
	}

	return <div>{content}</div>;
};

export default PayCardComponent;
