import { createContext, useReducer } from 'react';

// Use context to store state i.e. shopping cart
export const Store = createContext();

// Initial state
const initState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        // ...state means keep the same state
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(params) {
  const [state, dispatch] = useReducer(reducer, initState);
  // value holds current state and a dispatch to update the state
  const value = { state, dispatch };
  return <Store.Provider value={value}>{params.children}</Store.Provider>;
}
