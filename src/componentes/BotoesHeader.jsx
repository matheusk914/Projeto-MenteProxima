function obterNome(usuario) {
    if (!usuario) return "Usuário";
    return usuario.name || usuario.nome || usuario.email || "Usuário";
}

function obterRole(usuario) {
    if (!usuario) return null;
    return usuario.role || usuario.tipo || usuario.perfil || null;
}

function ehAdmin(usuario) {
    const role = obterRole(usuario);
    if (!role) return false;
    const roleLower = role.toLowerCase();
    return roleLower === "admin" || roleLower === "dono" || roleLower === "owner";
}

function BotoesLogado({ usuario, irPara, fazerLogout }) {
    return (
        <>
            <span>👤 {obterNome(usuario)}</span>
            {ehAdmin(usuario) && (
                <button className="btn" onClick={function () { irPara("dashboard"); }}>
                    🏥 Clínicas
                </button>
            )}
            {ehAdmin(usuario) && (
                <button className="btn" onClick={function () { irPara("dashboardAvaliacoes"); }}>
                    ⭐ Avaliações
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
