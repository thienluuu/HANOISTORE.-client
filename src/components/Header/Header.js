import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import Chat from "./Chat/Chat";
import SingleChat from "./Chat/SingleChat";

import { TbSearch, TbBrandMessenger } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import {
  exportFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { useStore } from "../../hooks/useStore";
import { logout } from "../../Store/Actions";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  getNewOrderService,
  getShippingOrderService,
  confirmShippedOrderService,
  deleteNewOrderService,
  getUserDataService,
} from "../../services/userService";
import {
  getNewOrderByUserSuccess,
  getShippingOrderByUserSuccess,
  deleteNewOrderByUserSuccess,
  confirmShippingOrderByUserSuccess,
} from "../../Store";
import { toast } from "react-toastify";

const Header = () => {
  //State
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [state, dispatch] = useStore();
  const [quantity, setQuantity] = useState("");
  const [users, setUsers] = useState([]);
  const [userChat, setUserChat] = useState(null);
  const [showSingleChat, setShowSingleChat] = useState(false);
  const { newOrders, shippingOrders } = state;

  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);

  let userData = exportFromLocalStorage("userData");
  let cartData = exportFromLocalStorage("cartData");

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
      setId(userData.id);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);
  useEffect(() => {
    const getUserData = async (data) => {
      try {
        const res = await getUserDataService(data);
        if (res && res.data.errCode === 0) {
          setUsers(res.data.data);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userData.roleId === "R2") {
      getUserData("R1");
    } else if (userData.roleId === "R1") {
      getUserData("R2");
    }
  }, [userData.roleId]);
  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setQuantity(cartData.length);
    } else {
      setQuantity("");
    }
  }, [cartData.length]);
  //Handle
  const handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const getNewOrder = async () => {
      try {
        const res = await getNewOrderService(id);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(getNewOrderByUserSuccess(res.data.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getShippingOrder = async () => {
      try {
        const res = await getShippingOrderService(id);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(getShippingOrderByUserSuccess(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn) {
      getNewOrder();
      getShippingOrder();
    } else {
      return;
    }
  }, [isLoggedIn]);
  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    setShowSingleChat(false);
  };
  const toTal = useMemo(() => {
    let result = "";
    if (shippingOrders.length > 0) {
      result = shippingOrders.reduce((result, item) => {
        let a = item.quantity;
        let b = item.price;
        return result + a * b;
      }, 0);
    } else {
      result = "";
    }
    return result;
  }, [shippingOrders]);

  const handleCancelOrder = async (id, index) => {
    dispatch(deleteNewOrderByUserSuccess(index));
    try {
      const res = await deleteNewOrderService(id);
      if (res && res.errCode === 0) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmShippedOrder = async (id, index) => {
    dispatch(confirmShippingOrderByUserSuccess(index));
    try {
      const res = await confirmShippedOrderService(id);
      if (res && res.errCode === 0) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <Link to="/">Home</Link>
            <a href="#products-section">About</a>
            <a onClick={() => window.scrollTo(0, 900)}>Categories</a>
          </ul>
          <Link to="/" className="center">
            HANOISTORE.
          </Link>
          <div className="right">
            <div className="order">
              <Tippy
                interactive
                placement="bottom"
                content={
                  <>
                    <div className="new-order">
                      <span className="title">New Order</span>
                      {newOrders && newOrders.length > 0 ? (
                        newOrders.map((item, index) => {
                          return (
                            <div className="item" key={index}>
                              <img sr={item.img} alt="product" />
                              <div className="product-detail">
                                <div className="name">{item.productName}</div>
                                <div className="price">
                                  {item.price}x{item.quantity}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleCancelOrder(item.id, index)
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div>Your order is empty</div>
                      )}
                    </div>
                    <div className="shipping">
                      <span className="title">Shipping</span>
                      {shippingOrders && shippingOrders.length > 0 ? (
                        shippingOrders.map((item, index) => {
                          return (
                            <div className="item" key={index}>
                              <img sr={item.img} alt="product" />
                              <div className="product-detail">
                                <span className="name">{item.productName}</span>
                                <span className="price">
                                  {" "}
                                  {item.price}x{item.quantity}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleConfirmShippedOrder(item.id)
                                }
                              >
                                Received
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div>Your order hasn't confirm by Admin</div>
                      )}
                    </div>
                    <div className="order-footer">
                      <div className="text">Total Price:</div>
                      <div className="total">{toTal ? toTal : 0}&#36;</div>
                    </div>
                  </>
                }
              >
                <div>
                  <AiOutlineShopping />
                </div>
              </Tippy>
            </div>
            <div className="search">
              <TbSearch onClick={() => setShowSearch(true)} />
            </div>
            <div className="message">
              <Tippy
                interactive
                placement="bottom"
                content={
                  isLoggedIn ? (
                    <Chat
                      isLoggedIn={isLoggedIn}
                      usersData={users}
                      userData={userData}
                      setUserChat={setUserChat}
                      setShowSingleChat={setShowSingleChat}
                      setLatestMessage={setLatestMessage}
                      setFetchAgain={setFetchAgain}
                    />
                  ) : (
                    <div>User isn't login</div>
                  )
                }
              >
                <span>
                  <TbBrandMessenger />
                </span>
              </Tippy>
            </div>
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {quantity && <span>{quantity}</span>}
            </span>
            {!isLoggedIn ? (
              <Link className="login-btn" to="/login">
                Login
              </Link>
            ) : (
              <Link onClick={handleLogout} to="/">
                <FiLogOut className="user-logged" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showSingleChat && (
        <SingleChat
          userChat={userChat}
          setShowSingleChat={setShowSingleChat}
          messages={messages}
          userData={userData}
          setMessages={setMessages}
          latestMessage={latestMessage}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      )}
    </>
  );
};

export default Header;
