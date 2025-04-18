import CreateProductForm from "../components/CreateProductForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from '../src/pages/AuthPages';
import AddProduct from "./pages/Seller/AddProduct";

function App() {
  const sellerId = 1;
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/add-product" element={<AddProduct />}/>
      </Routes>
    </>
  );
}

export default App;
