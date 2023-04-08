import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Category.scss";
import Products from "../Products/Products";
import { toast } from "react-toastify";
import { getProductByCategoryService } from "../../services/userService";

const Category = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const { id } = params;
    const getProductByCategory = async () => {
      try {
        const res = await getProductByCategoryService(id);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setProducts(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductByCategory();
  }, []);
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">Category Title</div>
        <Products data={products} />
      </div>
    </div>
  );
};

export default Category;
