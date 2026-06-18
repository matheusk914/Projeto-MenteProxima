// Cache local de nomes de usuário, indexado por ID.
// A API de /avaliacoes não retorna o nome de quem avaliou (só usuario_id),
// então usamos este cache para lembrar nomes que já vimos em algum lugar
// (login do usuário atual, ou comentários, que já trazem nome_usuario).

const CHAVE = "cacheNomesUsuarios";

function lerCache() {
    try {
        const dados = localStorage.getItem(CHAVE);
        return dados ? JSON.parse(dados) : {};
    } catch (erro) {
        return {};
    }
}

function salvarCache(cache) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(cache));
    } catch (erro) {
        // Se o localStorage falhar, apenas ignora — não é crítico.
    }
}

export function lembrarNome(usuarioId, nome) {
    if (!usuarioId || !nome) return;
    const cache = lerCache();
    cache[String(usuarioId)] = nome;
    salvarCache(cache);
}

export function buscarNomeLembrado(usuarioId) {
    if (!usuarioId) return null;
    const cache = lerCache();
    return cache[String(usuarioId)] || null;
}
