import React from "react";

import "./Product.scss";

import { useNavigate } from "react-router-dom";
const Product = ({ data }) => {
  const history = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() => history(`/product/${data.id}`)}
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
