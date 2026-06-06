import { useState } from "react";
import BadgeGratuidade from "./BadgeGratuidade";
import AvaliacoesClinica from "./AvaliacoesClinica";

function ListaClinicas({ clinicas, abrirFormEditar, removerClinica, usuario }) {
    const [clinicaAberta, setClinicaAberta] = useState(null);

    if (clinicas.length === 0) {
        return <p>Nenhuma clínica cadastrada ainda.</p>;
    }

    function alternarAvaliacoes(id) {
        if (clinicaAberta === id) {
            setClinicaAberta(null);
        } else {
            setClinicaAberta(id);
        }
    }

    return clinicas.map(function (clinica) {
        return (
            <div key={clinica.id} className="clinica-card">
                <h4>{clinica.nome}</h4>
                <p className="tipo">💼 {clinica.tipo}</p>
                <p>🏷️ {clinica.categoria}</p>
                <p>📌 {clinica.endereco}</p>
                <p>📍 {clinica.cidade}</p>
                <p>📞 {clinica.telefone}</p>
                <BadgeGratuidade gratuito={clinica.gratuito} />
                <div className="card-botoes">
                    <button
                        className="btn-pequeno"
                        onClick={function () { abrirFormEditar(clinica); }}
                    >
                        ✏️ Editar
                    </button>
                    <button
                        className="btn-pequeno btn-vermelho"
                        onClick={function () { removerClinica(clinica.id); }}
                    >
                        🗑️ Deletar
                    </button>
                </div>

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
    });
}

export default ListaClinicas;
