export const PATH = {
  HOME: "/",
  HOME_PAGE: "/home-page",
  LOGIN: "/login",
  CATEGORY: "/category/:id",
  PRODUCT: "/product/:id",
  ADMIN: "/admin",
  MANAGE_USER: "/admin/manage-user",
  MANAGE_PRODUCT: "/admin/manage-product",
  MANAGE_CATEGORY: "/admin/manage-category",
  MANAGE_ORDER: "/admin/manage-order",
};
export const actionTypes = Object.freeze({
  CREATE_NEW_USER_SUCCESS: "CREATE_NEW_USER_SUCCESS",
  CREATE_NEW_USER_FAILED: "CREATE_NEW_USER_FAILED",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILED: "LOGIN_USER_FAILED",
  ON_LOGIN: "ON_LOGIN",
  LOGOUT: "LOGOUT",

  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_USER_FAILED: "GET_ALL_USER_FAILED",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",

  GET_ALL_PRODUCT_SUCCESS: "GET_ALL_PRODUCT_SUCCESS",
  CREATE_NEW_PRODUCT_SUCCESS: "CREATE_NEW_PRODUCT_SUCCESS",
  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  GET_ALL_CATEGORY_SUCCESS: "GET_ALL_CATEGORY_SUCCESS",
  CREATE_NEW_CATEGORY_SUCCESS: "CREATE_NEW_CATEGORY_SUCCESS",
  EDIT_CATEGORY_SUCCESS: "EDIT_CATEGORY_SUCCESS",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",

  SAVE_CART_ITEMS: "SAVE_CART_ITEMS",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_CART_ITEM: "CLEAR_CART_ITEM",

  GET_NEW_ORDER_SUCCESS: "GET_NEW_ORDER_SUCCESS",
  CONFIRM_NEW_ORDER: "CONFIRM_NEW_ORDER",

  GET_NEW_ORDER_BY_USER_SUCCESS: "GET_NEW_ORDER_BY_USER_SUCCESS",
  GET_SHIPPING_ORDER_BY_USER_SUCCESS: "GET_SHIPPING_ORDER_BY_USER_SUCCESS",
  DELETE_SHIPPING_ORDER_BY_USER_SUCCESS:'DELETE_SHIPPING_ORDER_BY_USER_SUCCESS',
  CONFIRM_SHIPPING_ORDER_BY_USER_SUCCESS:'CONFIRM_SHIPPING_ORDER_BY_USER_SUCCESS',

});