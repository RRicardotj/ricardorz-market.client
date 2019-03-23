import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalContext from 'Context/GlobalContext';
import Main from './Main';
import ProductSearch from './ProductSearch';
// const Main = () => (<div><h1>Main</h1></div>);


const Search = () => (<div><h1>Search global</h1></div>);

const ProductDetail = () => (<div><h1>ProductDetail</h1></div>);

const SignUp = () => (<div><h1>Register</h1></div>);

const SignIn = () => (<div><h1>Login</h1></div>);

const ShopingCart = () => (<div><h1>ShopingCart</h1></div>);

const CategorySearch = (props) => {
  const { categoryId } = props.match.params;
  return (
    <div><h1>{`You are searching: ${categoryId}`}</h1></div>
  );
};

const Scenes = () =>
  (
    <GlobalContext>
      <Router>
        <Switch>
          <Route path="/search" component={Search} exact />
          <Route path="/search/:value" component={ProductSearch} exact />
          <Route path="/category_search/:categoryId" component={CategorySearch} />
          <Route path="/product" component={ProductDetail} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/cart" component={ShopingCart} exact />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </GlobalContext>
  );

export default Scenes;
