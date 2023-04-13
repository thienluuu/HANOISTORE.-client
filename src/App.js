import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import {
  Header,
  Footer,
  HomePage,
  Category,
  SingleProduct,
  Newsletter,
  Login,
  Admin,
} from "./components";
import {
  ManageUser,
  ManageProduct,
  ManageCategory,
  ManageOrder,
} from "./components/Admin";
import Home from "./components/Home";
import { PATH } from "./utils/constant";
import AppContext from "./hooks/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";

const App = () => {
 
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path={PATH.HOME} exact element={<Home />} />
          <Route path={PATH.CATEGORY} element={<Category />} />
          <Route path={PATH.PRODUCT} element={<SingleProduct />} />
          <Route path={PATH.HOME_PAGE} element={<HomePage />} />
          <Route element={<RequireAuth role="R1" />}>
            <Route path={PATH.ADMIN} element={<Admin />} />
            <Route path={PATH.MANAGE_USER} element={<ManageUser />} />
            <Route path={PATH.MANAGE_PRODUCT} element={<ManageProduct />} />
            <Route path={PATH.MANAGE_CATEGORY} element={<ManageCategory />} />
            <Route path={PATH.MANAGE_ORDER} element={<ManageOrder />} />
          </Route>
          <Route path={PATH.LOGIN} element={<Login />} />
        </Routes>
        <Newsletter />
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
