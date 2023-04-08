import React, { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFacebookF, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import "./Login.scss";
import { getBase64 } from "../../utils/Base64";
import { createNewUser, loginUserSuccess, loginUserFailed } from "../../Store";
import { loginService } from "../../services/userService";
import { importToLocalStorage } from "../../utils/localStorage";

const initialState = {
  userName: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  phoneNumber: "",
  address: "",
  gender: "",
  avatar: "",
  email: "",
};

const Login = () => {
  //State
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [errCodeInput, setErrCodeInput] = useState("");
  const [state, dispatch] = useStore();
  const history = useNavigate();
  const prevLocation = useLocation();

  //Handle
  const switchMode = () => {
    setLogin((preLogin) => !preLogin);
  };
  const validateInput = (user, id) => {
    let isValid = true;
    let errCode = "";
    if (id === "signup") {
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
          errCode = "Missing parameters";
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
    } else {
      const arrInput = ["userName", "password"];
      for (let i = 0; i < arrInput.length; i++) {
        if (!user[arrInput[i]]) {
          errCode = "Missing parameters";
          isValid = false;
          break;
        }
      }
    }
    return {
      isValid,
      errCode,
    };
  };
  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleChangeInputAvatar = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await getBase64(file);
      setUser({ ...user, [e.target.name]: base64 });
    }
  };
  //Call Api
  const handleSubmit = async (id) => {
    let result = validateInput(user, id);
    if (result.isValid === true) {
      setErrCodeInput("");
      if (id === "login") {
        let data = {
          userName: user.userName,
          password: user.password,
        };
        const res = await loginService(data);
        if (res && res.data.errCode === 0) {
          const userData = res.data.data;
          toast.success(res.data.message);
          dispatch(loginUserSuccess(res.data.data));
          history("/");
        } else {
          toast.error(res.data.message);
          dispatch(loginUserFailed);
        }
      } else {
        let data = {
          userName: user.userName,
          password: user.password,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          gender: user.gender,
          avatar: user.avatar,
        };
        dispatch(createNewUser(data));
      }
    } else {
      setErrCodeInput(result.errCode);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSubmit(login ? "login" : "signup");
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          {login ? "Welcome to HANOISTORE." : "SignUp Form"}
        </div>
        <span className="error">{errCodeInput}</span>
        <div className="login-body">
          <div className="login-input">
            <label>UserName</label>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              onChange={handleChangeInput}
            />
          </div>
          <div className="login-input">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
            />
            <div
              className="eyes"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          {!login && (
            <>
              <div className="login-input">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="ConfirmPassword"
                  name="confirmPassword"
                  onChange={handleChangeInput}
                />
                <div
                  className="eyes"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              <div className="login-input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="login-input">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="FullName"
                  name="fullName"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="login-input">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="PhoneNumber"
                  name="phoneNumber"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="login-input">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="login-input">
                <label>Gender</label>
                <select
                  className="select-gender"
                  onChange={handleChangeInput}
                  name="gender"
                >
                  <option value="">Choose</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="login-input">
                <label>Avatar</label>
                <input
                  id="uploadAvatar"
                  type="file"
                  placeholder="Avatar"
                  name="avatar"
                  hidden
                  onChange={handleChangeInputAvatar}
                />
                <label className="upload-btn" htmlFor="uploadAvatar">
                  <BsFillCloudUploadFill className="upload-icon" size={20} />
                </label>
              </div>
            </>
          )}
        </div>
        <div className="login-footer">
          <button
            className="login-btn"
            onClick={() => handleSubmit(login ? "login" : "signup")}
          >
            {login ? "Login" : "SignUp"}
          </button>
          <div className="text">
            {login ? "Don't have an account! " : "Already have an account? "}
            <span onClick={switchMode}>{login ? "Sign up" : "Login"}</span>
          </div>
          {login ? (
            <div className="another-login">
              <span>Or login with</span>
              <div className="social-icons">
                <div className="icon facebook">
                  <FaFacebookF size={16} />
                </div>
                <div className="icon">
                  <FcGoogle size={16} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
