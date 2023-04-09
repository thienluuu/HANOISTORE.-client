import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import "./Search.scss";
import { MdClose } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { searchProductService } from "../../../services/userService";
import { useDebounce } from "../../../hooks/useDebounce";
import { toast } from "react-toastify";

const Search = ({ setShowSearch }) => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceValue = useDebounce(searchInput, 2000);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const res = await searchProductService(debounceValue);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setProducts(res.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchProduct();
  }, [debounceValue]);

  const onChangeInput = (e) => {
    setIsLoading(true);
    let searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    if (searchValue) {
      searchValue = searchValue.toLowerCase();
    }
    setSearchInput(searchValue);
  };
  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          className=""
          autoFocus
          placeholder="Search for products"
          onChange={(e) => onChangeInput(e)}
        />
        {isLoading && (
          <div className="loading-icon">
            <BiLoaderCircle />
          </div>
        )}
        <MdClose className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {products &&
            products.length > 0 &&
            products.map((item, index) => {
              return (
                <div className="search-result-item" key={index}>
                  <div className="img-container">
                    <img src={item.image} alt="" />
                  </div>
                  <Link
                    className="product-detail"
                    to={`/product/${item.id}`}
                    onClick={() => setShowSearch(false)}
                  >
                    <span className="name">{item.productName}</span>
                    <span className="desc">{item.description}</span>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Search;
