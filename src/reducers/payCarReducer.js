// reducers/payCarReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const payCarSlice = createSlice({
  name: 'payCar',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.list = action.payload;
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { setTransactions, setStatus, setError } = payCarSlice.actions;
export default payCarSlice.reducer;
