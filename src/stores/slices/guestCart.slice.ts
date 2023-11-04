import { Product } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

interface CartItemType {
    [x: string]: any;
    quantity: number,
    option: {
        id: string;
        name: string;
        productId: string;
        product: Product;
        picuture: {
            id: string;
            icon: string;
        };
    };
}

interface GuestCartState {
    cart: CartItemType[]
}

const initialState: GuestCartState = {
    cart: []
}

const GuestCartSlice = createSlice({
    name: "guest-cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})

export const guestCartReducer = GuestCartSlice.reducer;
export const guestCartActions = GuestCartSlice.actions;