import React, { useEffect, useState } from "react";

import "./Products.scss";
import Product from "./Product/Product";
import Pagination from "./Pagination/Pagination";

const Products = ({ heading, data }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    const lastPost = currentPage * postPerPage;
    const firstPost = lastPost - postPerPage;
    const newData = data.slice(firstPost, lastPost);
    setProducts(newData);
  }, [data]);
  useEffect(() => {
    const lastPost = currentPage * postPerPage;
    const firstPost = lastPost - postPerPage;
    const newData = data.slice(firstPost, lastPost);
    setProducts(newData);
  }, [currentPage]);
  return (
    <div className="products-container">
      <div className="sec-heading">{heading ? heading : "Section Heading"}</div>
      <div className="products">
        {isLoading && (
          <>
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          </>
        )}
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
            return <Product data={item} key={index} />;
          })}
      </div>
      <Pagination
        data={data}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;
