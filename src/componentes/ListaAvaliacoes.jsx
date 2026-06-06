import EstrelaAvaliacao from "./EstrelaAvaliacao";

function ListaAvaliacoes({ avaliacoes, abrirFormEditar, removerAvaliacao }) {
    if (avaliacoes.length === 0) {
        return <p>Nenhuma avaliação cadastrada ainda.</p>;
    }

    return avaliacoes.map(function (avaliacao) {
        return (
            <div key={avaliacao.id} className="clinica-card">
                <div className="avaliacao-topo">
                    <EstrelaAvaliacao nota={avaliacao.nota} />
                    <span className="avaliacao-nota-numero">{avaliacao.nota}/5</span>
                </div>
                <p className="tipo">💼 Serviço ID: {avaliacao.servicoId}</p>
                <p>👤 {avaliacao.nomeUsuario || "Usuário"}</p>
                <p>💬 {avaliacao.comentario}</p>
                <div className="card-botoes">
                    <button
                        className="btn-pequeno"
                        onClick={function () { abrirFormEditar(avaliacao); }}
                    >
                        ✏️ Editar
                    </button>
                    <button
                        className="btn-pequeno btn-vermelho"
                        onClick={function () { removerAvaliacao(avaliacao.id); }}
                    >
                        🗑️ Deletar
                    </button>
                </div>
            </div>
        );
    });
}

export default ListaAvaliacoes;
