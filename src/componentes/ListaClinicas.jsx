import BadgeGratuidade from "./BadgeGratuidade";

function ListaClinicas({ clinicas, abrirFormEditar, removerClinica }) {
    if (clinicas.length === 0) {
        return <p>Nenhuma clínica cadastrada ainda.</p>;
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
            </div>
        );
    });
}

export default ListaClinicas;
