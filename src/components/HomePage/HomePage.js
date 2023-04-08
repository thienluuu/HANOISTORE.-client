import React, { useState, useEffect } from "react";

import "./HomePage.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { useStore } from "../../hooks/useStore";
import {
  getAllProductService,
  getAllCategoryService,
} from "../../services/adminService";
import { getAllProductSuccess } from "../../Store";
import { toast } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [state, dispatch] = useStore();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await getAllProductService("ALL");
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setProducts(res.data.data);
          dispatch(getAllProductSuccess(res.data.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();

    const getAllCategory = async () => {
      try {
        const res = await getAllCategoryService();
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setCategory(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);
  return (
    <div className="home">
      <Banner />
      <div className="main-content" id="products-section">
        <div className="layout">
          <Category data={category} />
          <Products data={products} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
