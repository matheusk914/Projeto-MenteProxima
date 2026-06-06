import { useState } from "react";
import BadgeGratuidade from "./BadgeGratuidade";
import AvaliacoesClinica from "./AvaliacoesClinica";

function ResultadosClinicas({ clinicas, usuario }) {
    const [clinicaAberta, setClinicaAberta] = useState(null);

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
        <div className="clinicas-grid">
            {clinicas.map(function (clinica) {
                return (
                    <div key={clinica.id} className="clinica-card">
                        <h3>{clinica.nome}</h3>
                        <p className="tipo">💼 {clinica.tipo}</p>
                        <p>🏷️ {clinica.categoria}</p>
                        <p>📌 {clinica.endereco}</p>
                        <p>📍 {clinica.cidade}</p>
                        <p>📞 {clinica.telefone}</p>
                        {clinica.distancia && (
                            <p className="distancia">🗺️ {clinica.distancia}</p>
                        )}
                        <BadgeGratuidade gratuito={clinica.gratuito} />

                        <button
                            className="btn-ver-avaliacoes"
                            onClick={function () { alternarAvaliacoes(clinica.id); }}
                        >
                            {clinicaAberta === clinica.id
                                ? "▲ Ocultar avaliações"
                                : "▼ Ver avaliações"}
                        </button>

                        {clinicaAberta === clinica.id && (
                            <AvaliacoesClinica
                                servicoId={clinica.id}
                                usuario={usuario}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ResultadosClinicas;
