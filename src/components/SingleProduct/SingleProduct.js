import React, { useState, useEffect } from "react";

import "./SingleProduct.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProductByIdService,
  getRelatedProductService,
} from "../../services/userService";
import Product from "./RelatedProducts/Product";
import { exportFromLocalStorage } from "../../utils/localStorage";
import { useStore } from "../../hooks/useStore";
import { saveCartItem } from "../../Store/Actions";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [state, dispatch] = useStore();

  const params = useParams();
  const { id } = params;
  const history = useNavigate();

  const userData = exportFromLocalStorage("userData");
  useEffect(() => {
    window.scrollTo(0, 0);
    const getProductById = async () => {
      try {
        const res = await getProductByIdService(id);
        const productData = res.data.data;
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setProduct(productData);
          getRelatedProduct(id, productData.productType);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
    const getRelatedProduct = async (id, productType) => {
      try {
        const data = {
          id: id,
          productType: productType,
        };
        const res = await getRelatedProductService(data);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          setRelatedProduct(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [id]);
  //handle
  const handleQuantity = (id) => {
    if (id === "down") {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity((pre) => pre - 1);
      }
    } else {
      setQuantity((pre) => pre + 1);
    }
  };
  const addItemToCart = () => {
    if (!userData) {
      history("/login");
    } else {
      let data = { quantity: quantity, product: product };
      setQuantity(1);
      dispatch(saveCartItem(data));
    }
  };
  return (
    <div className="single-product-main-container">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={product.image} alt="" />
          </div>
          <div className="right">
            <span className="name">{product.productName}</span>
            <span className="price">Price: {product.price}&#36;</span>
            <span className="desc">{product.description}</span>

            <div className="cart-btns">
              <div className="quantity-btns">
                <span onClick={() => handleQuantity("down")}>-</span>
                <span>{quantity}</span>
                <span onClick={() => handleQuantity("up")}>+</span>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => addItemToCart()}
              >
                <FaCartPlus size={20} />
                Add to card
              </button>
            </div>
            <span className="divider"></span>

            <div className="info-item">
              <span className="text-bold">
                Category:
                <span>
                  {product.categoryData && product.categoryData.name
                    ? product.categoryData.name
                    : ""}
                </span>
              </span>
              <span className="text-bold">
                Share:
                <span>
                  <FaFacebookF size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                  <FaTwitter size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="related-products">
          <div className="products-container">
            <div className="sec-heading">Related Products</div>
            <div className="products">
              {relatedProduct &&
                relatedProduct.length > 0 &&
                relatedProduct.map((item, index) => {
                  return (
                    <Product data={item} key={index} setProduct={setProduct} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
