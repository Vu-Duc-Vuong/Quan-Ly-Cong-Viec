import axios from "axios";


const api = axios.create({

    baseURL: "https://special-tribble-5gxp9576w64p3p79q-3000.app.github.dev/",

    headers: {
        "Content-Type": "application/json"
    }

});


export default api;