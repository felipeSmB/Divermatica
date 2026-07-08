// Motor de posicionamento tático. Traduz o NOME de uma posição (em
// português ou espanhol, tal como vem da base de dados) para uma
// coordenada real dentro do campo desse desporto. Se a posição não for
// reconhecida (desportos/posições criados livremente pelo utilizador),
// cai-se num layout de fallback em linhas, para nunca "partir" a UI.

function normalizar(texto) {
    return (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

// clamp utilitário
function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

// Distribui `cantidad` jogadores em leque à volta de um xBase, sem
// ultrapassar os limites do campo nem o `anchoMax` disponível para essa
// posição (ex.: um extremo não se deve espalhar tanto quanto um grupo de
// centrais).
function distribuirX(cantidad, xBase, anchoMax = 46) {
    if (cantidad <= 1) return [xBase];
    const spread = Math.min(anchoMax, 14 + cantidad * 9);
    let inicio = xBase - spread / 2;
    let fim = xBase + spread / 2;
    if (inicio < 8) { fim += (8 - inicio); inicio = 8; }
    if (fim > 92) { inicio -= (fim - 92); fim = 92; }
    const passo = (fim - inicio) / (cantidad - 1);
    return Array.from({ length: cantidad }, (_, i) => clamp(inicio + i * passo, 8, 92));
}

// ---------------------------------------------------------------------
// MAPAS DE POSIÇÕES REAIS POR DESPORTO
// Cada entrada: [expressão regular de deteção, { y, xBase, anchoMax }]
//   y       -> profundidade no campo (0 = própria baliza/fundo, 100 = fundo contrário)
//   xBase   -> posição lateral base (0 = esquerda, 50 = centro, 100 = direita)
//   anchoMax-> quanto se pode abrir em leque se houver vários jogadores
// A ordem importa: a primeira expressão que corresponder é usada.
// ---------------------------------------------------------------------

const FUTEBOL = [
    [/porteiro|guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/lateral.?(direit|derech)/, { y: 26, xBase: 84, anchoMax: 14 }],
    [/lateral.?(esquerd|izquierd)/, { y: 26, xBase: 16, anchoMax: 14 }],
    [/carrileiro.?(direit|derech)|ala.?(direit|derech)a?\b/, { y: 34, xBase: 86, anchoMax: 14 }],
    [/carrileiro.?(esquerd|izquierd)|ala.?(esquerd|izquierd)a?\b/, { y: 34, xBase: 14, anchoMax: 14 }],
    [/central|zagueiro|l[ií]bero/, { y: 22, xBase: 50, anchoMax: 46 }],
    [/pivote|volante|medio.?defensiv|primeiro.?volante/, { y: 42, xBase: 50, anchoMax: 40 }],
    [/interior.?(direit|derech)/, { y: 50, xBase: 68, anchoMax: 22 }],
    [/interior.?(esquerd|izquierd)/, { y: 50, xBase: 32, anchoMax: 22 }],
    [/m[eé]di[oa].?centr|centrocampista|mediocampista|m[eé]di[oa]\b/, { y: 50, xBase: 50, anchoMax: 50 }],
    [/segund[oa].?ponta|segund[oa].?delanter/, { y: 66, xBase: 50, anchoMax: 30 }],
    [/mia.?ponta|meia.?atacante|mediapunta|enganche/, { y: 62, xBase: 50, anchoMax: 30 }],
    [/extremo.?(direit|derech)|ponta.?direit|winger.?(direit|derech)/, { y: 72, xBase: 86, anchoMax: 14 }],
    [/extremo.?(esquerd|izquierd)|ponta.?esquerd|winger.?(esquerd|izquierd)/, { y: 72, xBase: 14, anchoMax: 14 }],
    [/centroavante|ponta.?de.?lan[cç]a|delanter[oa].?centro|avan[cç]ado|punta\b|centro.?forward/, { y: 84, xBase: 50, anchoMax: 44 }],
];

const FUTSAL = [
    [/porteiro|guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/fixo|cierre/, { y: 28, xBase: 50, anchoMax: 20 }],
    [/ala.?(direit|derech)/, { y: 52, xBase: 82, anchoMax: 16 }],
    [/ala.?(esquerd|izquierd)/, { y: 52, xBase: 18, anchoMax: 16 }],
    [/piv[oô]/, { y: 84, xBase: 50, anchoMax: 20 }],
];

const BASQUETEBOL = [
    [/base|armador/, { y: 16, xBase: 50, anchoMax: 20 }],
    [/escolta|ala.?armador/, { y: 30, xBase: 74, anchoMax: 22 }],
    [/alero|ala\b/, { y: 46, xBase: 50, anchoMax: 46 }],
    [/ala.?p[ií]vot|power.?forward/, { y: 66, xBase: 30, anchoMax: 26 }],
    [/p[ií]vo[t]?|center|centro\b/, { y: 84, xBase: 50, anchoMax: 22 }],
];

const ANDEBOL = [
    [/porteiro|guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/central/, { y: 38, xBase: 50, anchoMax: 22 }],
    [/lateral.?(direit|derech)/, { y: 42, xBase: 76, anchoMax: 18 }],
    [/lateral.?(esquerd|izquierd)/, { y: 42, xBase: 24, anchoMax: 18 }],
    [/ponta.?(direit|derech)|extremo.?(direit|derech)/, { y: 78, xBase: 92, anchoMax: 10 }],
    [/ponta.?(esquerd|izquierd)|extremo.?(esquerd|izquierd)/, { y: 78, xBase: 8, anchoMax: 10 }],
    [/piv[oô]/, { y: 84, xBase: 50, anchoMax: 18 }],
];

const RUGBY = [
    [/pilar|talonador|segunda.?linha|ala\b|n.?8|n[uú]mero.?8/, { y: 24, xBase: 50, anchoMax: 66 }],
    [/m[eé]dio.?melee|meio.?scrum|m[eé]dio.?scrum/, { y: 44, xBase: 50, anchoMax: 18 }],
    [/abertura|apertura/, { y: 52, xBase: 50, anchoMax: 18 }],
    [/centro/, { y: 62, xBase: 50, anchoMax: 40 }],
    [/ponta|ala.?(direit|esquerd|derech|izquierd)/, { y: 76, xBase: 50, anchoMax: 76 }],
    [/zagueiro|fullback/, { y: 90, xBase: 50, anchoMax: 16 }],
];

const HOQUEI = [
    [/guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/defesa|defensa/, { y: 26, xBase: 50, anchoMax: 50 }],
    [/m[eé]dio|centrocampista|mediocampista/, { y: 52, xBase: 50, anchoMax: 54 }],
    [/avan[cç]ado|delanter|atacante/, { y: 82, xBase: 50, anchoMax: 50 }],
];

const MAPAS = {
    futbol: FUTEBOL,
    futsal: FUTSAL,
    baloncesto: BASQUETEBOL,
    balonmano: ANDEBOL,
    rugby: RUGBY,
    hockey: HOQUEI,
};

// Desportos "divididos pela rede" (mostram só o próprio meio-campo).
// Aqui não há linhas de ataque/defesa no mesmo sentido dos anteriores,
// mas sim jogadores de rede (perto da rede) e jogadores de fundo.
const REDE = {
    voleibol: [
        [/l[ií]bero/, { y: 88, xBase: 50, anchoMax: 20 }],
        [/central|meio.?de.?rede/, { y: 20, xBase: 50, anchoMax: 40 }],
        [/oposto|opuesto/, { y: 24, xBase: 82, anchoMax: 16 }],
        [/levantador|colocador|armador/, { y: 24, xBase: 18, anchoMax: 16 }],
        [/ponta|receptor/, { y: 60, xBase: 50, anchoMax: 60 }],
    ],
};

/**
 * Tenta classificar uma posição para um desporto conhecido.
 * Devolve { y, xBase, anchoMax } ou null se não reconhecida.
 */
function classificarPosicao(nomePosicao, tipoDeporte) {
    const alvo = normalizar(nomePosicao);
    const mapa = MAPAS[tipoDeporte] || REDE[tipoDeporte];
    if (!mapa) return null;
    for (const [regex, info] of mapa) {
        if (regex.test(alvo)) return info;
    }
    return null;
}

/**
 * Calcula a formação completa de uma equipa: devolve os jogadores com
 * coordenadas (xPorc, yPorc) já resolvidas e sem colisões.
 *
 * @param {Array} jugadores        jogadores da equipa
 * @param {Array} posicionesInfo   metadados das posições vindos da API (campo `orden`)
 * @param {string} tipoDeporte     chave devolvida por detetarDeporte()
 * @param {boolean} dividePorRed   se o desporto só mostra o próprio meio-campo
 */
export function calcularFormacao(jugadores, posicionesInfo, tipoDeporte, dividePorRed) {
    const grupos = {};
    jugadores.forEach(j => {
        const pos = j.posicion || 'Sem posição';
        if (!grupos[pos]) grupos[pos] = [];
        grupos[pos].push(j);
    });

    const nomesGrupo = Object.keys(grupos);
    const todosReconhecidos = nomesGrupo.every(n => classificarPosicao(n, tipoDeporte) !== null);

    const resultado = [];

    if (todosReconhecidos && nomesGrupo.length > 0) {
        // --- Caminho "realista": usamos coordenadas táticas verdadeiras ---
        nomesGrupo.forEach(nome => {
            const info = classificarPosicao(nome, tipoDeporte);
            const jogadoresGrupo = grupos[nome];
            const xs = distribuirX(jogadoresGrupo.length, info.xBase, info.anchoMax);
            jogadoresGrupo.forEach((j, i) => {
                // pequeno "jitter" vertical quando há muitos na mesma posição,
                // para não ficarem perfeitamente alinhados (efeito robótico)
                const jitterY = jogadoresGrupo.length > 1 ? ((i % 2 === 0 ? -1 : 1) * 3) : 0;
                resultado.push({
                    jogador: j,
                    xPorc: xs[i],
                    yPorc: clamp(info.y + jitterY, 5, 95),
                });
            });
        });
    } else {
        // --- Fallback: linhas por 'orden', para posições/desportos livres ---
        const ordenDe = {};
        (posicionesInfo || []).forEach(p => { ordenDe[p.nombre] = p.orden ?? 0; });

        const filas = nomesGrupo
            .map(nome => ({
                nome,
                jogadores: grupos[nome],
                orden: nome === 'Sem posição' ? -1 : (ordenDe[nome] ?? 999),
            }))
            .sort((a, b) => a.orden - b.orden);

        const nFilas = filas.length;
        filas.forEach((fila, idx) => {
            const y = nFilas === 1 ? 50 : 12 + (idx / (nFilas - 1)) * 76;
            const xs = distribuirX(fila.jogadores.length, 50, 80);
            fila.jogadores.forEach((j, i) => {
                resultado.push({ jogador: j, xPorc: xs[i], yPorc: y });
            });
        });
    }

    // Desportos divididos por rede: só existe o próprio meio-campo, por
    // isso comprimimos o eixo Y para a faixa inferior do campo (perto da
    // rede fica com y baixo, fundo do campo fica com y alto).
    if (dividePorRed) {
        return resultado.map(r => ({ ...r, yPorc: 58 + (r.yPorc / 100) * 38 }));
    }

    return resultado;
}

export function detetarDeporte(nome) {
    const n = normalizar(nome);
    if (n.includes('futsal') || n.includes('futbol sala') || n.includes('futebol de sal') || n.includes('futebol.?sal')) return 'futsal';
    if (n.includes('futbol') || n.includes('futebol')) return 'futbol';
    if (n.includes('baloncesto') || n.includes('basquet') || n.includes('basquete')) return 'baloncesto';
    if (n.includes('balonmano') || n.includes('handball') || n.includes('andebol')) return 'balonmano';
    if (n.includes('voleibol') || n.includes('voley') || n.includes('v[oó]lei')) return 'voleibol';
    if (n.includes('padel') || n.includes('p[aá]del')) return 'padel';
    if (n.includes('tenis de mesa') || n.includes('t[eé]nis de mesa') || n.includes('ping pong')) return 'tenisMesa';
    if (n.includes('tenis') || n.includes('t[eé]nis')) return 'tenis';
    if (n.includes('badminton')) return 'badminton';
    if (n.includes('rugby') || n.includes('r[uú]gbi')) return 'rugby';
    if (n.includes('hockey') || n.includes('hoquei')) return 'hockey';
    if (n.includes('beisbol') || n.includes('softball') || n.includes('softbol') || n.includes('b[eé]isebol')) return 'beisbol';
    return 'generico';
}