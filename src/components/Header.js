/** @format */

import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	IconButton,
	Badge,
	Popover,
	Typography,
	List,
	Card,
	Box,
	Stack,
	Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';
import { fetchCartDetails } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';


const CustomPopover = styled(Popover)(({ theme }) => ({
	[`& .MuiPopover-paper`]: {
		width: 'calc(100% - 16px)', // Use full width minus padding to fit within the screen
		[theme.breakpoints.up('sm')]: {
			width: '30%', // 30% width on screens larger than 'sm'
		},
		maxWidth: '100%', // Ensure the popover does not exceed viewport width
		maxHeight: 400, // Adjust height as needed
		overflowY: 'auto', // Allow vertical scrolling
		padding: theme.spacing(2),
		boxSizing: 'border-box', // Ensure padding is included in width calculation
	},
}));

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items || []);
	const transactionDetails = useSelector((state) => state.cart.details || []);

	const [anchorEl, setAnchorEl] = useState(null);

	const loadCartDetails = useCallback(() => {
		dispatch(fetchCartDetails());
	}, [dispatch]);

	useEffect(() => {
		loadCartDetails();
	}, [loadCartDetails]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		loadCartDetails(); // Carga los detalles cuando el Popover se abre
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleButtonClick = () => {
        navigate('/paycar'); // Navegar a /paycar
    };

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<header>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant='h4'>ShopTest</Typography>
				<IconButton color='inherit' onClick={handleClick}>
					<Badge badgeContent={cartItems.length} color='error'>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
				<CustomPopover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<Box>
						<Typography variant='h6' gutterBottom>
							Detalles del Carrito
						</Typography>
						<List>
							{transactionDetails.length === 0 ? (
								<Typography variant='body1'>
									No hay productos en el carrito.
								</Typography>
							) : (
								transactionDetails.map((detail) => (
									<Card variant='outlined' sx={{ mb: 2 }} key={detail.id}>
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
								))
							)}
						</List>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							size='large'
							onClick={handleButtonClick}
						>
							Proceder a pagar
						</Button>
					</Box>
				</CustomPopover>
			</div>
		</header>
	);
};

export default Header;
