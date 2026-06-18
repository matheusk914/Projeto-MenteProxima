import axios from "axios";

const URL_BASE = "https://trabalho-saude-mental-1.onrender.com";

const api = axios.create({
    baseURL: URL_BASE,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 70000,
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

export default api;
