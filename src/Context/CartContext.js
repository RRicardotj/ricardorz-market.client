import React from 'react';

export default React.createContext({
  shoppingCart: [],
  cartId: null,
  isAuthenticated: null,
  addToCart: () => {},
  setCart: () => {},
  removeFromCart: () => {},
  logout: () => {},
  signIn: () => {},
});
