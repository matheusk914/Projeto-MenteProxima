import EstrelaAvaliacao from "./EstrelaAvaliacao";

function ResultadosAvaliacoes({ avaliacoes }) {
    if (avaliacoes.length === 0) {
        return (
            <p className="sem-resultados">
                Nenhuma avaliação encontrada para este serviço.
            </p>
        );
    }

    return (
        <div className="avaliacoes-lista">
            {avaliacoes.map(function (avaliacao) {
                return (
                    <div key={avaliacao.id} className="avaliacao-card">
                        <div className="avaliacao-topo">
                            <EstrelaAvaliacao nota={avaliacao.nota} />
                            <span className="avaliacao-nota-numero">{avaliacao.nota}/5</span>
                            <span className="avaliacao-autor">👤 {avaliacao.nomeUsuario || "Usuário"}</span>
                        </div>
                        <p className="avaliacao-comentario">💬 {avaliacao.comentario}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ResultadosAvaliacoes;
