import React from "react";
import { useState, useEffect } from "react";

import "./ManageProduct.scss";
import { BsFillCloudUploadFill } from "react-icons/bs";

import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Link } from "react-router-dom";
import { PATH } from "../../../utils/constant";
import { Button, Table } from "reactstrap";
import { getBase64 } from "../../../utils/Base64";
import { useStore } from "../../../hooks/useStore";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import {
  getAllProductService,
  createNewProductService,
  deleteProductService,
  editProductService,
  getAllCategoryService,
} from "../../../services/adminService";
import {
  createNewProductSuccess,
  getAllProductSuccess,
  editProductSuccess,
  deleteProductSuccess,
  getAllCategorySuccess,
} from "../../../Store";

const initialState = {
  productName: "",
  productType: "",
  quantity: "",
  description: "",
  price: "",
  image: "",
  categoryData: "",
};

const ManageProduct = () => {
  //State
  const [product, setProduct] = useState(initialState);
  const [isCreate, setIsCreate] = useState(true);
  const [errCode, setErrCode] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [onInput, setOnInput] = useState(false);
  const [index, setIndex] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productDelete, setProductDelete] = useState({});
  const [state, dispatch] = useStore();

  const { allProductReducer, allCategoryReducer } = state;
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await getAllCategoryService();
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(getAllCategorySuccess(res.data.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
    const getAllProduct = async () => {
      try {
        const res = await getAllProductService("ALL");
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(getAllProductSuccess(res.data.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  // Handel

  const onChangeInput = async (e, id) => {
    setErrCode("");
    setOnInput(true);
    if (id === "image") {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        const base64 = await getBase64(file);
        const url = URL.createObjectURL(file);
        setPreviewImageUrl(url);
        setProduct({ ...product, [id]: base64 });
      }
    } else {
      setProduct({ ...product, [id]: e.target.value });
    }
  };
  const validate = (product) => {
    let isValid = true;
    let inputData = "";
    const arrInput = [
      "productName",
      "productType",
      "quantity",
      "description",
      "price",
      "image",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!product[arrInput[i]]) {
        isValid = false;
        inputData = arrInput[i];
        break;
      }
    }
    return {
      isValid,
      inputData,
    };
  };
  const addProductType = () => {
    let productTypeValue = allCategoryReducer.filter(
      (item) => item.productType === product.productType
    );
    return productTypeValue;
  };
  const createNewProduct = async () => {
    let checkResult = validate(product);
    let value = addProductType();
    if (checkResult.isValid) {
      setErrCode("");
      product.categoryData = value[0];
      try {
        const res = await createNewProductService(product);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(createNewProductSuccess(product));
          setProduct(initialState);
          setPreviewImageUrl("");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrCode("Missing parameter : " + checkResult.inputData);
    }
  };
  const editProduct = (productEdit, index) => {
    setIsCreate(false);
    setProduct(productEdit);
    setIndex(index);
    setPreviewImageUrl(productEdit.image);
  };
  const updateProduct = async () => {
    let value = addProductType();
    product.categoryData = value[0];
    try {
      const res = await editProductService(product);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(editProductSuccess(product, index));
        setProduct(initialState);
        setPreviewImageUrl("");
        setIsCreate(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (product, index) => {
    setOpenConfirmModal(true);
    setIndex(index);
    setProductDelete(product);
  };
  const deleteProduct = async () => {
    try {
      const res = await deleteProductService(productDelete.id);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(deleteProductSuccess(index));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdminService = () => {
    if (isCreate) {
      createNewProduct();
    } else {
      updateProduct();
    }
  };

  return (
    <div className="manage-product">
      <div className="table-product">Manage Product</div>
      <div className="table-container">
        <Link className="back-btn" to={PATH.ADMIN}>
          <p>Back</p>
        </Link>
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ProductName</th>
              <th>ProductType</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Price</th>
              <th>Id</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProductReducer &&
              allProductReducer.length > 0 &&
              allProductReducer.map((item, index) => {
                let productType = item.categoryData;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.productName}</td>
                    <td>{productType.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.id}</td>
                    <td>
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                        onClick={() => {
                          setPreviewImageUrl(item.image);
                          setOpenPreview(true);
                        }}
                      ></div>
                    </td>
                    <td>
                      <Button
                        onClick={() => editProduct(item, index)}
                        type="button"
                        color="primary"
                      >
                        <a href="#edit_product">Edit</a>
                      </Button>
                      <Button
                        onClick={() => openModal(item, index)}
                        type="button"
                        className=" m-3"
                        color="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div className="edit-product" id="edit_product">
        Edit Product Info
      </div>
      <div className="errCode">{errCode}</div>
      <div className="edit-form container">
        <div className="row">
          <div className="col-4 p-2">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="ProductName"
              value={product.productName}
              onChange={(e) => onChangeInput(e, "productName")}
            />
          </div>
          <div className="col-4 p-2">
            <label>Product Type</label>
            <select
              className="form-control"
              onChange={(e) => onChangeInput(e, "productType")}
              value={product.productType}
            >
              <option value="">Choose</option>
              {allCategoryReducer &&
                allCategoryReducer.length > 0 &&
                allCategoryReducer.map((item, index) => {
                  return (
                    <option key={index} value={item.productType}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-4 p-2">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => onChangeInput(e, "quantity")}
            />
          </div>

          <div className="col-4 p-2">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={product.price}
              onChange={(e) => onChangeInput(e, "price")}
            />
          </div>
          <div className="col-4 p-2">
            <label>Description</label>
            <textarea
              rows="5"
              cols="20"
              type="text"
              className="form-control"
              placeholder="Description"
              value={product.description}
              onChange={(e) => onChangeInput(e, "description")}
            />
          </div>
          <div className="col-4 p-2">
            <label>Image</label>
            <input
              id="image"
              type="file"
              className="form-control"
              placeholder="Image"
              onChange={(e) => onChangeInput(e, "image")}
              hidden
            />
            <div className="preview-image">
              <label className="upload-btn" htmlFor="image">
                <BsFillCloudUploadFill className="upload-icon" size={20} />
              </label>
              <div
                className="image"
                style={{
                  backgroundImage: `url(${previewImageUrl})`,
                }}
                onClick={() => setOpenPreview(true)}
              ></div>
            </div>
          </div>
        </div>
        <Button
          className="mt-4"
          onClick={() => handleAdminService()}
          disabled={onInput ? false : true}
          color="success"
        >
          {isCreate ? "Create New" : "Update"}
        </Button>
      </div>
      {/* Preview image */}
      {openPreview && (
        <Lightbox
          mainSrc={previewImageUrl}
          onCloseRequest={() => setOpenPreview(false)}
        />
      )}
      {/* Confirm Modal */}
      <ConfirmModal
        adminConfirm={deleteProduct}
        content="Do you wanna delete this product at database?"
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  );
};

export default ManageProduct;
