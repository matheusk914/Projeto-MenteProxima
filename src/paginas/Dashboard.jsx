import { useState, useEffect } from "react";
import "./Dashboard.css";
import {
    buscarClinicas,
    cadastrarClinica,
    editarClinica,
    deletarClinica,
} from "../servicos/clinicaService";
import { useGeolocalizacao } from "../servicos/useGeolocalizacao";
import ListaClinicas from "../componentes/ListaClinicas";

const FORM_VAZIO = {
    nome: "",
    tipo: "",
    cidade: "",
    endereco: "",
    telefone: "",
    categoria: "",
    latitude: "",
    longitude: "",
    gratuito: false,
};

function obterNome(usuario) {
    if (!usuario) return "Usuário";
    return usuario.name || usuario.nome || usuario.email || "Usuário";
}

function coordParaString(valor) {
    if (!valor) return "";
    return valor.toString();
}

function obterTituloForm(clinicaEditando) {
    if (clinicaEditando) return "✏️ Editar Clínica";
    return "🏥 Nova Clínica";
}

function obterTextoLocalizacao(localizando) {
    if (localizando) return "⏳ Localizando...";
    return "📍 Usar minha localização";
}

function obterTextoSalvar(buscando) {
    if (buscando) return "Salvando...";
    return "Salvar clínica";
}

function Dashboard({ usuario, irPara, fazerLogout }) {
    const [clinicas, setClinicas] = useState([]);
    const [mostraForm, setMostraForm] = useState(false);
    const [clinicaEditando, setClinicaEditando] = useState(null);
    const [form, setForm] = useState(FORM_VAZIO);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    const { localizando, obterPosicao } = useGeolocalizacao();

    useEffect(function () {
        carregarClinicas();
    }, []);

    async function carregarClinicas() {
        try {
            const dados = await buscarClinicas();
            setClinicas(dados);
        } catch (err) {
            setErro("Erro ao carregar clínicas: " + err.message);
        }
    }

    function atualizarCampo(campo, valor) {
        setForm({ ...form, [campo]: valor });
    }

    function abrirFormNovo() {
        setForm(FORM_VAZIO);
        setClinicaEditando(null);
        setErro("");
        setSucesso("");
        setMostraForm(true);
    }

    function abrirFormEditar(clinica) {
        setForm({
            nome: clinica.nome || "",
            tipo: clinica.tipo || "",
            cidade: clinica.cidade || "",
            endereco: clinica.endereco || "",
            telefone: clinica.telefone || "",
            categoria: clinica.categoria || "",
            latitude: coordParaString(clinica.latitude),
            longitude: coordParaString(clinica.longitude),
            gratuito: clinica.gratuito || false,
        });
        setClinicaEditando(clinica);
        setErro("");
        setSucesso("");
        setMostraForm(true);
    }

    function fecharForm() {
        setForm(FORM_VAZIO);
        setClinicaEditando(null);
        setMostraForm(false);
        setErro("");
        setSucesso("");
    }

    async function preencherLocalizacao() {
        setErro("");
        try {
            const coords = await obterPosicao();
            setForm({
                ...form,
                latitude: coords.latitude.toString(),
                longitude: coords.longitude.toString(),
            });
            setSucesso("📍 Localização obtida com sucesso!");
        } catch (err) {
            setErro(err.message);
        }
    }

    async function salvarClinica(evento) {
        evento.preventDefault();
        setErro("");
        setSucesso("");

        const dados = {
            ...form,
            latitude: parseFloat(form.latitude),
            longitude: parseFloat(form.longitude),
        };

        if (!dados.nome || !dados.tipo || !dados.cidade || !dados.endereco || !dados.categoria) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        if (isNaN(dados.latitude) || isNaN(dados.longitude)) {
            setErro("Latitude e longitude devem ser números válidos.");
            return;
        }

        setCarregando(true);
        try {
            if (clinicaEditando) {
                await editarClinica(clinicaEditando.id, dados);
                setSucesso("✅ Clínica atualizada com sucesso!");
            } else {
                await cadastrarClinica(dados);
                setSucesso("✅ Clínica cadastrada com sucesso!");
            }
            fecharForm();
            carregarClinicas();
        } catch (err) {
            setErro("Erro: " + err.message);
        } finally {
            setCarregando(false);
        }
    }

    async function removerClinica(id) {
        if (!window.confirm("Tem certeza que deseja deletar esta clínica?")) return;
        setErro("");
        try {
            await deletarClinica(id);
            setSucesso("✅ Clínica deletada!");
            carregarClinicas();
        } catch (err) {
            setErro("Erro ao deletar: " + err.message);
        }
    }

    const buscando = carregando || localizando;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>
                    <span className="marca-icone-dash">🧠</span>
                    <span className="dash-titulo">Mente Próxima — Painel</span>
                </h1>
                <div className="header-info">
                    <span>👤 {obterNome(usuario)}</span>
                    <button className="btn" onClick={function () { irPara("dashboardAvaliacoes"); }}>
                        ⭐ Avaliações
                    </button>
                    <button className="btn" onClick={function () { irPara("cadastroFuncionario"); }}>
                        👥 Funcionários
                    </button>
                    <button className="btn" onClick={fazerLogout}>
                        Sair
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-topo">
                    <h2>Minhas Clínicas</h2>
                    {!mostraForm && (
                        <button className="btn-azul" onClick={abrirFormNovo}>
                            + Cadastrar Clínica
                        </button>
                    )}
                </div>

                {sucesso && <p className="msg-sucesso">{sucesso}</p>}
                {erro && <p className="msg-erro">⚠️ {erro}</p>}

                {mostraForm && (
                    <div className="form-card">
                        <h3>{obterTituloForm(clinicaEditando)}</h3>
                        <form onSubmit={salvarClinica}>
                            <div className="form-linha">
                                <input
                                    type="text"
                                    placeholder="Nome da clínica *"
                                    value={form.nome}
                                    onChange={function (e) { atualizarCampo("nome", e.target.value); }}
                                    disabled={buscando}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Tipo (ex: Clínica) *"
                                    value={form.tipo}
                                    onChange={function (e) { atualizarCampo("tipo", e.target.value); }}
                                    disabled={buscando}
                                    required
                                />
                            </div>

                            <div className="form-linha">
                                <input
                                    type="text"
                                    placeholder="Cidade *"
                                    value={form.cidade}
                                    onChange={function (e) { atualizarCampo("cidade", e.target.value); }}
                                    disabled={buscando}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefone"
                                    value={form.telefone}
                                    onChange={function (e) { atualizarCampo("telefone", e.target.value); }}
                                    disabled={buscando}
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Endereço completo *"
                                value={form.endereco}
                                onChange={function (e) { atualizarCampo("endereco", e.target.value); }}
                                disabled={buscando}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Especialidades (ex: Psicologia, Psiquiatria) *"
                                value={form.categoria}
                                onChange={function (e) { atualizarCampo("categoria", e.target.value); }}
                                disabled={buscando}
                                required
                            />

                            <div className="form-linha">
                                <input
                                    type="number"
                                    placeholder="Latitude (ex: -21.75) *"
                                    value={form.latitude}
                                    onChange={function (e) { atualizarCampo("latitude", e.target.value); }}
                                    step="any"
                                    disabled={buscando}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Longitude (ex: -43.35) *"
                                    value={form.longitude}
                                    onChange={function (e) { atualizarCampo("longitude", e.target.value); }}
                                    step="any"
                                    disabled={buscando}
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                className="btn"
                                onClick={preencherLocalizacao}
                                disabled={buscando}
                            >
                                {obterTextoLocalizacao(localizando)}
                            </button>
                            <small className="form-dica">
                                💡 Clique acima para preencher as coordenadas automaticamente, ou digite manualmente.
                            </small>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={form.gratuito}
                                    onChange={function (e) { atualizarCampo("gratuito", e.target.checked); }}
                                    disabled={buscando}
                                />
                                Atendimento gratuito
                            </label>

                            <div className="form-botoes">
                                <button type="submit" className="btn-azul" disabled={buscando}>
                                    {obterTextoSalvar(buscando)}
                                </button>
                                <button type="button" className="btn" onClick={fecharForm} disabled={buscando}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="clinicas-grid">
                    <ListaClinicas
                        clinicas={clinicas}
                        abrirFormEditar={abrirFormEditar}
                        removerClinica={removerClinica}
                        usuario={usuario}
                    />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
