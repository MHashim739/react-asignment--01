import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Navbar from "./components/Navbar/Navbar";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Cart from "./components/Cart/Cart";
import Filter from "./pages/Filter/Filter";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
    <AnnouncementBar/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
          <Route
    path="/cart"
    element={<Cart/>}
  />
  <Route path="/filter" element={<Filter />} />
      </Routes>
      <Newsletter/>
      <Footer/>
    </>
  );
}

export default App;