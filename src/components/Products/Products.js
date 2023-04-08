import React, { useEffect, useState } from "react";

import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ heading, data }) => {
  return (
    <div className="products-container">
      <div className="sec-heading">{heading ? heading : "Section Heading"}</div>
      <div className="products">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <Product data={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Products;
