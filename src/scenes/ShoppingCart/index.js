import React, { Component } from 'react';
import { List } from 'antd';
import CartContext from 'Context/CartContext';

import Header from './Header';
import Product from './Product';

import './ShoppingCart.scss';

class ShoppingCart extends Component {
  static contextType = CartContext;

  payAll = () => {
    console.log('payAll');
  }

  price = () => {
    let { total } = this.context.shoppingCart.reduce((prev, current) => {
      let { price, discountedPrice } = current.product;
      price = Number(price);
      discountedPrice = Number(discountedPrice);
      prev.total += discountedPrice || price;
      return prev;
    }, { total: 0 });

    total = total.toFixed(2);

    return `$ ${total}`;
  }

  componentDidMount() {
    this.setProducts(this.context.shoppingCart);
  }

  setProducts = (products) => {
    this.setState(products);
  };

  render() {
    return (
      <div className="ShoppingCart">
        <Header payAll={this.payAll} />
        <div className="ShoppingCart--content">
          <List
            size="large"
            header={
              <div className="ShoppingCart--title">
                <span>{this.context.shoppingCart.length} Items in shopping cart</span>
                <span>{this.context.shoppingCart.length && this.price()}</span>
              </div>
            }
            footer={
              <div className="ShoppingCart--title">
                <span>{this.context.shoppingCart.length} Items in shopping cart</span>
              </div>
            }
            bordered
            dataSource={this.context.shoppingCart}
            renderItem={item => (<List.Item key={item.itemId} ><Product item={item} /></List.Item>)}
          />
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
