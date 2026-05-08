import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/homepage";
import "./App.css";
import Footer from "./components/layouts/Footer";
import ListPage from "./pages/listpage";
import ProductDetail from "./pages/productdetail";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import ProtectedRoute from "./components/fragments/ProtectedRoute";
import CartPage from "./pages/cartpage";
import CheckoutPage from "./pages/checkoutpage";
import OrderPage from "./pages/orderpage";

function App() {
  const location = useLocation();

  const navbarHidden = ["/auth/signin", "/auth/signup"];
  const shouldHideNavbar = navbarHidden.some((route) =>
    location.pathname.startsWith(route),
  );

  const footerHidden = ["/auth/signin", "/auth/signup"];
  const shouldHideFooter = footerHidden.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:slug" element={<ListPage />} />
        <Route
          path="/products/:slug"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-list"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
