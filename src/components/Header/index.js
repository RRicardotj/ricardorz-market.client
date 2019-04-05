import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input, Icon, Badge, Menu, Dropdown } from 'antd';

import DepartmentService from 'services/DepartmentService';
import CartContext from 'Context/CartContext';

import './Header.scss';

const { Search } = Input;

class Header extends Component {
  state = {
    departments: [],
  }

  componentDidMount() {
    DepartmentService.getAllDepartmentsWithCategories()
      .then(({ data }) => {
        this.setState({ departments: data });
      });
  }

  search = (value) => {
    const { history } = this.props;
    history.push(`/search/${value}`);
  }

  goToSignUp = () => {
    const { history } = this.props;
    history.push('/signup');
  }

  goToSignIn = () => {
    const { history } = this.props;
    history.push('/signin');
  }

  searchCategory = (categoryId) => {
    const { history } = this.props;
    history.push(`/category_search/${categoryId}`);
  }

  render() {
    return (
      <CartContext.Consumer>
        { ({ shoppingCart, isAuthenticated }) => (
          <div
            className="Header"
          >
            <div className="Header--top">
              <h1 className="Header__title Header--top-title">
                <span className="Header__title--main">
                Ricardorz
                </span>
                <span className="Header__title--sub">
                Market
                </span>
              </h1>
              <div className="Header--top-actions">
                <Search
                  placeholder="Search product"
                  size="large"
                  onSearch={this.search}
                  className="Header--top-actions-search"
                />
                <div className="Header-search-hidden" >
                  <Link to="/search">
                    <Icon type="search" style={{ fontSize: '32px', color: '#FFAA67' }} />
                  </Link>
                </div>
                <Link to="/cart" className="Header--top-cart-link">
                  <Badge count={shoppingCart.length}>
                    <Icon type="shopping-cart" style={{ fontSize: '32px', color: '#FFAA67' }} />
                  </Badge>
                </Link>
                <Button
                // style={antButtonStyles}
                  disabled={isAuthenticated}
                  onClick={this.goToSignUp}
                >
                  <span>Sign Up</span>
                </Button>
                <Button onClick={this.goToSignIn}>
                  <span>
                    {
                    isAuthenticated ? 'Logout' : 'Sign In'
                  }
                  </span>
                </Button>
              </div>
            </div>
            <div className="Header--bottom">
              {
              this.state.departments.map((department) => {
                const menu = (
                  <Menu>
                    {
                      department.categories
                        .map(({ categoryId, name }) =>
                        (
                          <Menu.Item
                            key={categoryId}
                            onClick={() => (this.searchCategory(categoryId))}
                          >
                            {name}
                          </Menu.Item>
                        ))
                    }
                  </Menu>
                );
                return (
                  <Dropdown overlay={menu} key={department.departmentId}>
                    <span className="Header__dropdown">{department.name}</span>
                  </Dropdown>
                );
              })
            }
            </div>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

export default withRouter(Header);
