import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Category.scss";

const Category = ({ data }) => {
  return (
    <div className="shop-by-category" >
      <div className="categories">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Link
                className="category"
                key={index}
                to={`/category/${item.productType}`}
              >
                <img src={item.image} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Category;
