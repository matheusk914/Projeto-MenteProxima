function EstrelaAvaliacao({ nota }) {
    const total = 5;
    let estrelas = "";

    let i = 1;
    while (i <= total) {
        if (i <= nota) {
            estrelas = estrelas + "★";
        } else {
            estrelas = estrelas + "☆";
        }
        i = i + 1;
    }

    return <span className="estrela-avaliacao">{estrelas}</span>;
}

export default EstrelaAvaliacao;
