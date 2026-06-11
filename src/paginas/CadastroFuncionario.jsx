import { useState, useEffect } from "react";
import "./Dashboard.css";
import { cadastrarFuncionario, buscarFuncionarios, deletarFuncionario } from "../servicos/funcionarioService";

function obterNome(usuario) {
    if (!usuario) return "Usuário";
    return usuario.name || usuario.nome || usuario.email || "Usuário";
}

function obterTextoBotao(carregando) {
    if (carregando) return "Cadastrando...";
    return "Cadastrar Funcionário";
}

function CadastroFuncionario({ usuario, irPara, fazerLogout }) {
    const [form, setForm] = useState({ nome: "", email: "", senha: "", cargo: "" });
    const [funcionarios, setFuncionarios] = useState([]);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(function () {
        carregarFuncionarios();
    }, []);

    async function carregarFuncionarios() {
        try {
            const dados = await buscarFuncionarios();
            setFuncionarios(dados);
        } catch (err) {
            setErro("Erro ao carregar funcionários: " + err.message);
        }
    }

    if (!usuario || usuario.role !== "admin") {
        return (
            <div className="dashboard-container">
                <p className="msg-erro">⚠️ Acesso restrito a administradores.</p>
            </div>
        );
    }

    function atualizarCampo(campo, valor) {
        setForm({ ...form, [campo]: valor });
    }

    async function salvar(evento) {
        evento.preventDefault();
        setErro("");
        setSucesso("");

        if (!form.nome || !form.email || !form.senha || !form.cargo) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        setCarregando(true);
        try {
            await cadastrarFuncionario({
                nome: form.nome,
                email: form.email,
                senha: form.senha,
                cargo: form.cargo,
                servico_id: 1,
            });
            setSucesso("✅ Funcionário cadastrado com sucesso!");
            setForm({ nome: "", email: "", senha: "", cargo: "" });
            carregarFuncionarios();
        } catch (err) {
            setErro("Erro: " + err.message);
        } finally {
            setCarregando(false);
        }
    }

    async function removerFuncionario(id) {
        if (!window.confirm("Tem certeza que deseja deletar este funcionário?")) return;
        setErro("");
        try {
            await deletarFuncionario(id);
            setSucesso("✅ Funcionário deletado!");
            carregarFuncionarios();
        } catch (err) {
            setErro("Erro ao deletar: " + err.message);
        }
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>🧠 Mente Próxima — Painel</h1>
                <div className="header-info">
                    <span>👤 {obterNome(usuario)}</span>
                    <button className="btn" onClick={function () { irPara("dashboard"); }}>
                        🏥 Clínicas
                    </button>
                    <button className="btn" onClick={function () { irPara("dashboardAvaliacoes"); }}>
                        ⭐ Avaliações
                    </button>
                    <button className="btn" onClick={fazerLogout}>
                        Sair
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-topo">
                    <h2>👥 Cadastrar Funcionário</h2>
                </div>

                {sucesso && <p className="msg-sucesso">{sucesso}</p>}
                {erro && <p className="msg-erro">⚠️ {erro}</p>}

                <div className="form-card">
                    <form onSubmit={salvar}>
                        <div className="form-linha">
                            <input
                                type="text"
                                placeholder="Nome completo *"
                                value={form.nome}
                                onChange={function (e) { atualizarCampo("nome", e.target.value); }}
                                disabled={carregando}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Cargo / Função *"
                                value={form.cargo}
                                onChange={function (e) { atualizarCampo("cargo", e.target.value); }}
                                disabled={carregando}
                                required
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="E-mail *"
                            value={form.email}
                            onChange={function (e) { atualizarCampo("email", e.target.value); }}
                            disabled={carregando}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha *"
                            value={form.senha}
                            onChange={function (e) { atualizarCampo("senha", e.target.value); }}
                            disabled={carregando}
                            required
                        />
                        <div className="form-botoes">
                            <button type="submit" className="btn-azul" disabled={carregando}>
                                {obterTextoBotao(carregando)}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={function () { irPara("dashboard"); }}
                                disabled={carregando}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="dashboard-topo">
                    <h2>👥 Funcionários Cadastrados</h2>
                </div>

                {funcionarios.length === 0 && (
                    <p>Nenhum funcionário cadastrado ainda.</p>
                )}

                <div className="clinicas-grid">
                    {funcionarios.map(function (funcionario) {
                        return (
                            <div key={funcionario.id} className="clinica-card">
                                <h4>{funcionario.nome}</h4>
                                <p>💼 {funcionario.cargo}</p>
                                <p>📧 {funcionario.email}</p>
                                {funcionario.telefone && <p>📞 {funcionario.telefone}</p>}
                                <div className="card-botoes">
                                    <button
                                        className="btn-pequeno btn-vermelho"
                                        onClick={function () { removerFuncionario(funcionario.id); }}
                                    >
                                        🗑️ Deletar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default CadastroFuncionario;
