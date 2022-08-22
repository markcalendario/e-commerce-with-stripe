import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import { LoggedInProtectedRoute } from "./Pages/RouteProtection";
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<LoggedInProtectedRoute redirect="/login" component={<Shop />} />} />
        <Route path="/shop/cart" element={<LoggedInProtectedRoute redirect="/login" component={<Cart />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
