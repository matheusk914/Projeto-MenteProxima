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

function obterTextoBusca(carregando) {
    if (carregando) return "Buscando...";
    return "🔍 Buscar";
}

function obterTextoLocalizacao(localizando) {
    if (localizando) return "📍 Localizando...";
    return "📍 Usar minha localização";
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
        } catch (err) {
            alert("Erro ao buscar: " + err.message);
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
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <div>
                    <h1>🧠 Mente Próxima</h1>
                    <p>Encontre clínicas de saúde mental perto de você</p>
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
                <h2>Procure por clínicas</h2>

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
                        {obterTextoBusca(carregando)}
                    </button>
                </form>

                <div className="ou-divider">ou</div>

                <button
                    className="btn-localizacao"
                    onClick={buscarPorLocalizacao}
                    disabled={buscando}
                >
                    {obterTextoLocalizacao(localizando)}
                </button>
            </section>

            {mostraResultados && (
                <section className="resultados-section">
                    <h2>Clínicas encontradas ({clinicas.length})</h2>
                    <ResultadosClinicas clinicas={clinicas} />
                </section>
            )}
            {!mostraResultados && <SecaoSobre />}
        </div>
    );
}

export default Home;
