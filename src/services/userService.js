import request from "../utils/axios";

export const createUserService = (data) => {
  return request.post("/api/create-new-user", data);
};
export const loginService = (data) => {
  return request.post("/api/login", data);
};

export const getProductByCategoryService = (data) => {
  return request.get(`/api/get-product-by-category?id=${data}`);
};
export const getProductByIdService = (data) => {
  return request.get(`/api/get-product-by-id?id=${data}`);
};
export const getRelatedProductService = (data) => {
  return request.get(
    `/api/get-product-related?id=${data.id}&productType=${data.productType}`
  );
};
export const createNewOrderService = (data) => {
  return request.post("/api/create-new-order", data);
};
export const searchProductService = (data) => {
  return request.get(`/api/search-product?id=${data}`);
};
export const getNewOrderService = (data) => {
  return request.get(`/api/get-all-order-by-user-id?id=${data}&statusId=S1`);
};
export const getShippingOrderService = (data) => {
  return request.get(`/api/get-all-order-by-user-id?id=${data}&statusId=S2`);
};
export const deleteNewOrderService = (data) => {
  return request.delete(`/api/delete-new-order?id=${data}`);
};
export const confirmShippedOrderService = (data) => {
  return request.post(`/api/confirm-order-shipped?id=${data}`);
};

//Chat
export const getUserDataService = (data) => {
  return request.get(`/api/get-user-data?id=${data}`);
};
export const createChatService = (data) => {
  return request.post("/api/post-chat", data);
};
export const getChatsByUserIdService = (data) => {
  return request.get(`/api/get-chat?id=${data}`);
};

export const getAllMessagesByChatIdService = (data) => {
  return request.get(`/api/get-message?id=${data}`);
};
export const postMessagesByChatIdService = (data) => {
  return request.post("/api/post-message", data);
};
