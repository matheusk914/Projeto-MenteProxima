import api from "./api";

export async function buscarFuncionarios() {
    const resposta = await api.get("/funcionarios");
    return resposta.data;
}

export async function cadastrarFuncionario(dados) {
    const resposta = await api.post("/funcionarios", dados);
    return resposta.data;
}

export async function deletarFuncionario(id) {
    await api.delete("/funcionarios/" + id);
    return true;
}
