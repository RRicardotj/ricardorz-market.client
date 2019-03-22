import React from 'react';

// import { Layout, Divider } from 'antd';

import Header from 'components/Header';
import Publicity from './Publicity';
import Footer from 'components/Footer';

import './Main.scss';

const Main = () =>
  (
    <div className="Main">
      <Header className="Main--header" />
      <Publicity className="Main--publicity" />
      <Footer className="Main--footer" />
    </div>
  );

export default Main;
