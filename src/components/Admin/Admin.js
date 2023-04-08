import React from "react";
import { Link } from "react-router-dom";

import "./Admin.scss";
import { PATH } from "../../utils/constant";

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin-info"></div>
      <div className="admin-menu">
        <div className="header">Admin-Management</div>
        <ul className="menu-container">
          <Link to={PATH.MANAGE_USER} className="menu-item">
            <p>ManageUser</p>
          </Link>
          <Link to={PATH.MANAGE_PRODUCT} className="menu-item">
            <p>ManageProduct</p>
          </Link>
          <Link to={PATH.MANAGE_CATEGORY} className="menu-item">
            <p>ManageCategory</p>
          </Link>
          <Link to={PATH.MANAGE_ORDER} className="menu-item">
            <p>ManageOrder</p>
          </Link>
          <Link to={PATH.HOME_PAGE} className="menu-item">
            <p>HomePage</p>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
