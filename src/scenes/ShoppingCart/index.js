import React, { Component } from 'react';
import { List } from 'antd';
import CartContext from 'Context/CartContext';

import Header from './Header';
import Product from './Product';

import './ShoppingCart.scss';

class ShoppingCart extends Component {
  static contextType = CartContext;

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

  payAll = () => (console.log('payAll'));

  updateQuantity = (itemId, value) => {
    console.log('Change quantity for', itemId, value);
    this.context.updateShoppingCartProduct(itemId, { quantity: value });
  }

  updateColor = (itemId, attributeValueId) => {
    console.log('Change color for', itemId, attributeValueId);
    this.context.updateShoppingCartProduct(itemId, { color: attributeValueId });
  }

  updateSize = (itemId, attributeValueId) => {
    console.log('Change size for', itemId, attributeValueId);
    this.context.updateShoppingCartProduct(itemId, { size: attributeValueId });
  }

  render() {
    return (
      <CartContext.Consumer>
        {({ shoppingCart }) => (
          (
            <div className="ShoppingCart">
              <Header payAll={this.payAll} />
              <div className="ShoppingCart--content">
                <List
                  size="large"
                  header={
                    <div className="ShoppingCart--title">
                      <span>{shoppingCart.length} Items in shopping cart</span>
                      <span>{shoppingCart.length && this.price()}</span>
                    </div>
                  }
                  footer={
                    <div className="ShoppingCart--title">
                      <span>{shoppingCart.length} Items in shopping cart</span>
                    </div>
                  }
                  bordered
                  dataSource={shoppingCart}
                  renderItem={item => (
                    <List.Item key={item.itemId} >
                      <Product
                        item={item}
                        onUpdateQuantity={this.updateQuantity}
                        onUpdateColor={this.updateColor}
                        onUpdateSize={this.updateSize}
                      />
                    </List.Item>)}
                />
              </div>
            </div>
          )
        )}
      </CartContext.Consumer>
    );
  }
}

export default ShoppingCart;
