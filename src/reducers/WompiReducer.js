/** @format */

// reducers/payCarReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	list: [],
	status: 'idle',
	error: null,
};

const WompiReducers = createSlice({
	name: 'WompiReducers',
	initialState,
	reducers: {
		setmerchant_details: (state, action) => {
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

export const { setmerchant_details, setStatus, setError } =
	WompiReducers.actions;
export default WompiReducers.reducer;
