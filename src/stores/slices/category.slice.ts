import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
    [x: string]: any;
    data: any
}

const initialState: CategoryState = {
    data: null
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryData: (_state, action) => {
            return {
                data: action.payload
            }
        }
    }
})

export const categoryAction = {
    ...categorySlice.actions
}

export const categoryReducer = categorySlice.reducer