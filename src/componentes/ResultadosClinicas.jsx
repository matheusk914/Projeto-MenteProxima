import BadgeGratuidade from "./BadgeGratuidade";

function ResultadosClinicas({ clinicas }) {
    if (clinicas.length === 0) {
        return (
            <p className="sem-resultados">
                Nenhuma clínica encontrada para essa busca.
            </p>
        );
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
                    </div>
                );
            })}
        </div>
    );
}

export default ResultadosClinicas;
