import React, { useEffect, useMemo, useState } from "react";

import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";

import moment from "moment";
import { toast } from "react-toastify";
import { useStore } from "../../hooks/useStore";
import { exportFromLocalStorage } from "../../utils/localStorage";
import { createNewOrderService } from "../../services/userService";
import { clearCartItem } from "../../Store/Actions";

const Cart = ({ setShowCart }) => {
  const [cartItem, setCartItem] = useState([]);
  const [state, dispatch] = useStore();
  const newDate = moment().subtract(10, "days").calendar();

  let cartData = exportFromLocalStorage("cartData");
  let userData = exportFromLocalStorage("userData");
  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setCartItem(cartData);
    } else setCartItem([]);
  }, [cartData.length]);

  const toTal = useMemo(() => {
    let result = "";
    if (cartData.length > 0) {
      result = cartData.reduce((result, item) => {
        let a = item.quantity;
        let b = item.product.price;
        return result + a * b;
      }, 0);
    } else {
      result = "";
    }
    return result;
  }, [cartData.length]);
  //Handel
  const handelSubmitOrder = async () => {
    let order = cartItem.map((item) => {
      let newItem = {
        price: item.product.price,
        productName: item.product.productName,
        date: newDate,
        productId: item.product.id,
        quantity: item.quantity,
        statusId: "S1",
        userId: userData.id,
        image: item.product.image,
      };
      return newItem;
    });
    console.log(order);
    // try {
    //   const res = await createNewOrderService(order);
    //   if (res && res.data.errCode === 0) {
    //     toast.success(res.data.message);
    //     setCartItem([]);
    //     dispatch(clearCartItem());
    //     window.location.reload();
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="cart-panel">
      <div className="opacity-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">Close</span>
          </span>
        </div>
        {cartItem && cartItem.length <= 0 && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart</span>
            <button
              className="return-to-shop"
              onClick={() => setShowCart(false)}
            >
              Return to Shop
            </button>
          </div>
        )}
        {cartItem && cartItem.length > 0 && (
          <>
            <CartItem data={cartItem} setCartItem={setCartItem} />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">SubTotal:</span>
                <span className="text total">{toTal}&#36;</span>
              </div>
              <div className="button">
                <button
                  className="checkout"
                  onClick={() => handelSubmitOrder()}
                >
                  Check out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
