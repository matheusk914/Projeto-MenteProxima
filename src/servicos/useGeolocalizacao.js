import { useState } from "react";

export function useGeolocalizacao() {
    const [localizando, setLocalizando] = useState(false);

    function obterPosicao() {
        if (!navigator.geolocation) {
            return Promise.reject(
                new Error("Seu navegador não suporta geolocalização.")
            );
        }

        setLocalizando(true);

        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(
                function (posicao) {
                    setLocalizando(false);
                    resolve(posicao.coords);
                },
                function () {
                    setLocalizando(false);
                    reject(new Error("Não foi possível obter sua localização."));
                }
            );
        });
    }

    return { localizando, obterPosicao };
}
