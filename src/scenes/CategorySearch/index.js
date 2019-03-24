import React, { Component } from 'react';

import CartContext from 'Context/CartContext';
import Search from 'components/Search';
import Header from 'components/HeaderBasic';


import { withRouter } from 'react-router-dom';

import './CategorySearch.scss';

class CategorySearch extends Component {
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
    this.setTitle(value);
    this.search(value);
  }

  setTitle = (value) => {
    const title = value ? `Searching products by: ${value}` : 'Search by category';
    this.setState({ title });
  }

  goToPage = (page) => {
    this.search(this.state.searchBy, page);
  }

  addToCart = (product) => {
    console.log(product);
  }

  search = (value, pageQuery = 1) => {
    console.log(value, pageQuery);
  }


  render() {
    const {
      title, items, total, totalPages, currentPage,
    } = this.state;
    return (
      <div className="CategorySearch">
        <Header isCategorySearch search={value => (this.search(value))} />
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

export default withRouter(CategorySearch);
