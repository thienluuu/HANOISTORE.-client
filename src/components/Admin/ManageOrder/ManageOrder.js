import React, { useState, useEffect } from "react";

import "./ManageOrder.scss";
import { useStore } from "../../../hooks/useStore";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Link } from "react-router-dom";
import { PATH } from "../../../utils/constant";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";

import {
  getNewOrderService,
  confirmNewOrderService,
} from "../../../services/adminService";
import { getNewOrderSuccess, confirmOrder } from "../../../Store";

const ManageOrder = () => {
  const [state, dispatch] = useStore();

  const { newOrders } = state;
  useEffect(() => {
    const getNewOrder = async () => {
      const res = await getNewOrderService("S1");
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(getNewOrderSuccess(res.data.data));
      } else {
        toast.error(res.data.message);
      }
    };
    getNewOrder();
  }, []);

  const confirmOrder = async (id, index) => {
    try {
      const res = await confirmNewOrderService(id);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(confirmOrder(index));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="manage-order">
      <div className="table-order">Manage NEW Order</div>
      <div className="table-container">
        <Link className="back-btn" to={PATH.ADMIN}>
          <p>Back</p>
        </Link>
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>UserId</th>
              <th>Date</th>
              <th>ProductName</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newOrders &&
              newOrders.length > 0 &&
              newOrders.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.userId}</td>
                    <td>{item.date}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        onClick={() => confirmOrder(item.id, index)}
                        type="button"
                        color="primary"
                      >
                        <a href="#edit_category">Confirm</a>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageOrder;
