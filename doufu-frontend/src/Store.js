import { createContext, useReducer } from 'react';

// Use context to store state i.e. shopping cart
export const Store = createContext();

// Initial state
// JSON.parse converts string to JS object
const initState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const addedItem = action.payload;
      const itemExists = state.cart.cartItems.find(
        (item) => item._id === addedItem._id
      );
      const cartItems = itemExists
        ? state.cart.cartItems.map((item) =>
            item._id === itemExists._id ? addedItem : item
          )
        : [...state.cart.cartItems, addedItem];

      // Keep the items in the cart even when the page is refreshed,
      // convert cart items to string and save them in cartItems key
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // The key is defined as 'cartItems' above in initState
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    // ...state means keep the same state
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
