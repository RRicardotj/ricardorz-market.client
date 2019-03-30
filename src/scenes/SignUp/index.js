import React, { Component } from 'react';

import { Form, Input, Select, Button } from 'antd';

import ShippingRegionService from 'services/ShippingRegionService';
import CustomerService from 'services/CustomerService';

import CartContext from 'Context/CartContext';

// Styles
import './SignUp.scss';

class SignUp extends Component {
  static contextType = CartContext;

  state = {
    isProcessing: false,
    shippingRegions: [],
  };

  componentDidMount() {
    ShippingRegionService.index()
      .then(({ data }) => {
        this.setState({ shippingRegions: data });
      });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const model = { ...values, cartId: this.context.cartId };
        this.setState({ isProcessing: true });

        CustomerService.signUp(model)
          .then(() => this.goToBack())
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
      <div className="SignUp">
        <div className="SignUp__form">
          <div
            className="SignUp__part SignUp__part--left"
            style={{
              backgroundImage: `url(${`${process.env.REACT_APP_API}/banners_image/people.jpg`})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h1 className="SignUp__part__title">
              <span className="SignUp__part__title--main">
                Ricardorz
              </span>
              <span className="SignUp__part__title--sub">
                Market
              </span>
            </h1>
          </div>
          <div className="SignUp__part SignUp__part--right">
            <h2 className="SignUp__part__title">Sign Up</h2>
            <div className="SignUp__form--inputs">
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your name!' }],
                  })(<Input placeholder="Name" disabled={this.state.isProcessing} />)}
                </Form.Item>
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
                <Form.Item>
                  {getFieldDecorator('confirm', {
                    rules: [{ required: true, message: 'Please confirm your password!' }, { validator: this.compareToFirstPassword }],
                  })(<Input type="password" placeholder="Confirm your pasword" disabled={this.state.isProcessing} onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('shippingRegionId', {
                    rules: [{ required: true, message: 'Select a shipping region!' }],
                  })((
                    <Select
                      disabled={this.state.isProcessing || !this.state.shippingRegions}
                      placeholder="Select shipping region"
                    >
                      {this.state.shippingRegions && this.state.shippingRegions.map(item =>
                        (
                          <Select.Option key={item.shippingRegionId} value={item.shippingRegionId}>
                            {item.shippingRegion}
                          </Select.Option>))}
                    </Select>
                  ))}
                </Form.Item>
                <div className="SignUp__form--inputs-action-submit">
                  <Button
                  // style={antButtonStyles}
                    disabled={this.state.isProcessing}
                    htmlType="submit"
                  >
                    <span>Sign Up</span>
                  </Button>
                </div>
                <div className="SignUp__form--inputs-action-back">
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
export default Form.create()(SignUp);
