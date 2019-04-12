import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import './ShoppingCart__header.scss';

const Header = (props) => {
  const backToMain = () => {
    const { history } = props;
    history.push('/');
  };

  return (
    <div className="ShoppingCart__header">
      <div className="ShoppingCart__header--top">
        <Button onClick={props.payAll}>
          Pay All
        </Button>
        <Button onClick={backToMain}>
          Main
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Header);
