import request from "../utils/axios";

//allcode
export const getAllCodeById = (data) => {
  return request.get(`/api/get-all-code-by-id?id=${data}`);
};
//user
export const getAllUserService = (data) => {
  return request.get(`/api/get-user-by-id?id=${data}`);
};
export const editUserService = (data) => {
  return request.put("/api/edit-user-by-id", data);
};
export const deleteUserService = (data) => {
  return request.delete(`/api/delete-user-by-id?id=${data}`);
};

//product

export const getAllProductService = (data) => {
  return request.get(`/api/get-product-by-id?id=${data}`);
};
export const createNewProductService = (data) => {
  return request.post("/api/create-new-product", data);
};
export const editProductService = (data) => {
  return request.put("/api/edit-product-by-id", data);
};
export const deleteProductService = (data) => {
  return request.delete(`/api/delete-product-by-id?id=${data}`);
};

//category

export const createNewCategoryService = (data) => {
  return request.post("/api/create-new-category", data);
};
export const getAllCategoryService = () => {
  return request.get("/api/get-all-category");
};
export const editCategoryService = (data) => {
  return request.put("/api/edit-category-by-id", data);
};
export const deleteCategoryService = (data) => {
  return request.delete(`/api/delete-category-by-id?id=${data}`);
};

//order
export const getNewOrderService = (data) => {
  return request.get(`/api/get-all-order-by-status?id=${data}`);
};
export const confirmNewOrderService = (data) => {
  return request.post(`/api/confirm-new-order?id=${data}`);
};
