import { useState } from "react";

function formatarData(dataString) {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function ItemComentario({ comentario, usuarioAtual, onEditar, onDeletar }) {
    const [editando, setEditando] = useState(false);
    const [textoEdit, setTextoEdit] = useState(comentario.texto);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    const ehDono = usuarioAtual && usuarioAtual.id === comentario.usuario_id;
    const ehAdmin = usuarioAtual && usuarioAtual.role === "admin";
    const podeEditar = ehDono;
    const podeDeletar = ehDono || ehAdmin;

    async function salvarEdicao() {
        if (!textoEdit.trim()) {
            setErro("O comentário não pode estar vazio.");
            return;
        }
        if (textoEdit.trim().length > 1000) {
            setErro("O comentário não pode ultrapassar 1000 caracteres.");
            return;
        }
        setErro("");
        setSalvando(true);
        try {
            await onEditar(comentario.id, textoEdit.trim());
            setEditando(false);
        } catch (err) {
            setErro(err.message);
        } finally {
            setSalvando(false);
        }
    }

    function cancelarEdicao() {
        setTextoEdit(comentario.texto);
        setErro("");
        setEditando(false);
    }

    return (
        <div className="comentario-item">
            <div className="comentario-cabecalho">
                <span className="comentario-autor">👤 {comentario.nome_usuario}</span>
                <span className="comentario-data">{formatarData(comentario.criado_em)}</span>
            </div>

            {editando ? (
                <div className="comentario-edicao">
                    <textarea
                        className="comentario-textarea"
                        value={textoEdit}
                        onChange={function (e) { setTextoEdit(e.target.value); }}
                        disabled={salvando}
                        maxLength={1000}
                        rows={3}
                    />
                    <span className="comentario-contador">{textoEdit.length}/1000</span>
                    {erro && <p className="comentario-erro">⚠️ {erro}</p>}
                    <div className="comentario-botoes-edicao">
                        <button
                            className="btn-pequeno btn-azul-pequeno"
                            onClick={salvarEdicao}
                            disabled={salvando}
                        >
                            {salvando ? "Salvando..." : "✅ Salvar"}
                        </button>
                        <button
                            className="btn-pequeno"
                            onClick={cancelarEdicao}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <p className="comentario-texto">{comentario.texto}</p>
            )}

            {!editando && (podeEditar || podeDeletar) && (
                <div className="comentario-acoes">
                    {podeEditar && (
                        <button
                            className="btn-pequeno"
                            onClick={function () { setEditando(true); }}
                        >
                            ✏️ Editar
                        </button>
                    )}
                    {podeDeletar && (
                        <button
                            className="btn-pequeno btn-vermelho"
                            onClick={function () { onDeletar(comentario.id); }}
                        >
                            🗑️ Excluir
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ItemComentario;
