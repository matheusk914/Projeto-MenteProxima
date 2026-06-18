import { useState } from "react";
import { ProvedorAutenticacao, useAutenticacao } from "./contexto/ContextoAutenticacao";
import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Dashboard from "./paginas/Dashboard";
import DashboardAvaliacoes from "./paginas/DashboardAvaliacoes";
import CadastroFuncionario from "./paginas/CadastroFuncionario";

function Conteudo() {
    const [paginaAtual, setPaginaAtual] = useState("home");
    const { usuario, carregando, salvarLogin, fazerLogout } = useAutenticacao();

    function irPara(destino) {
        const paginasRestritas = ["dashboard", "dashboardAvaliacoes", "cadastroFuncionario"];
        if (paginasRestritas.includes(destino) && !usuario) {
            setPaginaAtual("login");
        } else {
            setPaginaAtual(destino);
        }
    }

    function salvarLoginENavegar(dadosUsuario, dadosToken) {
        salvarLogin(dadosUsuario, dadosToken);
        if (dadosUsuario.role === "admin") {
            setPaginaAtual("dashboard");
        } else {
            setPaginaAtual("home");
        }
    }

    function fazerLogoutENavegar() {
        fazerLogout();
        setPaginaAtual("home");
    }

    if (carregando) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f5f7f5",
                gap: "16px"
            }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    background: "#e8f5ef",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    border: "1.5px solid #b8dfcc"
                }}>🧠</div>
                <p style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: "500"
                }}>Carregando...</p>
            </div>
        );
    }

    if (paginaAtual === "login") {
        return <Login irPara={irPara} salvarLogin={salvarLoginENavegar} />;
    }

    if (paginaAtual === "cadastro") {
        return <Cadastro irPara={irPara} salvarLogin={salvarLoginENavegar} />;
    }

    if (paginaAtual === "dashboard") {
        return (
            <Dashboard
                usuario={usuario}
                irPara={irPara}
                fazerLogout={fazerLogoutENavegar}
            />
        );
    }

    if (paginaAtual === "dashboardAvaliacoes") {
        return (
            <DashboardAvaliacoes
                usuario={usuario}
                irPara={irPara}
                fazerLogout={fazerLogoutENavegar}
            />
        );
    }

    if (paginaAtual === "cadastroFuncionario") {
        return (
            <CadastroFuncionario
                usuario={usuario}
                irPara={irPara}
                fazerLogout={fazerLogoutENavegar}
            />
        );
    }

    return (
        <Home
            usuario={usuario}
            irPara={irPara}
            fazerLogout={fazerLogoutENavegar}
        />
    );
}

function App() {
    return (
        <ProvedorAutenticacao>
            <Conteudo />
        </ProvedorAutenticacao>
    );
}

export default App;
