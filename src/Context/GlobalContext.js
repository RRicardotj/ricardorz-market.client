import React, { Component } from 'react';

import CartContext from './CartContext';
/*
  cartItem example = {
    item_id,
    cart_id,
    product: { product_id, name, price, discounted_price, thumbnail },
    attributes,
    buy_now, // this is for is not already buyed today for customer
    added_on,
  }

*/
export default class GlobalContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      cartId: null,
      isAuthenticated: props.isAuthenticated,
    };
  }

  setCart(cart, cartId) {
    this.setState({ cart, cartId });
  }

  addToCart = (product) => {
    const cart = [...this.state.cart];

    cart.push(product);
    this.setState({ cart });
  }

  removeFromCart = (productId) => {
    const cart = this.state.cart.filter(product => (product.product_id !== productId));
    this.setState({ cart });
  }

  clearContex = ({ cart, cartId, isAuthenticated }) => {
    this.setState({ cart, cartId, isAuthenticated });
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          cartId: this.state.cartId,
          isAuthenticated: this.state.isAuthenticated,
          addToCart: this.addToCart,
          setCart: this.setCart,
          removeFromCart: this.removeFromCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
