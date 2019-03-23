import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'antd';

import './HeaderBasic.scss';

const { Search } = Input;

const HeaderBasic = (props) => {
  const backToMain = () => {
    const { history } = props;
    history.push('/');
  };

  return (
    <div className="HeaderBasic">
      <div className="HeaderBasic--search">
        {
          props.isSearch
            && (
              <Search
                placeholder="Search product"
                size="large"
                onSearch={props.search}
              />
            )
        }
      </div>
      <div className="HeaderBasic--top">
        <Button onClick={backToMain}>
          Main
        </Button>
      </div>
    </div>
  );
};

export default withRouter(HeaderBasic);
