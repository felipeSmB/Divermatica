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
    // NOVO: fallback genérico — necessário para o Futebol 7, onde muitos
    // clubes usam apenas "Defesa" em vez de "Central"/"Lateral".
    [/defesa|defensa/, { y: 24, xBase: 50, anchoMax: 50 }],
    [/pivote|volante|medio.?defensiv|primeiro.?volante/, { y: 42, xBase: 50, anchoMax: 40 }],
    [/interior.?(direit|derech)/, { y: 50, xBase: 68, anchoMax: 22 }],
    [/interior.?(esquerd|izquierd)/, { y: 50, xBase: 32, anchoMax: 22 }],
    [/m[eé]di[oa].?centr|centrocampista|mediocampista|m[eé]di[oa]\b/, { y: 50, xBase: 50, anchoMax: 50 }],
    [/segund[oa].?ponta|segund[oa].?delanter/, { y: 66, xBase: 50, anchoMax: 30 }],
    [/mia.?ponta|meia.?atacante|mediapunta|enganche/, { y: 62, xBase: 50, anchoMax: 30 }],
    [/extremo.?(direit|derech)|ponta.?direit|winger.?(direit|derech)/, { y: 72, xBase: 86, anchoMax: 14 }],
    [/extremo.?(esquerd|izquierd)|ponta.?esquerd|winger.?(esquerd|izquierd)/, { y: 72, xBase: 14, anchoMax: 14 }],
    // NOVO: acrescentado "atacante" — outro nome comum no Futebol 7 que antes não era reconhecido.
    [/centroavante|ponta.?de.?lan[cç]a|delanter[oa].?centro|avan[cç]ado|atacante|punta\b|centro.?forward/, { y: 84, xBase: 50, anchoMax: 44 }],
];

const FUTSAL = [
    [/porteiro|guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/fixo|cierre/, { y: 28, xBase: 50, anchoMax: 20 }],
    [/ala.?(direit|derech)/, { y: 52, xBase: 82, anchoMax: 16 }],
    [/ala.?(esquerd|izquierd)/, { y: 52, xBase: 18, anchoMax: 16 }],
    [/piv[oô]/, { y: 84, xBase: 50, anchoMax: 20 }],
];

// ---------------------------------------------------------------------
// BASQUETEBOL — os 5 jogadores jogam o campo todo, não faz sentido
// "profundidade defensiva" como no futebol. Representa-se um set
// ofensivo de meio-campo: base no topo do garrafão, escolta e alero
// nas alas, ala-pívot e pívot perto do cesto.
// ---------------------------------------------------------------------
const BASQUETEBOL = [
    [/base|armador/, { y: 30, xBase: 50, anchoMax: 20 }],
    [/ala.?p[ií]vot|power.?forward/, { y: 68, xBase: 68, anchoMax: 22 }],
    [/escolta|ala.?armador/, { y: 48, xBase: 76, anchoMax: 20 }],
    [/alero|ala\b/, { y: 48, xBase: 24, anchoMax: 20 }],
    [/p[ií]vo[t]?|center|centro\b/, { y: 82, xBase: 50, anchoMax: 22 }],
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
    [/pilar|talonador/, { y: 14, xBase: 50, anchoMax: 46 }],
    [/segunda.?linha/, { y: 24, xBase: 50, anchoMax: 30 }],
    [/ala\b|n.?8|n[uú]mero.?8/, { y: 34, xBase: 50, anchoMax: 60 }],
    [/m[eé]dio.?melee|meio.?scrum|m[eé]dio.?scrum/, { y: 46, xBase: 50, anchoMax: 18 }],
    [/abertura|apertura/, { y: 54, xBase: 50, anchoMax: 18 }],
    [/centro/, { y: 64, xBase: 50, anchoMax: 40 }],
    [/ponta/, { y: 78, xBase: 50, anchoMax: 76 }],
    [/zagueiro|fullback/, { y: 92, xBase: 50, anchoMax: 16 }],
];

const HOQUEI = [
    [/guarda.?redes|arquero|portero/, { y: 6, xBase: 50, anchoMax: 14 }],
    [/defesa|defensa/, { y: 26, xBase: 50, anchoMax: 50 }],
    [/m[eé]dio|centrocampista|mediocampista/, { y: 52, xBase: 50, anchoMax: 54 }],
    [/avan[cç]ado|delanter|atacante/, { y: 82, xBase: 50, anchoMax: 50 }],
];

const BEISBOL = [
    [/receptor|catcher/, { y: 92, xBase: 50, anchoMax: 10 }],
    [/lan[cç]ador|pitcher/, { y: 72, xBase: 50, anchoMax: 10 }],
    [/primeira.?base|primera.?base/, { y: 64, xBase: 74, anchoMax: 10 }],
    [/terceira.?base|tercera.?base/, { y: 64, xBase: 26, anchoMax: 10 }],
    [/parador.?em.?curto|campo.?curto|shortstop|torpedeiro/, { y: 55, xBase: 38, anchoMax: 10 }],
    [/segunda.?base/, { y: 52, xBase: 62, anchoMax: 10 }],
    [/jardineiro.?esquerdo|jardinero.?izquierdo|left.?field/, { y: 22, xBase: 20, anchoMax: 10 }],
    [/jardineiro.?central|jardinero.?central|center.?field/, { y: 14, xBase: 50, anchoMax: 10 }],
    [/jardineiro.?direito|jardinero.?derecho|right.?field/, { y: 22, xBase: 80, anchoMax: 10 }],
];

const MAPAS = {
    futbol: FUTEBOL,
    futbol7: FUTEBOL, // NOVO: Futebol 7 usa os mesmos nomes de posição do Futebol 11, só muda o desenho do campo
    futsal: FUTSAL,
    baloncesto: BASQUETEBOL,
    balonmano: ANDEBOL,
    rugby: RUGBY,
    hockey: HOQUEI,
    beisbol: BEISBOL,
};

const REDE = {
    voleibol: [
        [/l[ií]bero/, { y: 88, xBase: 50, anchoMax: 20 }],
        [/central|meio.?de.?rede/, { y: 20, xBase: 50, anchoMax: 40 }],
        [/oposto|opuesto/, { y: 24, xBase: 82, anchoMax: 16 }],
        [/levantador|colocador|armador/, { y: 24, xBase: 18, anchoMax: 16 }],
        [/ponta|receptor/, { y: 60, xBase: 50, anchoMax: 60 }],
    ],
};

function classificarPosicao(nomePosicao, tipoDeporte) {
    const alvo = normalizar(nomePosicao);
    const mapa = MAPAS[tipoDeporte] || REDE[tipoDeporte];
    if (!mapa) return null;
    for (const [regex, info] of mapa) {
        if (regex.test(alvo)) return info;
    }
    return null;
}

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
        nomesGrupo.forEach(nome => {
            const info = classificarPosicao(nome, tipoDeporte);
            const jogadoresGrupo = grupos[nome];
            const n = jogadoresGrupo.length;
            const xs = distribuirX(n, info.xBase, info.anchoMax);

            jogadoresGrupo.forEach((j, i) => {
                let jitterY = 0;
                if (n > 1) {
                    const ciclo = i % 3;
                    const nivel = ciclo === 0 ? -1 : ciclo === 1 ? 0 : 1;
                    const amplitude = n > 4 ? 4.5 : 3;
                    jitterY = nivel * amplitude;
                }
                resultado.push({
                    jogador: j,
                    xPorc: xs[i],
                    yPorc: clamp(info.y + jitterY, 5, 95),
                });
            });
        });
    } else {
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

    if (dividePorRed) {
        return resultado.map(r => ({ ...r, yPorc: 58 + (r.yPorc / 100) * 38 }));
    }

    return resultado;
}

export function detetarDeporte(nome) {
    const n = normalizar(nome);
    if (n.includes('futsal') || n.includes('futbol sala') || n.includes('futebol de sal')) return 'futsal';
    // Tem de vir ANTES do "futbol"/"futebol" genérico, senão "Futebol 7" seria sempre apanhado pelo genérico.
    if (n.includes('futebol 7') || n.includes('futbol 7') || n.includes('fut7') || n.includes('fut 7')) return 'futbol7';
    if (n.includes('futbol') || n.includes('futebol')) return 'futbol';
    if (n.includes('baloncesto') || n.includes('basquet') || n.includes('basquete')) return 'baloncesto';
    if (n.includes('balonmano') || n.includes('handball') || n.includes('andebol')) return 'balonmano';
    if (n.includes('voleibol') || n.includes('voley') || n.includes('volei')) return 'voleibol';
    if (n.includes('padel')) return 'padel';
    if (n.includes('tenis de mesa') || n.includes('ping pong') || n.includes('pingpong')) return 'tenisMesa';
    if (n.includes('tenis')) return 'tenis';
    if (n.includes('badminton')) return 'badminton';
    if (n.includes('rugby') || n.includes('rugbi')) return 'rugby';
    if (n.includes('hockey') || n.includes('hoquei')) return 'hockey';
    if (n.includes('beisbol') || n.includes('beisebol') || n.includes('softball') || n.includes('softbol')) return 'beisbol';
    return 'generico';
}