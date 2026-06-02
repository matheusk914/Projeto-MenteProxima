import api from "./api";

export async function buscarClinicas() {
    const resposta = await api.get("/servicos");
    return resposta.data;
}

export async function cadastrarClinica(dados) {
    const resposta = await api.post("/servicos", dados);
    return resposta.data;
}

export async function editarClinica(id, dados) {
    const resposta = await api.put("/servicos/" + id, dados);
    return resposta.data;
}

export async function deletarClinica(id) {
    await api.delete("/servicos/" + id);
    return true;
}
