import { useState } from "react";
import "./Home.css";
import { buscarClinicas } from "../servicos/clinicaService";
import { useGeolocalizacao } from "../servicos/useGeolocalizacao";
import { BotoesLogado, BotoesDeslogado } from "../componentes/BotoesHeader";
import ResultadosClinicas from "../componentes/ResultadosClinicas";
import SecaoSobre from "../componentes/SecaoSobre";

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
}

function Home({ usuario, irPara, fazerLogout }) {
    const [clinicas, setClinicas] = useState([]);
    const [cidade, setCidade] = useState("");
    const [mostraResultados, setMostraResultados] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const { localizando, obterPosicao } = useGeolocalizacao();

    const buscando = carregando || localizando;

    async function buscarPorCidade(evento) {
        evento.preventDefault();
        setCarregando(true);
        try {
            const todas = await buscarClinicas();
            const filtradas = todas.filter(function (clinica) {
                return clinica.cidade.toLowerCase().includes(cidade.toLowerCase());
            });
            setClinicas(filtradas);
            setMostraResultados(true);
        } catch (erro) {
            alert("Erro ao buscar: " + erro.message);
        } finally {
            setCarregando(false);
        }
    }

    async function buscarPorLocalizacao() {
        try {
            const coords = await obterPosicao();
            const todas = await buscarClinicas();

            const proximas = todas
                .map(function (clinica) {
                    return {
                        ...clinica,
                        distancia: calcularDistancia(
                            coords.latitude,
                            coords.longitude,
                            clinica.latitude,
                            clinica.longitude
                        ),
                    };
                })
                .filter(function (clinica) {
                    return clinica.distancia <= 50;
                })
                .sort(function (a, b) {
                    return a.distancia - b.distancia;
                })
                .map(function (clinica) {
                    return { ...clinica, distancia: clinica.distancia + " km" };
                });

            setClinicas(proximas);
            setMostraResultados(true);
        } catch (erro) {
            alert(erro.message);
        }
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="marca">
                    <div className="marca-icone">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
                            <line x1="12" y1="16" x2="12" y2="16.01"/>
                        </svg>
                    </div>
                    <h1>Mente <span>Próxima</span></h1>
                </div>

                <div className="header-botoes">
                    {usuario && (
                        <BotoesLogado usuario={usuario} irPara={irPara} fazerLogout={fazerLogout} />
                    )}
                    {!usuario && (
                        <BotoesDeslogado irPara={irPara} />
                    )}
                </div>
            </header>

            <section className="busca-section">
                <div className="busca-mapa-fundo" aria-hidden="true">
                    <img src="/mapa-fundo.jpg" alt="" />
                </div>
                <h2>Psicólogos perto de você</h2>
                <p className="busca-subtitulo">
                    Encontre clínicas de saúde mental na sua região e agende sua consulta com facilidade.
                </p>

                <form onSubmit={buscarPorCidade} className="busca-form">
                    <input
                        type="text"
                        placeholder="Digite o nome da cidade"
                        value={cidade}
                        onChange={function (e) { setCidade(e.target.value); }}
                        disabled={buscando}
                        required
                    />
                    <button type="submit" className="btn-azul" disabled={buscando}>
                        {carregando ? "Buscando..." : "Buscar"}
                    </button>
                </form>

                <div className="ou-divider">ou</div>

                <button
                    className="btn-localizacao"
                    onClick={buscarPorLocalizacao}
                    disabled={buscando}
                >
                    {localizando ? "Localizando..." : "Usar minha localização"}
                </button>
            </section>

            {mostraResultados && (
                <section className="resultados-section">
                    <h2>
                        Clínicas encontradas
                        <span className="contagem">{clinicas.length}</span>
                    </h2>
                    <ResultadosClinicas clinicas={clinicas} usuario={usuario} />
                </section>
            )}
            {!mostraResultados && <SecaoSobre />}
        </div>
    );
}

export default Home;
