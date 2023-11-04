import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
import { productReducer } from './slices/product.slice';
import { categoryReducer } from './slices/category.slice';
import { receiptReducer } from './slices/receipt.slice';
import { guestCartReducer } from './slices/guestCart.slice';
// Kết hợp reducer
const rootReducer = combineReducers({
    userStore: userReducer,
    productStore: productReducer,
    categoryStore: categoryReducer,
    receiptStore: receiptReducer,
    guestCartStore: guestCartReducer
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
})

export default store