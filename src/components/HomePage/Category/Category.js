import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Category.scss";

const Category = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);
  return (
    <div className="shop-by-category">
      <div className="categories">
        {isLoading && (
          <>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </>
        )}
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
