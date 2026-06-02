function obterNome(usuario) {
    if (!usuario) return "Usuário";
    return usuario.nome || usuario.email || "Usuário";
}

function BotoesLogado({ usuario, irPara, fazerLogout }) {
    return (
        <>
            <span>👤 {obterNome(usuario)}</span>
            {usuario.role === "admin" && (
                <button className="btn" onClick={function () { irPara("dashboard"); }}>
                    Painel
                </button>
            )}
            <button className="btn" onClick={fazerLogout}>
                Sair
            </button>
        </>
    );
}

function BotoesDeslogado({ irPara }) {
    return (
        <>
            <button className="btn" onClick={function () { irPara("login"); }}>
                Entrar
            </button>
            <button className="btn-azul" onClick={function () { irPara("cadastro"); }}>
                Cadastrar
            </button>
        </>
    );
}

export { BotoesLogado, BotoesDeslogado };
