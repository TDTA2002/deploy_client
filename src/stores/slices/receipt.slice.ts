import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface ReceiptState {
    socket: Socket | null;
    cart: any | null;
    receipt: any[] | null;
}

const initialState: ReceiptState = {
    socket: null,
    cart: null,
    receipt: null
}

const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {
        connectSocket: function (state, action) {
            return {
                ...state,
                socket: action.payload
            }
        },
        setCart: function (state, action) {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})

export const receiptReducer = receiptSlice.reducer
export const receiptAction = receiptSlice.actions