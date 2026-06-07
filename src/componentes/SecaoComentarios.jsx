import { useState, useEffect } from "react";
import {
    buscarComentarios,
    criarComentario,
    editarComentario,
    deletarComentario,
} from "../servicos/comentarioService";
import ItemComentario from "./ItemComentario";
import "./SecaoComentarios.css";

function SecaoComentarios({ servicoId, servicoNome, usuario, aoFechar }) {
    const [comentarios, setComentarios] = useState([]);
    const [novoTexto, setNovoTexto] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(function () {
        carregarComentarios();
    }, [servicoId]);

    async function carregarComentarios() {
        setCarregando(true);
        setErro("");
        try {
            const dados = await buscarComentarios(servicoId);
            setComentarios(dados);
        } catch (err) {
            setErro("Erro ao carregar comentários: " + err.message);
        } finally {
            setCarregando(false);
        }
    }

    async function enviarComentario(evento) {
        evento.preventDefault();
        if (!novoTexto.trim()) {
            setErro("O comentário não pode estar vazio.");
            return;
        }
        if (novoTexto.trim().length > 1000) {
            setErro("O comentário não pode ultrapassar 1000 caracteres.");
            return;
        }
        setErro("");
        setSucesso("");
        setEnviando(true);
        try {
            const criado = await criarComentario(servicoId, novoTexto.trim());
            setComentarios([criado, ...comentarios]);
            setNovoTexto("");
            setSucesso("✅ Comentário publicado!");
            setTimeout(function () { setSucesso(""); }, 3000);
        } catch (err) {
            setErro("Erro ao publicar: " + err.message);
        } finally {
            setEnviando(false);
        }
    }

    async function handleEditar(id, novoTexto) {
        const atualizado = await editarComentario(id, novoTexto);
        setComentarios(comentarios.map(function (c) {
            if (c.id === id) return atualizado;
            return c;
        }));
    }

    async function handleDeletar(id) {
        if (!window.confirm("Tem certeza que deseja excluir este comentário?")) return;
        try {
            await deletarComentario(id);
            setComentarios(comentarios.filter(function (c) { return c.id !== id; }));
            setSucesso("✅ Comentário excluído.");
            setTimeout(function () { setSucesso(""); }, 3000);
        } catch (err) {
            setErro("Erro ao excluir: " + err.message);
        }
    }

    return (
        <div className="comentarios-overlay" onClick={function (e) { if (e.target === e.currentTarget) aoFechar(); }}>
            <div className="comentarios-painel">
                <div className="comentarios-header">
                    <h3>💬 Comentários — {servicoNome}</h3>
                    <button className="comentarios-fechar" onClick={aoFechar}>✕</button>
                </div>

                <div className="comentarios-corpo">
                    {sucesso && <p className="msg-sucesso">{sucesso}</p>}
                    {erro && <p className="msg-erro">⚠️ {erro}</p>}

                    {usuario ? (
                        <form onSubmit={enviarComentario} className="comentario-form">
                            <textarea
                                className="comentario-textarea"
                                placeholder="Deixe seu comentário sobre este serviço..."
                                value={novoTexto}
                                onChange={function (e) { setNovoTexto(e.target.value); }}
                                disabled={enviando}
                                maxLength={1000}
                                rows={3}
                            />
                            <div className="comentario-form-rodape">
                                <span className="comentario-contador">{novoTexto.length}/1000</span>
                                <button type="submit" className="btn-azul" disabled={enviando}>
                                    {enviando ? "Publicando..." : "Publicar"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="comentarios-aviso">
                            🔒 Faça login para deixar um comentário.
                        </p>
                    )}

                    <div className="comentarios-lista">
                        {carregando && <p className="comentarios-carregando">Carregando comentários...</p>}

                        {!carregando && comentarios.length === 0 && (
                            <p className="comentarios-vazio">
                                Nenhum comentário ainda. Seja o primeiro a comentar!
                            </p>
                        )}

                        {comentarios.map(function (comentario) {
                            return (
                                <ItemComentario
                                    key={comentario.id}
                                    comentario={comentario}
                                    usuarioAtual={usuario}
                                    onEditar={handleEditar}
                                    onDeletar={handleDeletar}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecaoComentarios;
