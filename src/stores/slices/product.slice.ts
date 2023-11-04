import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/product.interface";


const initialState: {
    data: null | undefined | Product[]
} = {
    data: null
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        insertProduct: function (state, action) {
            state.data?.push(action.payload)
        },
        setDataApi: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        insertOptionProduct: function (state, action) {
            return {
                ...state,
                data: state.data?.map((product) => {
                    if (product.id === action.payload.productId) {
                        return {
                            ...product,
                            options: [...product.options, action.payload]
                        };
                    }
                    return product;
                })
            };
        },
        insertPictureOptionProduct: function (state, action) {
            return {
                ...state,
                data: state.data?.map((product) => {
                    if (product.id === action.payload.productId) {
                        return {
                            ...product,
                            options: product.options.map(item => {
                                if (item.id == action.payload.optionId) {
                                    console.log("action.payload.pictures", action.payload.pictures)
                                    return {
                                        ...item,
                                        pictures: [...(action.payload.pictures)]
                                    }
                                }
                                return item
                            })
                        };
                    }
                    return product;
                })
            };
        },

        updateProduct: function (state, action) {
            const updatedProduct = action.payload.updatedProduct;
            console.log("updatedProduct", updatedProduct);

            state.data = state.data?.map((product) => {
                if (product.id === updatedProduct.id) {
                    return updatedProduct;
                }
                return product;
            });
        },
        updateOption: (state, action) => {
            const updatedOption = action.payload.updatedOption;
            // const productId = action.payload.productId;
            console.log("updatedOption", updatedOption);
            // console.log("productId", productId);

            state.data = state.data?.map((product) => {
                if (product.id === updatedOption.productId) {
                    return {
                        ...product,
                        options: product.options.map((option) => {
                            if (option.id === updatedOption.id) {
                                return updatedOption;
                            }
                            return option;
                        }),
                    };
                }
                return product;
            });
        },



    }
})

export const productAction = {
    ...productSlice.actions
}

export const productReducer = productSlice.reducer