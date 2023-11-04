import axios from "axios";

export default {
    googleLogin: async (data: any) => {
        return await axios.post(
            import.meta.env.VITE_SV_HOST + "user/google-login",
            data,
        )
    },
    register: async function (data: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "user", data)
    },
    login: async function (data: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "user/login", data)
    },
    authentication: async function () {
        return await axios.post(import.meta.env.VITE_SV_HOST + "authen")
    },
    resendemail: async function () {
        return await axios.get(import.meta.env.VITE_SV_HOST + "user/resend-email")
    },
    resetPassword: async (data: any) => {
        return await axios.post(import.meta.env.VITE_SV_HOST + "user/reset-password", data)
    },
    changePassword: async (data: any) => {
        return await axios.post(import.meta.env.VITE_SV_HOST + "user/change-password", data)
    },
}