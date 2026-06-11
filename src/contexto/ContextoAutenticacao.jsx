import { createContext, useContext, useState, useEffect } from "react";

const ContextoAutenticacao = createContext(null);

export function ProvedorAutenticacao({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(function () {
        const usuarioSalvo = localStorage.getItem("usuario");
        const tokenSalvo = localStorage.getItem("token");

        if (usuarioSalvo && tokenSalvo) {
            try {
                setUsuario(JSON.parse(usuarioSalvo));
                setToken(tokenSalvo);
            } catch (err) {
                localStorage.removeItem("usuario");
                localStorage.removeItem("token");
            }
        }

        setCarregando(false);
    }, []);

    function salvarLogin(dadosUsuario, dadosToken) {
        setUsuario(dadosUsuario);
        setToken(dadosToken);
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        localStorage.setItem("token", dadosToken);
    }

    function fazerLogout() {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    }

    return (
        <ContextoAutenticacao.Provider
            value={{ usuario, token, carregando, salvarLogin, fazerLogout }}
        >
            {children}
        </ContextoAutenticacao.Provider>
    );
}

export function useAutenticacao() {
    return useContext(ContextoAutenticacao);
}
