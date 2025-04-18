import CreateProductForm from "../components/CreateProductForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from '../src/pages/AuthPages';

function App() {
  const sellerId = 1;
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
