import { actionTypes } from "../utils/constant";
import { toast } from "react-toastify";
import { createUserService } from "../services/userService";
import { getAllUserService } from "../services/adminService";

//User
//Create new user
export const createNewUser = async (data) => {
  try {
    const res = await createUserService(data);
    if (res && res.data.errCode === 0) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
export const createNewUserSuccess = (data) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data,
  };
};

// Login
export const loginUserSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    data: data,
  };
};
export const loginUserFailed = () => {
  return {
    type: actionTypes.LOGIN_USER_FAILED,
  };
};
//Logout
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const saveCartItem = (data) => {
  return {
    type: actionTypes.SAVE_CART_ITEMS,
    data: data,
  };
};
//Cart
export const removeItemFromCart = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    index: index,
  };
};
export const clearCartItem = () => {
  return {
    type: actionTypes.CLEAR_CART_ITEM,
  };
};
//order
export const getNewOrderByUserSuccess = (data) => {
  return {
    type: actionTypes.GET_NEW_ORDER_BY_USER_SUCCESS,
    data: data,
  };
};
export const getShippingOrderByUserSuccess = (data) => {
  return {
    type: actionTypes.GET_SHIPPING_ORDER_BY_USER_SUCCESS,
    data: data,
  };
};
export const deleteNewOrderByUserSuccess = (index) => {
  console.log(index);
  return {
    type: actionTypes.DELETE_SHIPPING_ORDER_BY_USER_SUCCESS,
    index: index,
  };
};
export const confirmShippingOrderByUserSuccess = (index) => {
  return {
    type: actionTypes.CONFIRM_SHIPPING_ORDER_BY_USER_SUCCESS,
    index: index,
  };
};

//Admin
//user
export const getAllUserSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data,
  };
};
export const getAllUserFailed = () => {
  return {
    type: actionTypes.GET_ALL_USER_FAILED,
  };
};

export const editUserSuccess = (data, index) => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data,
    index: index,
  };
};

export const deleteUserSuccess = (index) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    index: index,
  };
};

//product
export const getAllProductSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
    data: data,
  };
};
export const createNewProductSuccess = (data) => {
  return {
    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS,
    data: data,
  };
};

export const editProductSuccess = (data, index) => {
  return {
    type: actionTypes.EDIT_PRODUCT_SUCCESS,
    data: data,
    index: index,
  };
};
export const deleteProductSuccess = (index) => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
    index: index,
  };
};

//category

export const createNewCategorySuccess = (data) => {
  return {
    type: actionTypes.CREATE_NEW_CATEGORY_SUCCESS,
    data: data,
  };
};
export const getAllCategorySuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
    data: data,
  };
};
export const editCategorySuccess = (data, index) => {
  return {
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
    data: data,
    index: index,
  };
};
export const deleteCategorySuccess = (index) => {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    index: index,
  };
};

//order
export const getNewOrderSuccess = (data) => {
  return {
    type: actionTypes.GET_NEW_ORDER_SUCCESS,
    data: data,
  };
};
export const confirmOrder = (index) => {
  return {
    type: actionTypes.CONFIRM_NEW_ORDER,
    index: index,
  };
};

//chat
export const getChatsSuccess = (data) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    data: data,
  };
};
export const getDataUserByIdSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_DATA_BY_ID_SUCCESS,
    data: data,
  };
};
