
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Filter from "./pages/Filter/Filter";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import Orders from "./pages/Admin/Orders";
import Customers from "./pages/Admin/Customers";

import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function StoreLayout() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Customer Website */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/filter" element={<Filter />} />
      </Route>

      {/* Admin Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Pages */}
     
<Route element={<ProtectedRoute />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/orders" element={<Orders />} />
  <Route path="/admin/add-product" element={<AddProduct />} />
   <Route path="/admin/edit-product/:id" element={<EditProduct />} />
   <Route path="/admin/customers" element={<Customers />} />

</Route>

    </Routes>
  );
}

export default App;
