import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
  <>
    <Route path="/products" element={Lazy(() => import("@pages/Listproducts/Products"))()}>
    </Route>
    <Route path="products/:categoryId" element={Lazy(() => import("@pages/Listproducts/Products"))()}></Route>
    <Route path="product/detail/:id" element={Lazy(() => import("@pages/Listproducts/ProductDetail/ProductDetail"))()}></Route>

  </>