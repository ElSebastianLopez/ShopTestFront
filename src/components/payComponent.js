/** @format */

// components/OutlinedCard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { fetchmerchant_details } from '../actions/WompiActions';
import { fetchTransaction } from '../actions/TransactionOpenActions';

const OutlinedCard = () => {
	const dispatch = useDispatch();
	const transaction = useSelector((state) => state.TransactionOpen.list);
	const status = useSelector((state) => state.TransactionOpen.status);
	const error = useSelector((state) => state.TransactionOpen.error);
	const merchant = useSelector((state) => state.Wompi.list);
	const [checked, setChecked] = React.useState(false);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTransaction());
			dispatch(fetchmerchant_details());
		}
	}, [dispatch, status]);

	const handleCheckboxChange = (event) => {
		setChecked(event.target.checked);
	};

	let content;

	if (status === 'loading') {
		content = <Typography variant='body1'>Loading...</Typography>;
	} else if (status === 'succeeded') {
		const termsLink = merchant?.data?.presigned_acceptance?.permalink;
		content = (
			<React.Fragment>
				<CardContent>
					<Typography sx={{ fontSize: 24 }} color='text.primary' gutterBottom>
						Resumen del pedido
					</Typography>
				</CardContent>
				<CardActions>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox checked={checked} onChange={handleCheckboxChange} />
								}
								label={
									<span>
										Acepto haber leído los{' '}
										{termsLink ? (
											<Link href={termsLink} target='_blank' rel='noopener'>
												términos y condiciones y la política de privacidad
											</Link>
										) : (
											'términos y condiciones y la política de privacidad'
										)}{' '}
										para hacer esta compra.
									</span>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant='contained'
								color='primary'
								disabled={!checked}
								fullWidth
								size='large'
							>
								Pagar COP ${transaction.total_amount}
							</Button>
						</Grid>
					</Grid>
				</CardActions>
			</React.Fragment>
		);
	} else if (status === 'failed') {
		content = <Typography variant='body1'>{error}</Typography>;
	}

	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant='outlined'>{content}</Card>
		</Box>
	);
};

export default OutlinedCard;
