import { useState } from "react";
import BadgeGratuidade from "./BadgeGratuidade";
import AvaliacoesClinica from "./AvaliacoesClinica";
import SecaoComentarios from "./SecaoComentarios";
import EstrelaAvaliacao from "./EstrelaAvaliacao";

const ICONES_CATEGORIA = {
    psicologia: "🧠",
    psiquiatria: "🏥",
    psicanálise: "💭",
    tcc: "📋",
    familiar: "👨‍👩‍👧",
    infantil: "🌱",
    ansiedade: "💆",
    depressão: "💙",
    trauma: "🤝",
    mindfulness: "🌿",
    burnout: "🔥",
    default: "🏥",
};

function obterIcone(tipo, categoria) {
    const texto = ((tipo || "") + " " + (categoria || "")).toLowerCase();
    for (const [chave, icone] of Object.entries(ICONES_CATEGORIA)) {
        if (texto.includes(chave)) return icone;
    }
    return ICONES_CATEGORIA.default;
}

function ResultadosClinicas({ clinicas, usuario }) {
    const [clinicaAberta, setClinicaAberta] = useState(null);
    const [comentarioAberto, setComentarioAberto] = useState(null);

    if (clinicas.length === 0) {
        return (
            <p className="sem-resultados">
                Nenhuma clínica encontrada para essa busca.
            </p>
        );
    }

    function alternarAvaliacoes(id) {
        if (clinicaAberta === id) {
            setClinicaAberta(null);
        } else {
            setClinicaAberta(id);
        }
    }

    return (
        <>
            <div className="clinicas-lista-view">
                {clinicas.map(function (clinica, idx) {
                    const icone = obterIcone(clinica.tipo, clinica.categoria);
                    const aberta = clinicaAberta === clinica.id;
                    return (
                        <div
                            key={clinica.id}
                            className="clinica-list-card"
                            style={{ animationDelay: idx * 0.06 + "s" }}
                        >
                            <div className="clinica-list-main">
                                <div className="clinica-list-avatar">
                                    {icone}
                                </div>
                                <div className="clinica-list-info">
                                    <div className="clinica-list-topo">
                                        <h3 className="clinica-list-nome">{clinica.nome}</h3>
                                        <BadgeGratuidade gratuito={clinica.gratuito} />
                                    </div>
                                    <div className="clinica-list-tags">
                                        {clinica.tipo && (
                                            <span className="clinica-tag">{clinica.tipo}</span>
                                        )}
                                        {clinica.categoria && clinica.categoria.split(",").map(function (cat, i) {
                                            return (
                                                <span key={i} className="clinica-tag">{cat.trim()}</span>
                                            );
                                        })}
                                    </div>
                                    <div className="clinica-list-meta">
                                        {clinica.distancia && (
                                            <span className="clinica-meta-item clinica-meta-dist">
                                                📍 {clinica.distancia}
                                            </span>
                                        )}
                                        {clinica.cidade && (
                                            <span className="clinica-meta-item">
                                                🏙️ {clinica.cidade}
                                            </span>
                                        )}
                                        {clinica.telefone && (
                                            <span className="clinica-meta-item">
                                                📞 {clinica.telefone}
                                            </span>
                                        )}
                                        {clinica.endereco && (
                                            <span className="clinica-meta-item clinica-meta-end">
                                                📌 {clinica.endereco}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="clinica-list-acoes">
                                    <button
                                        className="btn-ver-perfil"
                                        onClick={function () { alternarAvaliacoes(clinica.id); }}
                                    >
                                        {aberta ? "Ocultar" : "Ver avaliações"}
                                    </button>
                                    <button
                                        className="btn-comentarios-list"
                                        onClick={function () { setComentarioAberto(clinica); }}
                                    >
                                        💬 Comentários
                                    </button>
                                </div>
                            </div>

                            {aberta && (
                                <div className="clinica-list-expand">
                                    <AvaliacoesClinica
                                        servicoId={clinica.id}
                                        usuario={usuario}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {comentarioAberto && (
                <SecaoComentarios
                    servicoId={comentarioAberto.id}
                    servicoNome={comentarioAberto.nome}
                    usuario={usuario}
                    aoFechar={function () { setComentarioAberto(null); }}
                />
            )}
        </>
    );
}

export default ResultadosClinicas;
