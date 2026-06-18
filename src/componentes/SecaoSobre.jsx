function SecaoSobre() {
    return (
        <section className="sobre-section">

            <div className="sobre-foto-col">
                <img
                    src="/sobre-fundo.jpg"
                    alt="Duas pessoas em conexão empática"
                    className="sobre-foto"
                />
            </div>

            <div className="sobre-texto-col">
                <h2 className="sobre-titulo">
                    Saúde mental<br />
                    não deveria ser<br />
                    difícil de acessar.
                </h2>

                <p className="sobre-corpo">
                    O Mente Próxima surgiu de uma necessidade real: muita gente
                    não sabe onde encontrar ajuda psicológica perto de casa,
                    ou acha que não vai conseguir pagar.
                </p>

                <p className="sobre-corpo">
                    Aqui você encontra clínicas da sua cidade, vê avaliações de
                    quem já foi e consegue agendar sem complicação.
                </p>

                <blockquote className="sobre-quote">
                    Cuidar da mente é tão importante quanto cuidar do corpo.
                </blockquote>
            </div>

        </section>
    );
}

export default SecaoSobre;
