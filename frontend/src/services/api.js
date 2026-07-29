import axios from "axios";


const baseURL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_URL || "";


const api = axios.create({

  baseURL,

  headers: {

    "Content-Type": "application/json",

  },

});



// Tự động gắn JWT vào mọi request

api.interceptors.request.use(

  (config)=>{


    const token =

      localStorage.getItem("token") ||

      localStorage.getItem("access_token");



    if(token){

      config.headers.Authorization = `Bearer ${token}`;

    }


    return config;

  },


  (error)=>{

    return Promise.reject(error);

  }

);



export default api;