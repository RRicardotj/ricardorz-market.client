import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';

import CustomerService from 'services/CustomerService';

import CartContext from 'Context/CartContext';

// Styles
import './SignIn.scss';

class SignIn extends Component {
  static contextType = CartContext;

  state = {
    isProcessing: false,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const model = { ...values };
        this.setState({ isProcessing: true });

        CustomerService.signIn(model)
          .then(({ data }) => {
            console.log('signIn', data);
            const { token, shoppingCart, cartId } = data;
            this.context.signIn({ token, shoppingCart, cartId });
            const { history } = this.props;
            history.push('/');
          })
          .catch(() => this.setState({ isProcessing: false }));
      } else {
        this.setState({ isProcessing: false });
      }
    });
  }

  goToBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="SignIn">
        <div className="SignIn__form">
          <div
            className="SignIn__part SignIn__part--left"
            style={{
              backgroundImage: `url(${`${process.env.REACT_APP_API}/banners_image/people.jpg`})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h1 className="SignIn__part__title">
              <span className="SignIn__part__title--main">
                Ricardorz
              </span>
              <span className="SignIn__part__title--sub">
                Market
              </span>
            </h1>
          </div>
          <div className="SignIn__part SignIn__part--right">
            <h2 className="SignIn__part__title">Sign In</h2>
            <div className="SignIn__form--inputs">
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }],
                  })(<Input placeholder="Email" disabled={this.state.isProcessing} />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }, { validator: this.validateToNextPassword }],
                  })(<Input type="password" placeholder="Password" disabled={this.state.isProcessing} />)}
                </Form.Item>
                <div className="SignIn__form--inputs-action-submit">
                  <Button
                  // style={antButtonStyles}
                    disabled={this.state.isProcessing}
                    htmlType="submit"
                  >
                    <span>Sign In</span>
                  </Button>
                </div>
                <div className="SignIn__form--inputs-action-back">
                  <Button onClick={this.goToBack}>
                    <span>Cancel</span>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(SignIn);
