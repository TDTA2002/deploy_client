import axios from "axios";

export default {
    create: async function (newProduct: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", newProduct)
    },
    option: async function (newOption: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "product-options", newOption)
    },
    picture: async function (optionId: any, formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + `option-pictures/${optionId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    findAll: async function () {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}products`);
    },
    findMany: async function (take: number, skip: number) {
        return await axios.get(`https://deployserver-production-76d9.up.railway.app/api/v2/products?take=${take}&skip=${skip}`);
    },
    findById: async function (productId: string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + "products/" + productId)
    },
    findByCategory: async function (productId: string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + "products/category" + productId)
    },
    search: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}products/search?q=${searchString}`)
    },

    update: async function (productId: string, formData: any) {
        return await axios.patch(import.meta.env.VITE_SV_HOST + "products/" + productId, formData)
    },

    updateoption: async function (productId: string, formData: any) {
        return await axios.patch(import.meta.env.VITE_SV_HOST + "product-options/" + productId, formData)
    },
}