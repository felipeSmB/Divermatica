import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, ClipPath, RadialGradient, LinearGradient, Stop } from 'react-native-svg';
import PlayerJerseyCard, { JERSEY_SIZES } from './PlayerJerseyCard';
import { detetarDeporte, calcularFormacao } from '../utils/posicionamento';
import { classificarPosicao, distribuirX } from '../utils/posicionamento';
import FieldBasketball from './fields/FieldBasketball';
import FieldVolleyball from './fields/FieldVolleyball';
import FieldRugby from './fields/FieldRugby';
import FieldHandball from './fields/FieldHandball';
import FieldHockey from './fields/FieldHockey';
import FieldBaseball from './fields/FieldBaseball';
import FieldPadel from './fields/FieldPadel';
import FieldBadminton from './fields/FieldBadminton';
import FieldTableTennis from './fields/FieldTableTennis';

const LINEA = 'rgba(255,255,255,0.85)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const TENIS_APRON = '#155a92';
const TENIS_COURT = '#2f86c9';
const GRASS_A = '#0e6b39';
const GRASS_B = '#125f34';

// Gera as faixas de relva cortada (mowing stripes), com a largura real
// de uma faixa de corte de relvado profissional (~9m), em vez de bandas
// fixas arbitrárias — por isso o nº de faixas muda consoante o
// comprimento real de cada campo (Futebol 11 tem mais faixas que o 7).
function FaixasRelva({ W, H, largura = 90 }) {
    const n = Math.ceil(H / largura);
    return (
        <>
            {Array.from({ length: n }).map((_, i) => {
                const y = i * largura;
                const h = Math.min(largura, H - y);
                return <Rect key={i} x={0} y={y} width={W} height={h} fill={i % 2 === 0 ? GRASS_A : GRASS_B} />;
            })}
        </>
    );
}

/* =====================================================
   CAMPOS EM SVG — Futebol 11, Futebol 7, Futsal, Ténis
   Medidas reais convertidas para unidades = decímetros
   (1 unidade = 0,1m), para ficarem exatas e legíveis.
   ===================================================== */

// --- FUTEBOL 11 — 100,6 × 64m (imagem "Dimensiones del campo de fútbol 11") ---
function FieldFutbol11() {
    const W = 640, H = 1006;
    const cx = W / 2;
    const boxW = 403.2, boxD = 165;
    const goalW = 183.2, goalD = 55;
    const penaltyDist = 110;
    const circleR = 91.5;
    const cornerR = 9;
    const spotR = 3.2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <ClipPath id="f11ArcTop"><Rect x={0} y={boxD} width={W} height={H - boxD} /></ClipPath>
                <ClipPath id="f11ArcBot"><Rect x={0} y={0} width={W} height={H - boxD} /></ClipPath>
                <RadialGradient id="f11Vig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
                </RadialGradient>
            </Defs>

            <FaixasRelva W={W} H={H} largura={90} />

            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            {/* Baliza de cima */}
            <Rect x={cx - boxW / 2} y={0} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Rect x={cx - goalW / 2} y={0} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={penaltyDist} r={circleR} clipPath="url(#f11ArcTop)" fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={cx - goalW / 2 + 10} y1={0} x2={cx + goalW / 2 - 10} y2={0} stroke={LINEA} strokeWidth={7} />

            {/* Baliza de baixo (espelhada) */}
            <Rect x={cx - boxW / 2} y={H - boxD} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Rect x={cx - goalW / 2} y={H - goalD} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - penaltyDist} r={circleR} clipPath="url(#f11ArcBot)" fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={cx - goalW / 2 + 10} y1={H} x2={cx + goalW / 2 - 10} y2={H} stroke={LINEA} strokeWidth={7} />

            {/* Cantos */}
            <Path d={`M ${cornerR} 0 A ${cornerR} ${cornerR} 0 0 0 0 ${cornerR}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M ${W - cornerR} 0 A ${cornerR} ${cornerR} 0 0 1 ${W} ${cornerR}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M 0 ${H - cornerR} A ${cornerR} ${cornerR} 0 0 1 ${cornerR} ${H}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M ${W} ${H - cornerR} A ${cornerR} ${cornerR} 0 0 0 ${W - cornerR} ${H}`} stroke={LINEA} strokeWidth={3} fill="none" />

            {/* Luz de estádio: escurece ligeiramente os cantos */}
            <Rect x={0} y={0} width={W} height={H} fill="url(#f11Vig)" />
        </Svg>
    );
}

// --- FUTEBOL 7 — 55 × 36,5m (imagem "Dimensiones del campo de fútbol 7") ---
function FieldFutbol7() {
    const W = 365, H = 550;
    const cx = W / 2;
    const boxW = 165, boxD = 91;
    const goalW = 60;
    const penaltyDist = 73;
    const circleR = 55;
    const spotR = 3;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <ClipPath id="f7ArcTop"><Rect x={0} y={boxD} width={W} height={H - boxD} /></ClipPath>
                <ClipPath id="f7ArcBot"><Rect x={0} y={0} width={W} height={H - boxD} /></ClipPath>
                <RadialGradient id="f7Vig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
                </RadialGradient>
            </Defs>

            <FaixasRelva W={W} H={H} largura={90} />

            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            <Rect x={cx - boxW / 2} y={0} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={penaltyDist} r={circleR} clipPath="url(#f7ArcTop)" fill="none" stroke={LINEA_SUAVE} strokeWidth={2.5} strokeDasharray="7,6" />
            <Line x1={cx - goalW / 2} y1={0} x2={cx + goalW / 2} y2={0} stroke={LINEA} strokeWidth={7} />

            <Rect x={cx - boxW / 2} y={H - boxD} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - penaltyDist} r={circleR} clipPath="url(#f7ArcBot)" fill="none" stroke={LINEA_SUAVE} strokeWidth={2.5} strokeDasharray="7,6" />
            <Line x1={cx - goalW / 2} y1={H} x2={cx + goalW / 2} y2={H} stroke={LINEA} strokeWidth={7} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#f7Vig)" />
        </Svg>
    );
}

// --- FUTSAL — 40 × 20m, área em arco (imagem "Medidas de campo de fútbol sala") ---
function FieldFutsal() {
    const W = 200, H = 400;
    const cx = W / 2;
    const postHalf = 15;
    const archR = 60;
    const spot1 = 60, spot2 = 100;
    const circleR = 30;
    const spotR = 2.6;

    const arcTop = `M ${cx - postHalf - archR} 0 A ${archR} ${archR} 0 0 0 ${cx - postHalf} ${archR} L ${cx + postHalf} ${archR} A ${archR} ${archR} 0 0 1 ${cx + postHalf + archR} 0 Z`;
    const arcBot = `M ${cx - postHalf - archR} ${H} A ${archR} ${archR} 0 0 1 ${cx - postHalf} ${H - archR} L ${cx + postHalf} ${H - archR} A ${archR} ${archR} 0 0 0 ${cx + postHalf + archR} ${H} Z`;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="futsalPiso" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#1f7ab8" />
                    <Stop offset="1" stopColor="#155d94" />
                </LinearGradient>
                <RadialGradient id="futsalVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            {/* Piso com ligeiro brilho, em vez de cor plana */}
            <Rect x={0} y={0} width={W} height={H} fill="url(#futsalPiso)" />

            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            {/* Áreas pintadas com um tom ligeiramente mais claro, como num piso real */}
            <Path d={arcTop} fill="rgba(255,255,255,0.06)" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={spot2} r={spotR} fill={LINEA} />
            <Line x1={cx - postHalf} y1={0} x2={cx + postHalf} y2={0} stroke={LINEA} strokeWidth={7} />

            <Path d={arcBot} fill="rgba(255,255,255,0.06)" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - spot2} r={spotR} fill={LINEA} />
            <Line x1={cx - postHalf} y1={H} x2={cx + postHalf} y2={H} stroke={LINEA} strokeWidth={7} />

            {/* Marcas da zona de substituição, 5m de cada lado do meio-campo */}
            <Line x1={0} y1={H / 2 - 50} x2={6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={0} y1={H / 2 + 50} x2={6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={W} y1={H / 2 - 50} x2={W - 6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={W} y1={H / 2 + 50} x2={W - 6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#futsalVig)" />
        </Svg>
    );
}

// --- TÉNIS — pista de pares 23,77 × 10,97m, com zona de recuo (imagem "Marcación de pistas de tenis") ---
function FieldTenis() {
    const ox = 12, oy = 18;
    const cw = 109.7, ch = 237.7;
    const singlesInset = 13.7;
    const serviceOffset = 64;
    const W = cw + ox * 2, H = ch + oy * 2;
    const netY = oy + ch / 2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <RadialGradient id="tenisVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill={TENIS_APRON} />
            <Rect x={ox} y={oy} width={cw} height={ch} fill={TENIS_COURT} />

            <Rect x={ox} y={oy} width={cw} height={ch} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={ox + singlesInset} y1={oy} x2={ox + singlesInset} y2={oy + ch} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={ox + cw - singlesInset} y1={oy} x2={ox + cw - singlesInset} y2={oy + ch} stroke={LINEA} strokeWidth={2.5} />

            <Line x1={ox - 5} y1={netY} x2={ox + cw + 5} y2={netY} stroke="#1c2733" strokeWidth={4} />
            <Circle cx={ox - 5} cy={netY} r={3} fill="#1c2733" />
            <Circle cx={ox + cw + 5} cy={netY} r={3} fill="#1c2733" />

            <Line x1={ox + singlesInset} y1={netY - serviceOffset} x2={ox + cw - singlesInset} y2={netY - serviceOffset} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={ox + singlesInset} y1={netY + serviceOffset} x2={ox + cw - singlesInset} y2={netY + serviceOffset} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={ox + cw / 2} y1={netY - serviceOffset} x2={ox + cw / 2} y2={netY + serviceOffset} stroke={LINEA} strokeWidth={2.5} />

            <Line x1={ox + cw / 2} y1={oy} x2={ox + cw / 2} y2={oy + 3.5} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={ox + cw / 2} y1={oy + ch} x2={ox + cw / 2} y2={oy + ch - 3.5} stroke={LINEA} strokeWidth={2.5} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#tenisVig)" />
        </Svg>
    );
}

/* =====================================================
   PEÇAS REUTILIZÁVEIS DO CAMPO (View) — inalteradas,
   usadas pelos desportos que não mudaram nesta ronda.
   ===================================================== */

function LineaCentral() {
    return <View style={styles.lineaMedio} pointerEvents="none" />;
}

function CirculoCentro({ diametro = 78 }) {
    const r = diametro / 2;
    return (
        <View
            style={[styles.circulo, { width: diametro, height: diametro, borderRadius: r, top: '50%', left: '50%', marginTop: -r, marginLeft: -r }]}
            pointerEvents="none"
        />
    );
}

function PuntoCentro() {
    return <View style={styles.puntoCentro} pointerEvents="none" />;
}

function Punto({ extremo, distanciaPorc }) {
    const lado = extremo === 'arriba' ? { top: `${distanciaPorc}%` } : { bottom: `${distanciaPorc}%` };
    return <View style={[styles.punto, lado]} pointerEvents="none" />;
}

function CajaArea({ extremo, anchoPorc = 18, altoPorc = 13 }) {
    const lado = extremo === 'arriba' ? { top: 0, borderTopWidth: 0 } : { bottom: 0, borderBottomWidth: 0 };
    return (
        <View style={[styles.caja, { left: `${anchoPorc}%`, right: `${anchoPorc}%`, height: `${altoPorc}%` }, lado]} pointerEvents="none" />
    );
}

function ArcoRecortado({ extremo, diametro, distanciaBorde = 0, dashed = false }) {
    const r = diametro / 2;
    const lado = extremo === 'arriba' ? { top: distanciaBorde, marginTop: -r } : { bottom: distanciaBorde, marginBottom: -r };
    return (
        <View
            style={[styles.arco, { width: diametro, height: diametro, borderRadius: r, left: '50%', marginLeft: -r, borderStyle: dashed ? 'dashed' : 'solid' }, lado]}
            pointerEvents="none"
        />
    );
}

function LineaPunteada({ extremo, distanciaPorc, anchoPorc = 8 }) {
    const lado = extremo === 'arriba' ? { top: `${distanciaPorc}%` } : { bottom: `${distanciaPorc}%` };
    return <View style={[styles.lineaPunteada, { left: `${anchoPorc}%`, right: `${anchoPorc}%` }, lado]} pointerEvents="none" />;
}

function Red() {
    return (
        <>
            <View style={styles.red} pointerEvents="none" />
            <View style={[styles.poste, { left: '3%' }]} pointerEvents="none" />
            <View style={[styles.poste, { right: '3%' }]} pointerEvents="none" />
        </>
    );
}

function CajasServicio({ profundidadPorc = 22 }) {
    const borde = `${50 - profundidadPorc}%`;
    return (
        <>
            <View style={[styles.cajaServicio, { top: borde, height: `${profundidadPorc}%` }]} pointerEvents="none" />
            <View style={[styles.cajaServicio, { bottom: borde, height: `${profundidadPorc}%` }]} pointerEvents="none" />
            <View style={[styles.lineaServicioCentral, { top: borde, bottom: borde }]} pointerEvents="none" />
        </>
    );
}

function Postes({ extremo }) {
    const lado = extremo === 'arriba' ? { top: 2 } : { bottom: 2 };
    return (
        <View style={[styles.postesWrap, lado]} pointerEvents="none">
            <View style={styles.posteIzq} />
            <View style={styles.posteDer} />
            <View style={styles.travesano} />
        </View>
    );
}

function Diamante() {
    return (
        <View style={styles.diamanteWrap} pointerEvents="none">
            <View style={styles.diamante} />
            <View style={styles.monticulo} />
        </View>
    );
}

/* =====================================================
   CONFIGURAÇÃO VISUAL POR DESPORTO
   ===================================================== */

const CONFIG = {
    futbol:     { fondo: '#0f6b3a', aspecto: 0.6362 },
    futbol7:    { fondo: '#0f6b3a', aspecto: 0.6636 },
    futsal:     { fondo: '#1a6ea8', aspecto: 0.50 },
    baloncesto: { fondo: '#c17f3e', aspecto: 0.56 },
    balonmano:  { fondo: '#146b52', aspecto: 0.50 },
    voleibol:   { fondo: '#1d6fae', aspecto: 0.50 },
    padel:      { fondo: '#0e9488', aspecto: 0.50 },
    tenis:      { fondo: TENIS_APRON, aspecto: 0.4885 },
    tenisMesa:  { fondo: '#0a4f8c', aspecto: 0.60 },
    badminton:  { fondo: '#2f9e52', aspecto: 0.48 },
    rugby:      { fondo: '#0c5c33', aspecto: 0.60 },
    hockey:     { fondo: '#1560bd', aspecto: 0.64 },
    beisbol:    { fondo: '#2e7d32', aspecto: 0.80 },
    generico:   { fondo: '#232833', aspecto: 0.70 },
};

const DIVIDE_POR_RED = ['voleibol', 'padel', 'tenis', 'tenisMesa', 'badminton'];
const SVG_FIELDS = ['futbol', 'futbol7', 'futsal', 'tenis', 'baloncesto', 'balonmano', 'rugby', 'hockey', 'beisbol', 'padel', 'badminton', 'tenisMesa'];

/* =====================================================
   COMPONENTE PRINCIPAL
   ===================================================== */

export default function FormationPitch({ equipo, posicionesInfo, deporte, small, formacion }) {
    const tipo = detetarDeporte(deporte);
    const cfg = CONFIG[tipo];
    const dividePorRed = DIVIDE_POR_RED.includes(tipo);
    const denso = equipo.length >= 9;
    const tamanho = small || denso ? 'small' : 'normal';
    const { width: cardW, height: cardH } = JERSEY_SIZES[tamanho];

    // If a fixed formation was passed from the UI, compute precise positions
    // using the formation template; otherwise fall back to the generic engine.
    function calcularFormacaoPrecisa(equipoLocal, formacionTemplate) {
        const resultado = [];
        if (!formacionTemplate) return [];

        // Agrupa jogadores por etiqueta de posto (asigna em generarEquiposConFormacion)
        const grupos = {};
        equipoLocal.forEach(j => {
            const pos = j.posicion || 'Sem posición';
            if (!grupos[pos]) grupos[pos] = [];
            grupos[pos].push(j);
        });

        formacionTemplate.postos.forEach(posto => {
            const jugadoresGrupo = grupos[posto.etiqueta] || [];
            const n = jugadoresGrupo.length;
            const info = classificarPosicao(posto.etiqueta, tipo) || { y: 50, xBase: 50, anchoMax: 40 };
            const xs = distribuirX(n || 1, info.xBase, info.anchoMax);

            jugadoresGrupo.forEach((j, i) => {
                // Menos jitter vertical — usamos a profundidade do mapa para
                // posicionamento consistente por rol, ajustando ligeiramente
                // para múltiplos jogadores pela mesma posição.
                let offsetY = 0;
                if (n > 1) {
                    const step = Math.min(6, 3 + Math.floor(n / 2));
                    offsetY = (i - (n - 1) / 2) * step;
                }
                resultado.push({ jogador: j, xPorc: xs[i] ?? xs[0], yPorc: Math.min(95, Math.max(5, info.y + offsetY)) });
            });
        });

        // Fallback: se houver jogadores não classificados pela formação, distribui-os em linhas
        const usados = new Set(resultado.map(r => r.jogador.id));
        const sobrantes = equipoLocal.filter(j => !usados.has(j.id));
        if (sobrantes.length > 0) {
            const xs = distribuirX(sobrantes.length, 50, 80);
            sobrantes.forEach((j, i) => resultado.push({ jogador: j, xPorc: xs[i], yPorc: 50 }));
        }

        if (dividePorRed) return resultado.map(r => ({ ...r, yPorc: 58 + (r.yPorc / 100) * 38 }));
        return resultado;
    }

    const formacao = formacion ? calcularFormacaoPrecisa(equipo, formacion) : calcularFormacao(equipo, posicionesInfo, tipo, dividePorRed);
    const usaSVG = SVG_FIELDS.includes(tipo);

    return (
        <View style={[styles.campo, { backgroundColor: cfg.fondo, aspectRatio: cfg.aspecto }]}>
            {!usaSVG && (
                <View style={styles.franjas} pointerEvents="none">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <View key={i} style={[styles.franja, { backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'transparent' }]} />
                    ))}
                </View>
            )}
            {!usaSVG && <View style={styles.vinheta} pointerEvents="none" />}

            {tipo === 'futbol' && <FieldFutbol11 />}
            {tipo === 'futbol7' && <FieldFutbol7 />}
            {tipo === 'futsal' && <FieldFutsal />}
            {tipo === 'tenis' && <FieldTenis />}

            {tipo === 'baloncesto' && (
                <FieldBasketball />
            )}

            {tipo === 'balonmano' && (
                <FieldHandball />
            )}

            {tipo === 'hockey' && (
                <FieldHockey />
            )}

            {tipo === 'rugby' && (
                <FieldRugby />
            )}

            {tipo === 'voleibol' && (
                <FieldVolleyball />
            )}

            {tipo === 'padel' && (
                <FieldPadel />
            )}

            {tipo === 'badminton' && (
                <FieldBadminton />
            )}

            {tipo === 'tenisMesa' && (
                <FieldTableTennis />
            )}

            {tipo === 'beisbol' && <FieldBaseball />}

            {tipo === 'generico' && (
                <>
                    <LineaCentral /><CirculoCentro diametro={60} />
                </>
            )}

            {formacao.map(({ jogador, xPorc, yPorc }) => (
                <View
                    key={jogador.id}
                    style={[
                        styles.jogadorAbs,
                        {
                            left: `${xPorc}%`,
                            top: `${yPorc}%`,
                            marginLeft: -(cardW / 2),
                            marginTop: -(cardH / 2),
                        },
                    ]}
                >
                    <PlayerJerseyCard jugador={jogador} size={tamanho} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    campo: {
        width: '100%',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: LINEA,
        overflow: 'hidden',
        position: 'relative',
    },
    franjas: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
    franja: { flex: 1 },
    vinheta: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 26,
        borderColor: 'rgba(0,0,0,0.10)',
        borderRadius: 30,
    },

    lineaMedio: { position: 'absolute', left: 0, right: 0, top: '50%', height: 2, backgroundColor: LINEA },
    circulo: { position: 'absolute', borderWidth: 2, borderColor: LINEA },
    puntoCentro: {
        position: 'absolute', top: '50%', left: '50%',
        width: 5, height: 5, borderRadius: 2.5, marginTop: -2.5, marginLeft: -2.5,
        backgroundColor: LINEA,
    },
    punto: { position: 'absolute', left: '50%', width: 5, height: 5, borderRadius: 2.5, marginLeft: -2.5, backgroundColor: LINEA },

    caja: { position: 'absolute', borderWidth: 2, borderColor: LINEA },
    arco: { position: 'absolute', borderWidth: 2, borderColor: LINEA, backgroundColor: 'transparent' },
    lineaPunteada: { position: 'absolute', height: 0, borderTopWidth: 2, borderColor: LINEA_SUAVE, borderStyle: 'dashed' },

    red: { position: 'absolute', left: 0, right: 0, top: '50%', height: 4, marginTop: -2, backgroundColor: 'rgba(255,255,255,0.9)' },
    poste: { position: 'absolute', top: '46%', width: 4, height: '8%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2 },

    cajaServicio: { position: 'absolute', left: '12%', right: '12%', borderWidth: 1.5, borderColor: LINEA_SUAVE },
    lineaServicioCentral: { position: 'absolute', left: '50%', width: 2, marginLeft: -1, backgroundColor: LINEA_SUAVE },

    postesWrap: { position: 'absolute', left: '50%', marginLeft: -17, width: 34, height: 24 },
    posteIzq: { position: 'absolute', left: 0, top: 0, width: 3, height: 24, backgroundColor: 'rgba(255,255,255,0.9)' },
    posteDer: { position: 'absolute', right: 0, top: 0, width: 3, height: 24, backgroundColor: 'rgba(255,255,255,0.9)' },
    travesano: { position: 'absolute', top: 16, left: 0, right: 0, height: 3, backgroundColor: 'rgba(255,255,255,0.9)' },

    diamanteWrap: {
        position: 'absolute', left: '10%', right: '10%', bottom: '6%', height: '46%',
        alignItems: 'center', justifyContent: 'flex-end',
    },
    diamante: {
        width: '78%', aspectRatio: 1,
        backgroundColor: '#8b5e34', borderWidth: 2, borderColor: 'rgba(255,255,255,0.7)',
        transform: [{ rotate: '45deg' }],
    },
    monticulo: {
        position: 'absolute', bottom: '34%', width: 16, height: 16, borderRadius: 8,
        backgroundColor: '#a9744a', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
    },

    jogadorAbs: { position: 'absolute' },
});