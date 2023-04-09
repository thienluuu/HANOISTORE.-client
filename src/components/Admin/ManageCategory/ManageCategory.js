import React, { useState, useEffect } from "react";

import "./ManageCategory.scss";
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
  createNewCategoryService,
  getAllCategoryService,
  editCategoryService,
  deleteCategoryService,
} from "../../../services/adminService";
import {
  createNewCategorySuccess,
  getAllCategorySuccess,
  editCategorySuccess,
  deleteCategorySuccess,
} from "../../../Store/Actions";

const initialState = {
  name: "",
  productType: "",
  image: "",
};
const ManageCategory = () => {
  //state
  const [category, setCategory] = useState(initialState);
  const [isCreate, setIsCreate] = useState(true);
  const [errCode, setErrCode] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [onInput, setOnInput] = useState(false);
  const [index, setIndex] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState({});
  const [state, dispatch] = useStore();

  const { allCategoryReducer } = state;

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
  }, []);

  //Handel
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
        setCategory({ ...category, [id]: base64 });
      }
    } else {
      setCategory({ ...category, [id]: e.target.value });
    }
  };
  const validate = (category) => {
    let isValid = true;
    let inputData = "";
    const arrInput = ["name", "productType", "image"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!category[arrInput[i]]) {
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
  const createNewCategory = async () => {
    let checkResult = validate(category);
    if (checkResult.isValid) {
      console.log(category);
      const res = await createNewCategoryService(category);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(createNewCategorySuccess(category));
        setCategory(initialState);
        setPreviewImageUrl("");
      } else {
        toast.error(res.data.message);
      }
    } else {
      setErrCode("Missing parameter : " + checkResult.inputData);
    }
  };
  const editCategory = (categoryEdit, index) => {
    setIsCreate(false);
    setCategory(categoryEdit);
    setIndex(index);
    setPreviewImageUrl(categoryEdit.image);
  };
  const updateCategory = async () => {
    try {
      const res = await editCategoryService(category);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(editCategorySuccess(category, index));
        setCategory(initialState);
        setPreviewImageUrl("");
        setIsCreate(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (category, index) => {
    setOpenConfirmModal(true);
    setIndex(index);
    setCategoryDelete(category);
  };
  const deleteCategory = async () => {
    try {
      const res = await deleteCategoryService(categoryDelete.id);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(deleteCategorySuccess(index));
        setOpenConfirmModal(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminService = () => {
    if (isCreate) {
      createNewCategory();
    } else {
      updateCategory();
    }
  };

  return (
    <div className="manage-category">
      <div className="table-category">Manage Category</div>
      <div className="table-container">
        <Link className="back-btn" to={PATH.ADMIN}>
          <p>Back</p>
        </Link>
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ProductType</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCategoryReducer &&
              allCategoryReducer.length > 0 &&
              allCategoryReducer.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.productType}</td>
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
                        onClick={() => editCategory(item, index)}
                        type="button"
                        color="primary"
                      >
                        <a href="#edit_category">Edit</a>
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
      <div className="edit-category" id="edit_category">
        Edit Category Info
      </div>
      <div className="errCode">{errCode}</div>
      <div className="edit-form container">
        <div className="row">
          <div className="col-4 p-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={category.name}
              onChange={(e) => onChangeInput(e, "name")}
            />
          </div>
          <div className="col-4 p-2">
            <label>New Product Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="New Product Type "
              value={category.productType}
              onChange={(e) => onChangeInput(e, "productType")}
            />
            <span style={{ color: "red" }}>
              Please check current product type ID and input start with symbol P
              + next number
            </span>
          </div>
          <div className="col-4 p-2">
            <label>Current ProductType</label>
            <select className="form-control">
              {allCategoryReducer &&
                allCategoryReducer.length > 0 &&
                allCategoryReducer.map((item, index) => {
                  return (
                    <option key={index} value={item.productType}>
                      {`${item.productType}   :${item.name}`}
                    </option>
                  );
                })}
            </select>
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
          className="m-4"
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
        adminConfirm={deleteCategory}
        content="Do you wanna delete this product from database?"
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  );
};

export default ManageCategory;
