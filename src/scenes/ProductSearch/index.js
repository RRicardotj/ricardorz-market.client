import React, { Component } from 'react';

import CartContext from 'Context/CartContext';
import Search from 'components/Search';
import Header from 'components/HeaderBasic';
import ProductService from 'services/ProductService';

import { withRouter } from 'react-router-dom';

import './ProductSearch.scss';

class ProductSearch extends Component {
  static contextType = CartContext;

  state = {
    title: '',
    items: [],
    total: 0,
    totalPages: 0,
    currentPage: 0,
    searchBy: null,
  }

  componentDidMount() {
    const { value } = this.props.match.params;
    console.log(value);
    this.setTitle(`Searching products by: ${value}`);
    this.search(value);
  }

  setTitle = (title) => {
    this.setState({ title });
  }

  goToPage = (page) => {
    this.search(this.state.searchBy, page);
  }

  addToCart = (product) => {
    console.log(product);
  }

  search = (value, pageQuery = 1) => {
    ProductService.search({ name: value, page: pageQuery })
      .then(({ data }) => {
        const {
          rows, page, totalPages, total,
        } = data;

        this.setState({
          items: rows,
          currentPage: page,
          totalPages,
          total,
          searchBy: value,
        });
      });
  }

  render() {
    const {
      title, items, total, totalPages, currentPage,
    } = this.state;
    return (
      <div className="ProductSearch">
        <Header isSearch />
        <Search
          title={title}
          items={items}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={this.goToPage}
          addToCart={this.addToCart}
        />
      </div>
    );
  }
}

export default withRouter(ProductSearch);
