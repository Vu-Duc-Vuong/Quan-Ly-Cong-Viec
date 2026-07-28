import axios from "axios";

const api = axios.create({
  baseURL: "https://obscure-cod-r4pv4wwv95663x59p-3000.app.github.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;