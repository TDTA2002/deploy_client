import axios from "axios";

export default {
    checktt: async function (body: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "guest", body)
    },
}