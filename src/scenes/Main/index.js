import React from 'react';

// import { Layout, Divider } from 'antd';

import Header from 'components/Header';
import Publicity from './Publicity';

import './Main.scss';

const Main = () =>
  (
    <div className="Main">
      <Header />
      <Publicity />
    </div>
  );

export default Main;
