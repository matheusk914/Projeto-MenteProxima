import { useState } from "react";

export function useGeolocalizacao() {
    const [localizando, setLocalizando] = useState(false);

    function obterPosicao() {
        return new Promise(function (resolver, rejeita) {
            setLocalizando(true);
            
            if (!navigator.geolocation) {
                rejeita(new Error("Geolocalização não está disponível"));
                setLocalizando(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                function (posicao) {
                    const { latitude, longitude } = posicao.coords;
                    resolver({ latitude, longitude });
                    setLocalizando(false);
                },
                function () {
                    rejeita(new Error("Permissão de localização negada"));
                    setLocalizando(false);
                }
            );
        });
    }

    return { localizando, obterPosicao };
}
