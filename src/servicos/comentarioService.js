import api from "./api";

export async function buscarComentarios(servicoId) {
    const resposta = await api.get("/servicos/" + servicoId + "/comentarios");
    return resposta.data;
}

export async function criarComentario(servicoId, texto) {
    const resposta = await api.post("/servicos/" + servicoId + "/comentarios", {
        texto: texto,
    });
    return resposta.data;
}

export async function editarComentario(id, texto) {
    const resposta = await api.put("/comentarios/" + id, { texto: texto });
    return resposta.data;
}

export async function deletarComentario(id) {
    await api.delete("/comentarios/" + id);
    return true;
}
