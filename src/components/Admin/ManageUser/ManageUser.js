import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { useStore } from "../../../hooks/useStore";
import "./ManageUser.scss";
import { Link } from "react-router-dom";
import { PATH } from "../../../utils/constant";
import { Button, Table } from "reactstrap";
import { getAllUserService } from "../../../services/adminService";
import {
  getAllUserSuccess,
  createNewUserSuccess,
  editUserSuccess,
  deleteUserSuccess,
} from "../../../Store";
import { createUserService } from "../../../services/userService";
import { getAllCodeById } from "../../../services/adminService";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { getBase64 } from "../../../utils/Base64";
import {
  editUserService,
  deleteUserService,
} from "../../../services/adminService";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const initialState = {
  userName: "",
  password: "",
  email: "",
  confirmPassword: "",
  fullName: "",
  phoneNumber: "",
  address: "",
  gender: "",
  avatar: "",
  roleId: "",
  genderData: "",
};

const ManageUser = () => {
  //State
  const [state, dispatch] = useStore();
  const [gender, setGender] = useState([]);
  const [roleId, setRoleId] = useState([]);
  const [user, setUser] = useState(initialState);
  const [isCreate, setIsCreate] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [errCode, setErrCode] = useState("");
  const [onInput, setOnInput] = useState(false);
  const [index, setIndex] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userDelete, setUserDelete] = useState({});

  const { allUserReducer } = state;
  console.log(allUserReducer);
  useEffect(() => {
    const getAllCode = async () => {
      try {
        const genderData = await getAllCodeById("GENDER");
        const roleIdData = await getAllCodeById("ROLE");
        if (genderData && genderData.data.errCode === 0) {
          toast.success(genderData.data.message);
          setGender(genderData.data.data);
        } else {
          toast.error(genderData.data.message);
        }
        if (roleIdData && roleIdData.data.errCode === 0) {
          toast.success(roleIdData.data.message);
          setRoleId(roleIdData.data.data);
        } else {
          toast.error(roleIdData.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAllUser = async () => {
      try {
        const res = await getAllUserService("ALL");
        let allUser = res.data.data;
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(getAllUserSuccess(allUser));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCode();
    getAllUser();
  }, []);
  //Handle
  const validate = (user) => {
    let isValid = true;
    let errCode = "";

    const arrInput = [
      "userName",
      "password",
      "confirmPassword",
      "email",
      "fullName",
      "phoneNumber",
      "address",
      "gender",
      "avatar",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!user[arrInput[i]]) {
        errCode = `Missing parameters ${arrInput[i]}`;
        isValid = false;
        break;
      } else if (arrInput[i] === "email") {
        const email = user[arrInput[i]];
        const validateEmail = (email) => {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
        };
        const result = validateEmail(email);
        if (!result) {
          errCode = "Wrong email type";
          isValid = false;
          break;
        }
      } else if (arrInput[i] === "password") {
        if (user[arrInput[i]].length < 7) {
          errCode = "Password must more than 8 characters";
          isValid = false;
          break;
        }
      } else if (arrInput[i] === "confirmPassword") {
        let password = user["password"];
        let confirmPassword = user[arrInput[i]];
        if (password.length !== confirmPassword.length) {
          errCode = "Wrong password";
          isValid = false;
          break;
        }
      }
    }
    return {
      errCode,
      isValid,
    };
  };
  const onChangeInput = async (e, id) => {
    setErrCode("");
    setOnInput(true);
    if (id === "avatar") {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        const base64 = await getBase64(file);
        const url = URL.createObjectURL(file);
        setPreviewImageUrl(url);
        setUser({ ...user, [id]: base64 });
      }
    } else {
      setUser({ ...user, [id]: e.target.value });
    }
  };
  const addGenderData = () => {
    let genderValue = gender.filter((item) => item.keyMap === user.gender);
    return genderValue;
  };
  const createNewUser = async () => {
    const checkResult = validate(user);
    if (checkResult.isValid) {
      let value = addGenderData();
      user.genderData = value[0];
      setErrCode(checkResult.errCode);
      try {
        const res = await createUserService(user);
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          dispatch(createNewUserSuccess(user));
          setUser(initialState);
          setPreviewImageUrl("");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrCode(checkResult.errCode);
    }
  };
  const editUser = (userEdit, index) => {
    setIndex(index);
    setIsCreate(false);
    setUser(userEdit);
    setPreviewImageUrl(userEdit.image);
  };
  const updateUser = async () => {
    try {
      const res = await editUserService(user);
      let value = addGenderData();
      user.genderData = value[0];
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(editUserSuccess(user, index));
        setUser(initialState);
        setPreviewImageUrl("");
        setIsCreate(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (user, index) => {
    setOpenConfirmModal(true);
    setUserDelete(user);
    setIndex(index);
  };
  const deleteUser = async () => {
    try {
      const res = await deleteUserService(userDelete.id);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        dispatch(deleteUserSuccess(index));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdminService = () => {
    if (isCreate) {
      createNewUser();
    } else {
      updateUser();
    }
  };
  return (
    <div className="manage-user">
      <div className="table-user">Manage User</div>
      <div className="table-container">
        <Link className="back-btn" to={PATH.ADMIN}>
          <p>Back</p>
        </Link>
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>UserName</th>
              <th>FullName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Address</th>
              <th>Gender</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUserReducer &&
              allUserReducer.length > 0 &&
              allUserReducer.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.userName}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.address}</td>
                    <td>{item.genderData.value}</td>
                    <td>{item.id}</td>
                    <td>
                      <Button
                        onClick={() => {
                          editUser(item, index);
                        }}
                        color="primary"
                      >
                        <a href="#edit_user">Edit</a>
                      </Button>
                      <Button
                        className="m-2"
                        onClick={() => openModal(item, index)}
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
      <div id="edit_user">
        <div className="edit-user">Edit User</div>
        <div className="errCode">{errCode}</div>
        <div className="edit-form container">
          <div className="row">
            <div className="col-4 p-2">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="UserName"
                value={user.userName}
                onChange={(e) => onChangeInput(e, "userName")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                disabled={isCreate ? false : true}
                onChange={(e) => onChangeInput(e, "password")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Confirm Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="ConfirmPassword"
                disabled={isCreate ? false : true}
                onChange={(e) => onChangeInput(e, "confirmPassword")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="FullName"
                value={user.fullName}
                onChange={(e) => onChangeInput(e, "fullName")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={user.email}
                onChange={(e) => onChangeInput(e, "email")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="PhoneNumber"
                value={user.phoneNumber}
                onChange={(e) => onChangeInput(e, "phoneNumber")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={user.address}
                onChange={(e) => onChangeInput(e, "address")}
              />
            </div>
            <div className="col-4 p-2">
              <label>Gender</label>
              <select
                className="form-control"
                onChange={(e) => onChangeInput(e, "gender")}
                value={user.gender}
              >
                <option value="">Choose</option>
                {gender &&
                  gender.length > 0 &&
                  gender.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 p-2">
              <label>RoleID</label>
              <select
                className="form-control"
                onChange={(e) => onChangeInput(e, "roleId")}
                value={user.roleId}
              >
                <option value="">Choose</option>
                {roleId &&
                  roleId.length > 0 &&
                  roleId.map((item, index) => {
                    return (
                      <option value={item.keyMap} key={index}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 p-2">
              <label>Avatar</label>
              <input
                id="image"
                type="file"
                className="form-control"
                placeholder="Avatar"
                onChange={(e) => onChangeInput(e, "avatar")}
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
        adminConfirm={deleteUser}
        content="Do you wanna delete this user account at database?"
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  );
};

export default ManageUser;
