import { useState } from "react";
import "./auth.css";
import { fazerLogin } from "../servicos/authService";

function obterTextoEntrar(carregando) {
    if (carregando) return "Entrando...";
    return "Entrar";
}

function Login({ irPara, salvarLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [avisoDemora, setAvisoDemora] = useState(false);

    async function entrar(evento) {
        evento.preventDefault();
        setErro("");
        setAvisoDemora(false);

        if (!email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        setCarregando(true);

        const timerAviso = setTimeout(function () {
            setAvisoDemora(true);
        }, 5000);

        try {
            const dados = await fazerLogin(email, senha);
            salvarLogin(dados.user, dados.token);
        } catch (err) {
            setErro(err.message);
        } finally {
            clearTimeout(timerAviso);
            setCarregando(false);
            setAvisoDemora(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-marca">
                    <div className="auth-marca-icone">🧠</div>
                    <h1>Mente <span>Próxima</span></h1>
                </div>

                <h2>Boas-vindas de volta</h2>
                <p className="auth-subtitulo">Entre na sua conta para continuar</p>

                <form onSubmit={entrar} className="auth-form">
                    <div className="campo">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={function (e) { setEmail(e.target.value); }}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={senha}
                            onChange={function (e) { setSenha(e.target.value); }}
                            disabled={carregando}
                            required
                        />
                    </div>

                    {erro && <p className="erro">⚠️ {erro}</p>}

                    {avisoDemora && (
                        <p className="aviso-demora">
                            ⏳ O servidor está acordando, isso pode levar até 1 minuto na
                            primeira vez do dia. Por favor, aguarde…
                        </p>
                    )}

                    <button type="submit" className="btn-principal" disabled={carregando}>
                        {obterTextoEntrar(carregando)}
                    </button>
                </form>

                <div className="auth-rodape">
                    <p>Não tem conta?</p>
                    <button className="btn-link" onClick={function () { irPara("cadastro"); }}>
                        Criar conta grátis
                    </button>
                    <button className="btn-link-secundario" onClick={function () { irPara("home"); }}>
                        Voltar para o início
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
