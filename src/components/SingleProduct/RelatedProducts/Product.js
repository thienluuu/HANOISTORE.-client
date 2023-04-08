import React from "react";

import "./Product.scss";
const Product = ({ data, setProduct }) => {
  return (
    <div
      className="product-card"
      onClick={() => {
        setProduct(data);
        window.scrollTo(0, 0);
      }}
    >
      <div className="thumbnail">
        <img src={data.image} alt="" />
      </div>
      <div className="product-detail">
        <div className="name">{data.productName}</div>
        <div className="price">Price: {data.price}&#36;</div>
      </div>
    </div>
  );
};

export default Product;
