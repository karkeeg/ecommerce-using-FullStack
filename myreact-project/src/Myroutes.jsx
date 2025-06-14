import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import AboutPage from "./sections/AboutPage";
import ServicesPage from "./sections/ServicesPage";
import BlogPage from "./sections/BlogPage";
import ContactPage from "./sections/ContactPage";
import EmailVerification from "./Pages/EmailVerification";
import ForgotPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AdminRoutes from "./Components/protectedRoutes/AdminRoutes";
import Dashboard from "./Pages/admin/Dashboard";
import UserRoutes from "./Components/protectedRoutes/UserRoutes";
import AdminLayout from "./Pages/admin/AdminLayout";
import Category from "./Pages/admin/Category";
import Product from "./Pages/admin/Product";
import Users from "./Pages/admin/Users";
import Orders from "./Pages/admin/Orders";
import AddCategory from "./Pages/admin/AddCategory";
import UpdateCategory from "./Pages/admin/UpdateCategory";
import AddProduct from "./Pages/admin/AddProduct";
import UpdateProduct from "./Pages/admin/UpdateProduct";
import UpdateUser from "./Pages/admin/UpdateUser";
import AddUser from "./Pages/admin/AddUSer";
import AddOrder from "./Pages/admin/AddOrder";
import ProductPage from "./Pages/ProductPage";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";
import UserProfile from "./Pages/UserProfile";
import OrderDetails from "./Pages/admin/OrderDetails";

const Myroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />

          <Route path="/service" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="verify/:token" element={<EmailVerification />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword/:token" element={<ResetPasswordPage />} />

          <Route path="/" element={<UserRoutes />}></Route>
        </Route>

        <Route path="/" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="category/new" element={<AddCategory />} />
            <Route path="category/:id" element={<UpdateCategory />} />

            <Route path="Product" element={<Product />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />

            <Route path="Users" element={<Users />} />
            <Route path="updateUser/:id" element={<UpdateUser />} />
            <Route path="addUser" element={<AddUser />} />

            <Route path="orders" element={<Orders />} />
            <Route path="addorder" element={<AddOrder />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Myroutes;
