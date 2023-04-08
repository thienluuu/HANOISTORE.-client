import React, { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { exportFromLocalStorage } from "../utils/localStorage";

const Home = () => {
  const [linkToRedirect, setLinkToRedirect] = useState("");
  let roleId = "";
  let data = exportFromLocalStorage("userData");
  if (data) {
    roleId = data.roleId;
  }
  useEffect(() => {
    if (roleId && roleId === "R1") {
      setLinkToRedirect("/admin");
    } else {
      setLinkToRedirect("/home-page");
    }
  }, [roleId]);

  return <Navigate replace to={linkToRedirect} />;
};

export default Home;
  