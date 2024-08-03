// src/reducers/cartReducer.js
import {
    FETCH_CART_DETAILS_REQUEST,
    FETCH_CART_DETAILS_SUCCESS,
    FETCH_CART_DETAILS_FAILURE,
  } from '../actions/cartActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    details: [], // Cambiado a un array para manejar una lista de detalles
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CART_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          details: action.payload, // Ajustado para manejar una lista de detalles
        };
      case FETCH_CART_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  