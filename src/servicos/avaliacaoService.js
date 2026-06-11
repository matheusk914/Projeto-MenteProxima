import api from "./api";

export async function buscarAvaliacoes() {
    const resposta = await api.get("/avaliacoes");
    return resposta.data;
}

export async function buscarAvaliacoesPorServico(servicoId) {
    const resposta = await api.get("/avaliacoes");
    const todas = resposta.data;

    return todas.filter(function (av) {
        return parseInt(av.servico_id) === parseInt(servicoId);
    });
}

export async function cadastrarAvaliacao(dados) {
    const resposta = await api.post("/avaliacoes", {
        servico_id: dados.servicoId,
        usuario_id: dados.usuarioId,
        nota: dados.nota,
        comentario: dados.comentario,
    });
    return resposta.data;
}

export async function editarAvaliacao(id, dados) {
    const resposta = await api.put("/avaliacoes/" + id, {
        servico_id: dados.servicoId,
        usuario_id: dados.usuarioId,
        nota: dados.nota,
        comentario: dados.comentario,
    });
    return resposta.data;
}

export async function deletarAvaliacao(id) {
    await api.delete("/avaliacoes/" + id);
    return true;
}
