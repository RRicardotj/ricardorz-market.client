import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import GlobalContext from 'Context/GlobalContext';
import Main from './Main';
import CategorySearch from './CategorySearch';
import ProductSearch from './ProductSearch';
import SignUp from './SignUp';


const ProductDetail = () => (<div><h1>ProductDetail</h1></div>);

const Activated = (props) => {
  const { cartId, token } = queryString.parse(props.location.search);
  localStorage.setItem('cartId', cartId);
  localStorage.setItem('token', token);

  return <Redirect to="/" />;
};

const SignIn = () => (<div><h1>Login</h1></div>);

const ShopingCart = () => (<div><h1>ShopingCart</h1></div>);


const Scenes = props =>
  (
    <GlobalContext authenticate={props.authenticate} isAuthenticated={props.isAuthenticated}>
      <Router>
        <Switch>
          <Route path="/search" component={ProductSearch} exact />
          <Route path="/search/:value" component={ProductSearch} exact />
          <Route path="/category_search/:categoryId" component={CategorySearch} />
          <Route path="/product" component={ProductDetail} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/cart" component={ShopingCart} exact />
          <Route path="/activated" component={Activated} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </GlobalContext>
  );

export default Scenes;
