import { useState, useEffect } from "react";
import "./Dashboard.css";
import { buscarAvaliacoes } from "../servicos/avaliacaoService";
import EstrelaAvaliacao from "../componentes/EstrelaAvaliacao";

function obterNome(usuario) {
    if (!usuario) return "Usuário";
    return usuario.name || usuario.nome || usuario.email || "Usuário";
}

function DashboardAvaliacoes({ usuario, irPara, fazerLogout }) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(function () {
        carregarAvaliacoes();
    }, []);

    async function carregarAvaliacoes() {
        setCarregando(true);
        try {
            const dados = await buscarAvaliacoes();
            setAvaliacoes(dados);
        } catch (err) {
            setErro("Erro ao carregar avaliações: " + err.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>
                    <span className="marca-icone-dash">🧠</span>
                    <span className="dash-titulo">Mente Próxima — Painel</span>
                </h1>
                <div className="header-info">
                    <span>👤 {obterNome(usuario)}</span>
                    <button className="btn" onClick={function () { irPara("dashboard"); }}>
                        🏥 Clínicas
                    </button>
                    <button className="btn" onClick={fazerLogout}>
                        Sair
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-topo">
                    <h2>⭐ Avaliações recebidas</h2>
                </div>

                {erro && <p className="msg-erro">⚠️ {erro}</p>}

                {carregando && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        color: "var(--cinza-400)",
                        padding: "48px 0",
                        justifyContent: "center"
                    }}>
                        <span>Carregando avaliações...</span>
                    </div>
                )}

                {!carregando && avaliacoes.length === 0 && (
                    <div className="sem-resultados">
                        <p>Nenhuma avaliação recebida ainda.</p>
                    </div>
                )}

                {!carregando && avaliacoes.length > 0 && (
                    <div className="clinicas-grid">
                        {avaliacoes.map(function (avaliacao) {
                            return (
                                <div key={avaliacao.id} className="clinica-card">
                                    <div className="avaliacao-topo">
                                        <EstrelaAvaliacao nota={avaliacao.nota} />
                                        <span className="avaliacao-nota-numero">{avaliacao.nota}/5</span>
                                    </div>
                                    <p className="tipo">💼 Serviço ID: {avaliacao.servico_id}</p>
                                    <p>👤 {avaliacao.nome_usuario || avaliacao.nomeUsuario || avaliacao.user_name || avaliacao.userName || "Usuário"}</p>
                                    <p className="avaliacao-comentario">💬 {avaliacao.comentario}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default DashboardAvaliacoes;
