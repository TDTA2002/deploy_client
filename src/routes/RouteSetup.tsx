import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from '@utils/lazies/Lazy';

/* Components */
import Home from '@pages/homes/Home';

/* Route Setup */
import RouteProduct from "./RouteProduct";
import RouteUser from "./RouteUser";
import RouteAdmin from "./RouteAdmin";
import HomeContent from "@/pages/homes/components/home/Home";
export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        {RouteAdmin}
        <Route path="/" element={<Home></Home>}>
          <Route index element={<HomeContent />}></Route>
          <Route path="/receipt" element={Lazy(() => import("@pages/receipt/Receipt"))()}>
          </Route>
          <Route path="/receipt/:id" element={Lazy(() => import("@pages/receiptDetail/Receiptdetail"))()}>
          </Route>
          <Route path="/otp" element={Lazy(() => import("@pages/otp/Otp"))()}>
          </Route>

          <Route path="/profile" element={Lazy(() => import("@pages/users/profile/Profile"))()}>
          </Route>
          {/* Products */}
          {RouteProduct}
        </Route>
        <Route path="/checkout" element={Lazy(() => import("@pages/checkout/Checkout"))()}>
        </Route>
        <Route path="/qrcode" element={Lazy(() => import("@/components/QrCode"))()}>
        </Route>

        {/* Users */}
        {RouteUser}
      </Routes>
    </BrowserRouter>
  )
}
