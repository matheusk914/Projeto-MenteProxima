import api from "./api";

export async function fazerLogin(email, senha) {
    const resposta = await api.post("/auth/login", {
        email: email,
        password: senha,
    });
    return resposta.data;
}

export async function cadastrarUsuario(nome, email, senha, telefone) {
    const resposta = await api.post("/auth/signup", {
        nome: nome,
        email: email,
        password: senha,
        telefone: telefone,
    });
    return resposta.data;
}

export async function cadastrarDono(nome, email, senha, telefone) {
    const resposta = await api.post("/auth/admin/signup", {
        nome: nome,
        email: email,
        password: senha,
        telefone: telefone,
    });
    return resposta.data;
}
