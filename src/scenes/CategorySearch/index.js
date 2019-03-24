import React, { Component } from 'react';

import CartContext from 'Context/CartContext';
import Search from 'components/Search';
import Header from 'components/HeaderBasic';
import CategoryService from 'services/CategoryService';

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
    const { categoryId } = this.props.match.params;

    this.search(categoryId);
  }

  setTitle = (value) => {
    const title = value ? `Searching products by: ${value} category` : 'Search by category';
    this.setState({ title });
  }

  goToPage = (page) => {
    this.search(this.state.searchBy, page);
  }

  addToCart = (product) => {
    console.log(product);
  }

  search = (categoryId, pageQuery = 1) => {
    CategoryService.getAllProductsByCategoryId(categoryId, pageQuery)
      .then(({ data }) => {
        const {
          rows, page, totalPages, total, categoryName,
        } = data;

        this.setState({
          items: rows,
          currentPage: page,
          totalPages,
          total,
          searchBy: categoryId,
        });
        this.setTitle(categoryName);
      });
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
