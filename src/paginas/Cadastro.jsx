import { useState } from "react";
import "./auth.css";
import { cadastrarUsuario, cadastrarDono } from "../servicos/authService";

function obterClasseTipoBotao(tipoBotao, tipoAtivo) {
    if (tipoBotao === tipoAtivo) return "tipo-btn ativo";
    return "tipo-btn";
}

function obterTextoCadastrar(carregando) {
    if (carregando) return "Criando conta...";
    return "Criar conta";
}

function Cadastro({ irPara, salvarLogin }) {
    const [form, setForm] = useState({
        tipo: "usuario",
        nome: "",
        email: "",
        senha: "",
        telefone: "",
    });

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    function atualizarCampo(campo, valor) {
        setForm({ ...form, [campo]: valor });
    }

    async function cadastrar(evento) {
        evento.preventDefault();
        setErro("");

        if (!form.nome || !form.email || !form.senha) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        if (form.senha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setCarregando(true);
        try {
            let dados;
            if (form.tipo === "usuario") {
                dados = await cadastrarUsuario(form.nome, form.email, form.senha, form.telefone);
            } else {
                dados = await cadastrarDono(form.nome, form.email, form.senha, form.telefone);
            }
            salvarLogin(dados.user, dados.token);
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-marca">
                    <div className="auth-marca-icone">🧠</div>
                    <h1>Mente <span>Próxima</span></h1>
                </div>

                <h2>Crie sua conta</h2>
                <p className="auth-subtitulo">Junte-se a milhares de pessoas cuidando da saúde mental</p>

                <div className="campo">
                    <label>Tipo de conta</label>
                    <div className="tipo-selector">
                        <button
                            type="button"
                            className={obterClasseTipoBotao("usuario", form.tipo)}
                            onClick={function () { atualizarCampo("tipo", "usuario"); }}
                            disabled={carregando}
                        >
                            👤 Sou Usuário
                        </button>
                        <button
                            type="button"
                            className={obterClasseTipoBotao("clinica", form.tipo)}
                            onClick={function () { atualizarCampo("tipo", "clinica"); }}
                            disabled={carregando}
                        >
                            🏥 Dono de Clínica
                        </button>
                    </div>
                </div>

                <form onSubmit={cadastrar} className="auth-form">
                    <div className="campo">
                        <label>Nome completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={form.nome}
                            onChange={function (e) { atualizarCampo("nome", e.target.value); }}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={function (e) { atualizarCampo("email", e.target.value); }}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.senha}
                            onChange={function (e) { atualizarCampo("senha", e.target.value); }}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Telefone <span style={{fontWeight:400,color:'var(--cinza-400)'}}>(opcional)</span></label>
                        <input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={form.telefone}
                            onChange={function (e) { atualizarCampo("telefone", e.target.value); }}
                            disabled={carregando}
                        />
                    </div>

                    {erro && <p className="erro">⚠️ {erro}</p>}

                    <button type="submit" className="btn-principal" disabled={carregando}>
                        {obterTextoCadastrar(carregando)}
                    </button>
                </form>

                <div className="auth-rodape">
                    <p>Já tem conta?</p>
                    <button className="btn-link" onClick={function () { irPara("login"); }}>
                        Fazer login
                    </button>
                    <button className="btn-link-secundario" onClick={function () { irPara("home"); }}>
                        Voltar para o início
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
