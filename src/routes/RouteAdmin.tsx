import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@/admin/Home"))()}>
        <Route path="add_product" element={Lazy(() => import("@/admin/Listproduct"))()}></Route>
        <Route path="add_category" element={Lazy(() => import("@/admin/Category"))()}></Route>
        <Route path="add_product/:id" element={Lazy(() => import("@/admin/Optionproduct"))()}></Route>

    </Route>