import { actionTypes } from "../utils/constant";
import {
  importToLocalStorage,
  exportFromLocalStorage,
  deleteFromLocalStorage,
} from "../utils/localStorage";

const initialState = {
  userLoginReducer: {},
  isLoggedInReducer: false,

  allUserReducer: [],
  allProductReducer: [],
  allCategoryReducer: [],

  newOrders: [],
  shippingOrders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      importToLocalStorage("userData", action.data);
      let newState = { ...state };
      newState.userLoginReducer = action.data;
      newState.isLoggedInReducer = true;
      return {
        ...newState,
      };
    case actionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        isLoggedInReducer: false,
      };
    case actionTypes.LOGOUT:
      deleteFromLocalStorage("userData");
      deleteFromLocalStorage("cartData");
      return {
        ...state,
        isLoggedInReducer: false,
      };

    //user
    case actionTypes.GET_ALL_USER_SUCCESS:
      let newState1 = { ...state };
      newState1.allUserReducer = action.data;
      return {
        ...newState1,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      let newState2 = { ...state };
      newState2.allUserReducer.push(action.data);
      return {
        ...newState2,
      };
    case actionTypes.GET_ALL_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_SUCCESS:
      let preAllUserReducer = [...state.allUserReducer];
      preAllUserReducer.splice(action.index, 1);
      let newAllUserReducer = [...preAllUserReducer];
      newAllUserReducer.push(action.data);
      let newState3 = { ...state };
      newState3.allUserReducer = newAllUserReducer;
      return {
        ...newState3,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      let preAllUserReducer1 = [...state.allUserReducer];
      preAllUserReducer1.splice(action.index, 1);
      return {
        ...state,
        allUserReducer: [...preAllUserReducer1],
      };

    //product
    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        allProductReducer: [...action.data],
      };
    case actionTypes.CREATE_NEW_PRODUCT_SUCCESS:
      let newState4 = { ...state };
      newState4.allProductReducer.push(action.data);
      return {
        ...newState4,
      };
    case actionTypes.EDIT_PRODUCT_SUCCESS:
      let preAllProductReducer = [...state.allProductReducer];
      preAllProductReducer.splice(action.index, 1);
      let newAllProductReducer = [...preAllProductReducer];
      newAllProductReducer.push(action.data);
      let newState5 = { ...state };
      newState5.allProductReducer = newAllProductReducer;
      return {
        ...newState5,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      let preAllProductReducer1 = [...state.allProductReducer];
      preAllProductReducer1.splice(action.index, 1);
      return {
        ...state,
        allProductReducer: [...preAllProductReducer1],
      };

    //category
    case actionTypes.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategoryReducer: [...action.data],
      };
    case actionTypes.CREATE_NEW_CATEGORY_SUCCESS:
      let newState6 = { ...state };
      newState6.allCategoryReducer.push(action.data);
      return {
        ...newState6,
      };
    case actionTypes.EDIT_CATEGORY_SUCCESS:
      let preAllCategoryReducer = [...state.allCategoryReducer];
      preAllCategoryReducer.splice(action.index, 1);
      let newAllCategoryReducer = [...preAllCategoryReducer];
      newAllCategoryReducer.push(action.data);
      let newState7 = { ...state };
      newState7.allCategoryReducer = newAllCategoryReducer;
      return {
        ...newState7,
      };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      let preAllCategoryReducer1 = [...state.allCategoryReducer];
      preAllCategoryReducer1.splice(action.index, 1);
      return {
        ...state,
        allCategoryReducer: [...preAllCategoryReducer1],
      };

    //cart
    case actionTypes.SAVE_CART_ITEMS:
      let cartData = exportFromLocalStorage("cartData");
      if (!cartData) {
        cartData = [];
        cartData.push(action.data);
      } else {
        let newItem = action.data;
        let isValid = true;
        for (let i = 0; i < cartData.length; i++) {
          if (cartData[i].product.id == newItem.product.id) {
            cartData[i].quantity += newItem.quantity;
            isValid = true;
          } else {
            isValid = false;
          }
        }
        if (isValid) {
          cartData = [...cartData];
        } else {
          cartData = [...cartData, newItem];
        }
      }
      importToLocalStorage("cartData", cartData);
      return {
        ...state,
      };
    case actionTypes.REMOVE_ITEM_FROM_CART:
      let cartData1 = exportFromLocalStorage("cartData");
      let indexItemRemove = action.index;
      cartData1.splice(indexItemRemove, 1);
      if (cartData1.length === 0) {
        deleteFromLocalStorage("cartData");
      } else {
        importToLocalStorage("cartData", cartData1);
      }
      return {
        ...state,
      };
    case actionTypes.CLEAR_CART_ITEM:
      deleteFromLocalStorage("cartData");
      return {
        ...state,
      };

    //order
    case actionTypes.GET_NEW_ORDER_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        newOrders: [...action.data],
      };
    case actionTypes.GET_SHIPPING_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        shippingOrders: [...action.data],
      };
    case actionTypes.DELETE_SHIPPING_ORDER_BY_USER_SUCCESS:
      let newOrders1 = [...state.newOrders];
      newOrders1.splice(action.index, 1);
      return {
        ...state,
        newOrders: newOrders1,
      };
    case actionTypes.DELETE_SHIPPING_ORDER_BY_USER_SUCCESS:
      let shippingOrders1 = [...state.shippingOrders];
      console.log(shippingOrders1);
      shippingOrders1.splice(action.index, 1);
      return {
        ...state,
        shippingOrders: shippingOrders1,
      };
    default:
      return state;
  }
};
export { initialState };
export default reducer;
