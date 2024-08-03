/** @format */

// reducers/payCarReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	list: [],
	status: 'idle',
	error: null,
};

const TransactionOpen = createSlice({
	name: 'TransactionOpen',
	initialState,
	reducers: {
		setTransaction: (state, action) => {
			state.list = action.payload;
			state.status = 'succeeded';
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setTransaction, setStatus, setError } = TransactionOpen.actions;
export default TransactionOpen.reducer;
