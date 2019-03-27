import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input, Menu, Badge, Dropdown, Icon } from 'antd';
import DepartmentService from 'services/DepartmentService';
import CartContext from 'Context/CartContext';

import './HeaderBasic.scss';

const { Search } = Input;

class HeaderBasic extends Component {
  state = {
    departments: [],
  }

  componentDidMount() {
    if (this.props.isCategorySearch) {
      DepartmentService.getAllDepartmentsWithCategories()
        .then(({ data }) => {
          this.setState({ departments: data });
        });
    }
  }

  backToMain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <CartContext.Consumer>
        { ({ shoppingCart }) => (

          <div className="HeaderBasic">
            <div className="HeaderBasic--search">
              {
          this.props.isSearch
            && (
              <Search
                placeholder="Search product"
                size="large"
                onSearch={this.props.search}
              />
            )
        }
              {
          this.props.isCategorySearch
            && (
              <div className="HeaderBasic--bottom">
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
                                onClick={() => (this.props.search(categoryId))}
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
            )
        }
            </div>
            <div className="HeaderBasic--top">
              <Link to="/cart" className="Header--top-cart-link">
                <Badge count={shoppingCart.length}>
                  <Icon type="shopping-cart" style={{ fontSize: '32px', color: '#FFAA67' }} />
                </Badge>
              </Link>
              <Button onClick={this.backToMain}>
                Main
              </Button>
            </div>
          </div>
        ) }
      </CartContext.Consumer>
    );
  }
}

export default withRouter(HeaderBasic);
