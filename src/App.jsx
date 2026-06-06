import { useState } from "react";
import { ProvedorAutenticacao, useAutenticacao } from "./contexto/ContextoAutenticacao";
import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Dashboard from "./paginas/Dashboard";
import DashboardAvaliacoes from "./paginas/DashboardAvaliacoes";

function Conteudo() {
    const [paginaAtual, setPaginaAtual] = useState("home");

    const { usuario, carregando, salvarLogin, fazerLogout } = useAutenticacao();

    function irPara(destino) {
        if ((destino === "dashboard" || destino === "dashboardAvaliacoes") && !usuario) {
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Carregando...</p>
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
/// comentário para resolver conflito de merge