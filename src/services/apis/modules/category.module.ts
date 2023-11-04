import axios from "axios";

export default {
    findMany: async function() {
        return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    },
}