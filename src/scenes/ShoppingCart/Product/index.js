import React from 'react';

import { Radio, InputNumber, Button } from 'antd';

import './ShoppingCart__product.scss';

const RadioGroup = Radio.Group;

const colorsStyles = {
  display: 'inline-block',
  width: '3em',
  height: '1.5em',
  transform: 'translateY(5px)',
  borderRadius: '10px',
  borderStyle: 'solid',
  borderWidth: '1px',
};

const Product = ({ item }) => (
  <div className="ShoppingCart__product">
    <img className="ShoppingCart__product__image" src={item.product.image} alt="t-shirt" />
    <div className="ShoppingCart__product__details">
      <p className="ShoppingCart__product__details--title">
        {item.product.name}
      </p>
      <div className="ShoppingCart__product__details--detail">
        <span>Price:</span>
        <span className={item.product.discountedPrice ? 'ShoppingCart__product__details--price-strikethrough' : 'ShoppingCart__product__details--price'}>
          ${item.product.price}
        </span>
        {
            item.product.discountedPrice
              && <span className="ShoppingCart__product__details--price"> / ${item.product.discountedPrice}</span>
          }
      </div>
      <div className="ShoppingCart__product__details--detail">
        <span>Color:</span>
        <RadioGroup
          name="color"
          defaultValue={
              item.attributes.colorSelected
                ? item.attributes.colorSelected.attributeValueId : undefined
            }
        >
          {
              item.colorsAvailable.map(({ attributeValueId, value }) => (
                <Radio value={attributeValueId}>
                  <div style={{
                    ...colorsStyles, backgroundColor: value.toLowerCase(),
                  }}
                  />
                </Radio>
              ))
            }
        </RadioGroup>
      </div>
      <div className="ShoppingCart__product__details--detail">
        <span>Size:</span>
        <RadioGroup
          name="size"
          defaultValue={
              item.attributes.sizeSelected
                ? item.attributes.sizeSelected.attributeValueId : undefined
            }
        >
          {
              item.sizeAvailable.map(({ attributeValueId, value }) => (
                <Radio value={attributeValueId}>
                  {
                    value
                  }
                </Radio>
              ))
            }
        </RadioGroup>
      </div>
      <div className="ShoppingCart__product__details--detail">
        <span>Quantity:</span>
        <InputNumber min={1} defaultValue={item.quantity} />
      </div>
      <div className="ShoppingCart__product__details--detail">
        <Button>Remove it</Button>
        <Button>Pay it</Button>
      </div>
    </div>
  </div>
);

export default Product;
