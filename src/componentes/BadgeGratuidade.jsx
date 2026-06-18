function BadgeGratuidade({ gratuito }) {
    if (gratuito) {
        return <span className="badge-gratuito">Gratuito</span>;
    }
    return <span className="badge-pago">Pago</span>;
}

export default BadgeGratuidade;
