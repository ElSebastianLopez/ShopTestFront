import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  quantities: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
      state.status = 'succeeded';
      const quantities = {};
      action.payload.forEach(product => {
        quantities[product.id] = 1;
      });
      state.quantities = quantities;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    incrementQuantity: (state, action) => {
      const { id, stock } = action.payload;
      if (state.quantities[id] < stock) {
        state.quantities[id] += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      if (state.quantities[id] > 1) {
        state.quantities[id] -= 1;
      }
    },
  }
});

export const { setProducts, setStatus, setError, incrementQuantity, decrementQuantity } = productsSlice.actions;

export default productsSlice.reducer;
