import React, { Component } from 'react';

import { Layout } from 'antd';

import Header from 'components/Header';

import './Main.scss';

const {
  Footer, Content,
} = Layout;

const Main = () =>
  (
    <Layout>
      <Header />
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );

export default Main;
