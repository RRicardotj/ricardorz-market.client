import React from 'react';

import { withRouter } from 'react-router-dom';
import { Divider, Table, Pagination, Button } from 'antd';

import './Search.scss';

const Search = (props) => {
  const {
    title,
    items,
    totalPages,
    total,
    currentPage,
  } = props;

  const addToCart = product => (console.log('ADD TO CART: ', product));

  const changePage = (page) => {
    if (page <= totalPages) {
      props.goToPage(page);
    }
  };

  const columns = [
    {
      title: '#', dataIndex: 'thumbnail', key: 'thumbnail', render: product => <img src={product} alt="ProductImage" style={{ width: '50px' }} />,
    },
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    {
      title: '', align: 'center', dataIndex: '', key: 'x', render: product => <Button onChange={() => { addToCart(product); }}>Add to cart</Button>,
    },
  ];

  const data = !items || items.length === 0 ? [] : items.map((item) => {
    const {
      productId,
      name,
      description,
      price,
      discountedPrice,
      thumbnail,
    } = item;

    const p = Number(price) > Number(discountedPrice) ? Number(discountedPrice) : Number(price);

    return {
      key: productId, name, description, thumbnail, price: p,
    };
  });

  return (
    <div className="Search">
      <div className="Search__header">
        <h2 className="Search__header--title">{title}</h2>
        <div className="Search__header--actions">
          <Pagination size="small" total={total} current={currentPage} onChange={changePage} />
        </div>
      </div>
      <Divider />
      <Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }} >{record.description}</p>}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default withRouter(Search);
