import axios from "axios";

const URL_BASE =
    import.meta.env.VITE_API_URL ||
    "https://trabalho-saude-mental-1.onrender.com";

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

api.interceptors.response.use(
    function (resposta) {
        return resposta;
    },
    function (erro) {
        if (erro.code === "ECONNABORTED") {
            return Promise.reject(
                new Error("O servidor demorou muito para responder. Tente novamente.")
            );
        }
        const mensagem =
            erro.response?.data?.error ||
            erro.response?.data?.message ||
            erro.message ||
            "Erro inesperado";
        return Promise.reject(new Error(mensagem));
    }
);

export default api;
