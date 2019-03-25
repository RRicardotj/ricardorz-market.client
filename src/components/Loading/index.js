import React from 'react';
// Components
import { Spin, Icon } from 'antd';
// Styles
import './Loading.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#DA674A' }} spin />;
const Loading = () => (
  <div className="Loading">
    <Spin indicator={antIcon} tip="Loading..." size="large" />
  </div>
);
export default Loading;
