import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalContext from 'Context/GlobalContext';

const Main = () => (<div><h1>Main</h1></div>);

const Search = () => (<div><h1>Search</h1></div>);

const ProductDetail = () => (<div><h1>ProductDetail</h1></div>);

const SignUp = () => (<div><h1>Register</h1></div>);

const SignIn = () => (<div><h1>Login</h1></div>);


const Scenes = () =>
  (
    <GlobalContext>
      <Router>
        <Switch>
          <Route path="/search" component={Search} exact />
          <Route path="/product" component={ProductDetail} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </GlobalContext>
  );

export default Scenes;
