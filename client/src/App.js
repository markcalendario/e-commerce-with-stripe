import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import { LoggedInProtectedRoute } from "./Pages/RouteProtection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<LoggedInProtectedRoute redirect="/login" component={<Shop />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
