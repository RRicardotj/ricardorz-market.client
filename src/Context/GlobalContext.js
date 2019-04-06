import React, { Component } from 'react';

import CartContext from './CartContext';

// Services
import CostumerService from 'services/CustomerService';
import CartService from 'services/CartService';
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
      shoppingCart: [],
      cartId: null,
      isAuthenticated: props.isAuthenticated,
    };
  }

  componentDidMount() {
    if (localStorage.cartId) {
      CartService.getShoppingcartByCartId(localStorage.cartId)
        .then(({ data }) => {
          const { cartId, shoppingCart } = data;
          localStorage.setItem('cartId', cartId);

          this.setCart(shoppingCart, cartId);
        }).catch(() => {
          this.clearContex({ shoppingCart: [], cartId: null });
        });
    }

    if (localStorage.token) {
      CostumerService.check()
        .then(({ data }) => {
          console.log('validate token', data.isValid);
          if (!data.isValid) {
            localStorage.removeItem('token');
          }

          this.props.authenticate(data.isValid);
          this.setState({
            cartId: data.cartId, shoppingCart: data.shoppingCart, isAuthenticated: data.isValid,
          });
        })
        .catch(() => {
          console.log('Invalid token');
          localStorage.removeItem('token');
          this.props.authenticate(false);
        });
    }
  }

  setCart = (shoppingCart, cartId) => {
    if (!cartId) {
      localStorage.removeItem('cartId', cartId);
    } else {
      localStorage.setItem('cartId', cartId);
    }
    this.setState({ shoppingCart, cartId });
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cartId');
    this.props.authenticate(false);
    this.setState({
      shoppingCart: [],
      cartId: null,
      isAuthenticated: false,
    });
  }

  signIn = ({ token, shoppingCart, cartId }) => {
    console.log(token, shoppingCart, cartId);
    localStorage.setItem('token', token);
    localStorage.setItem('cartId', cartId);
    this.props.authenticate(true);
    this.setState({
      shoppingCart,
      cartId,
      isAuthenticated: true,
    });
  }

  addToCart = (product, { quantity, attributes }) => {
    CartService.addProduct(product, { quantity, attributes }, this.state.cartId)
      .then(({ data }) => {
        this.setCart(data.shoppingCart, data.cartId);
      }).catch(() => (this.setCart([], null)));
  }

  removeFromCart = (productId) => {
    const shoppingCart = this.state.shoppingCart
      .filter(product => (product.product_id !== productId));
    this.setState({ shoppingCart });
  }

  clearContex = ({ shoppingCart, cartId, isAuthenticated }) => {
    if (!cartId) {
      localStorage.removeItem('cartId', cartId);
    } else {
      localStorage.setItem('cartId', cartId);
    }
    this.setState({ shoppingCart, cartId, isAuthenticated });
  }

  render() {
    console.log('Render gContext', this.state.shoppingCart);
    return (
      <CartContext.Provider
        value={{
          shoppingCart: this.state.shoppingCart,
          cartId: this.state.cartId,
          isAuthenticated: this.state.isAuthenticated,
          addToCart: this.addToCart,
          setCart: this.setCart,
          removeFromCart: this.removeFromCart,
          logout: this.logout,
          signIn: this.signIn,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
