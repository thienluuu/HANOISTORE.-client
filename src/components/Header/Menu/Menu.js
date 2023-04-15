import React from "react";

import { TbSearch, TbBrandMessenger } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import "./Menu.scss";
const Menu = ({ setShowMenu, setShowSearch, setShowCart }) => {
  return (
    <div className="menu">
      <div className="menu-header">
        <div className="title">Menu</div>
        <div className="close-btn" onClick={() => setShowMenu(false)}>
          <MdClose />
        </div>
      </div>
      <ul className="list-item">
        <li className="menu-item" onClick={() => setShowCart(true)}>
          <span>Cart</span>
          <CgShoppingCart />
        </li>

        <li className="menu-item" onClick={() => setShowSearch(true)}>
          <span>Search</span>
          <TbSearch />
        </li>
        <li className="menu-item" onClick={() => setShowMenu(false)}>
          <span> My Order</span>
          <AiOutlineShopping />
        </li>
        <li className="menu-item" onClick={() => setShowMenu(false)}>
          <span>Chat</span>
          <TbBrandMessenger />
        </li>
      </ul>
    </div>
  );
};

export default Menu;
