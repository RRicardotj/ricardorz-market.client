import React, { Component } from 'react';
import { Carousel, Card } from 'antd';

import ProductService from 'services/ProductService';

import './Publicity.scss';


const { Meta } = Card;

class Publicity extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    ProductService.getProductsMain()
      .then(({ data }) => {
        this.setState({ products: data });
      });
  }

  render() {
    return (
      <div className="Publicity">
        <Carousel style={{ width: '100%' }} autoplay>
          <div className="Publicity__corousel-item">
            <div className="Publicity__corousel-item--message">
              <p>Find all your products, easy and faster</p>
            </div>
            <img src={`${process.env.REACT_APP_API}/banners_image/people.jpg`} alt="people happy" />
          </div>
          <div className="Publicity__corousel-item" >
            <div className="Publicity__corousel-item--message">
              <p>Always open for you</p>
            </div>
            <img src={`${process.env.REACT_APP_API}/banners_image/open.jpg`} alt="always open" />
          </div>
          <div className="Publicity__corousel-item" >
            <div className="Publicity__corousel-item--message">
              <p>Enjoy the art of giving gifts to your loved ones</p>
            </div>
            <img src={`${process.env.REACT_APP_API}/banners_image/gift.jpg`} alt="send gifts" />
          </div>
        </Carousel>
        {/* Productos publicity */}
        <div className="Publicity__products--title">
          <h2>Some of our products</h2>
        </div>
        <div className="Publicity__products">
          {
            this.state.products.map(product => (
              <div className="Publicity__products--item" key={product.productId} >
                <Card
                  style={{ width: 240, marginRight: 'auto', marginLeft: 'auto' }}
                  cover={<img src={product.image} alt={product.name} />}
                >
                  <Meta
                    title={product.name}
                    description={product.description}
                  />
                </Card>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Publicity;
