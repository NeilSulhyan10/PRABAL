import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Buyer/LandingPage";
import "flowbite";
import Cart from "./Pages/Buyer/Cart";
import SellerDashboard from "./Pages/Seller/Dashboard";
import AddProduct from "./Pages/Seller/AddProduct";
import ProductStats from "./Pages/Seller/ProductStats";
import AuthPage from "../src/Pages/AuthPages";
import Profile from "./Pages/Buyer/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/stats" element={<ProductStats />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
