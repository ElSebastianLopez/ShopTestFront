/** @format */

// src/views/ProductPage.js
import React from 'react';
import PayCardComponent from '../components/payCarComponent';
import PayComponent from '../components/payComponent';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const CustomBox = styled(Box)(({ theme }) => ({
	height: '100vh',
	overflow: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
}));

const CustomGridItem = styled(Grid)(({ theme }) => ({
	padding: theme.spacing(2),
	boxSizing: 'border-box',
	overflowY: 'auto',
	backgroundColor: '#f5f5f5', // Color de fondo personalizado
	borderRadius: '8px', // Bordes redondeados
	boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Sombra de caja
	height: '100%', // Asegura que ocupe el 100% de la altura
	[theme.breakpoints.down('sm')]: {
		height: '60vh', // Altura del 60% en pantallas móviles
	},
	'&.pay-component': {
		[theme.breakpoints.down('sm')]: {
			height: '40vh', // Altura del 40% en pantallas móviles
			marginTop: theme.spacing(3), // Añade margen superior en pantallas móviles
		},
	},
}));

const PayCarPage = () => (
	<CustomBox>
		<Grid container sx={{ height: '100%' }}>
			<CustomGridItem item xs={12} md={6}>
				<PayCardComponent />
			</CustomGridItem>
			<CustomGridItem item xs={12} md={6} className='pay-component'>
				<PayComponent />
			</CustomGridItem>
		</Grid>
	</CustomBox>
);

export default PayCarPage;
