import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import GlobalContext from 'Context/GlobalContext';
import Main from './Main';
import CategorySearch from './CategorySearch';
import ProductSearch from './ProductSearch';
import ShoppingCart from './ShoppingCart';
import SignUp from './SignUp';
import SignIn from './SignIn';


const ProductDetail = () => (<div><h1>ProductDetail</h1></div>);

const Activated = (props) => {
  const { cartId, token } = queryString.parse(props.location.search);
  localStorage.setItem('cartId', cartId);
  localStorage.setItem('token', token);

  return <Redirect to="/" />;
};


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
          <Route path="/cart" component={ShoppingCart} exact />
          <Route path="/activated" component={Activated} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </GlobalContext>
  );

export default Scenes;
