import React, { useState } from "react";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { useStore } from "../../../hooks/useStore";
import { removeItemFromCart } from "../../../Store/Actions";

const CartItem = ({ data, setCartItem }) => {
  const [state, dispatch] = useStore();

  return (
    <div className="cart-products">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          let name = item.product.productName;
          let image = item.product.image;
          let price = item.product.price;
          return (
            <div className="cart-product" key={index}>
              <div className="img-container">
                <img src={image} alt="" />
              </div>
              <div className="product-detail">
                <span className="name">{name}</span>
                <MdClose
                  className="close-icon"
                  onClick={() => {
                    setCartItem((pre) => pre.splice(index, 1));
                    dispatch(removeItemFromCart(index));
                  }}
                />
                <div className="quantity-btns">
                  <span>-</span>
                  <span>{item.quantity}</span>
                  <span>+</span>
                </div>
                <div className="text">
                  <span>{item.quantity}</span>
                  <span>x</span>
                  <span className="highlight">{price}&#36;</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartItem;
