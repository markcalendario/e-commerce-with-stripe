import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import { LoggedInProtectedRoute } from "./Pages/RouteProtection";
import Cart from "./Pages/Cart";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentCancelled from "./Pages/PaymentCancelled";
import Purchases from "./Pages/Purchases";
import AdminLogin from "./Pages/AdminLogin";
import Admin from "./Pages/Admin";
import { AdminProtectedRoute } from "./Pages/AdminRouteProtection";
import Orders from "./Pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<LoggedInProtectedRoute redirect="/login" component={<Shop />} />} />
        <Route path="/shop/cart" element={<LoggedInProtectedRoute redirect="/login" component={<Cart />} />} />
        <Route path="/purchase-success/:paymentToken" element={<PaymentSuccess />} />
        <Route path="/purchase-cancelled" element={<PaymentCancelled />} />
        <Route path="/purchases" element={<LoggedInProtectedRoute redirect="/login" component={<Purchases />} />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute redirect='/login' component={<Admin />} />} />
        <Route path="/orders" element={<AdminProtectedRoute redirect='/login' component={<Orders />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
