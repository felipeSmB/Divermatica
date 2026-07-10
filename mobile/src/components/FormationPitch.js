import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, ClipPath } from 'react-native-svg';
import PlayerJerseyCard, { JERSEY_SIZES } from './PlayerJerseyCard';
import { detetarDeporte, calcularFormacao } from '../utils/posicionamento';

const LINEA = 'rgba(255,255,255,0.85)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const TENIS_APRON = '#155a92';
const TENIS_COURT = '#2f86c9';

/* =====================================================
   CAMPOS EM SVG — Futebol 11, Futebol 7, Futsal, Ténis
   Medidas reais convertidas para unidades = decímetros
   (1 unidade = 0,1m), para ficarem exatas e legíveis.
   ===================================================== */

// --- FUTEBOL 11 — 100,6 × 64m (imagem "Dimensiones del campo de fútbol 11") ---
function FieldFutbol11() {
    const W = 640, H = 1006; // largura x comprimento (baliza-a-baliza no eixo vertical)
    const cx = W / 2;
    const boxW = 403.2, boxD = 165;   // grande área: 40,32m largura / 16,5m profundidade
    const goalW = 183.2, goalD = 55;  // pequena área: 18,32m largura / 5,5m profundidade
    const penaltyDist = 110;          // grande penalidade a 11m
    const circleR = 91.5;             // círculo central e arco: 9,15m
    const cornerR = 9;                // cantos: 0,9m
    const spotR = 3.2;
    const dy = boxD - penaltyDist;
    const dx = Math.sqrt(circleR * circleR - dy * dy);

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <ClipPath id="f11ArcTop"><Rect x={0} y={boxD} width={W} height={H - boxD} /></ClipPath>
                <ClipPath id="f11ArcBot"><Rect x={0} y={0} width={W} height={H - boxD} /></ClipPath>
            </Defs>

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
        </Svg>
    );
}

// --- FUTEBOL 7 — 55 × 36,5m (imagem "Dimensiones del campo de fútbol 7") ---
function FieldFutbol7() {
    const W = 365, H = 550;
    const cx = W / 2;
    const boxW = 165, boxD = 91;  // área: 16,5m largura / 9,1m profundidade
    const goalW = 60;             // baliza: 6m
    const penaltyDist = 73;       // penalidade a 7,3m
    const circleR = 55;           // círculo central: 5,5m
    const spotR = 3;
    const dy = boxD - penaltyDist;
    const dx = Math.sqrt(Math.max(circleR * circleR - dy * dy, 0));

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <ClipPath id="f7ArcTop"><Rect x={0} y={boxD} width={W} height={H - boxD} /></ClipPath>
                <ClipPath id="f7ArcBot"><Rect x={0} y={0} width={W} height={H - boxD} /></ClipPath>
            </Defs>

            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            <Rect x={cx - boxW / 2} y={0} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={penaltyDist} r={spotR} fill={LINEA} />
            {/* Arco de penalização a tracejado — a própria referência assinala-o como "opcional" */}
            <Circle cx={cx} cy={penaltyDist} r={circleR} clipPath="url(#f7ArcTop)" fill="none" stroke={LINEA_SUAVE} strokeWidth={2.5} strokeDasharray="7,6" />
            <Line x1={cx - goalW / 2} y1={0} x2={cx + goalW / 2} y2={0} stroke={LINEA} strokeWidth={7} />

            <Rect x={cx - boxW / 2} y={H - boxD} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - penaltyDist} r={circleR} clipPath="url(#f7ArcBot)" fill="none" stroke={LINEA_SUAVE} strokeWidth={2.5} strokeDasharray="7,6" />
            <Line x1={cx - goalW / 2} y1={H} x2={cx + goalW / 2} y2={H} stroke={LINEA} strokeWidth={7} />
        </Svg>
    );
}

// --- FUTSAL — 40 × 20m, área em arco (imagem "Medidas de campo de fútbol sala") ---
function FieldFutsal() {
    const W = 200, H = 400;
    const cx = W / 2;
    const postHalf = 15;   // meia-largura da baliza: 3m
    const archR = 60;      // raio do arco: 6m
    const spot1 = 60, spot2 = 100; // marcas de penálti: 6m e 10m
    const circleR = 30;    // círculo central: 3m
    const spotR = 2.6;

    const arcTop = `M ${cx - postHalf - archR} 0 A ${archR} ${archR} 0 0 0 ${cx - postHalf} ${archR} L ${cx + postHalf} ${archR} A ${archR} ${archR} 0 0 1 ${cx + postHalf + archR} 0`;
    const arcBot = `M ${cx - postHalf - archR} ${H} A ${archR} ${archR} 0 0 1 ${cx - postHalf} ${H - archR} L ${cx + postHalf} ${H - archR} A ${archR} ${archR} 0 0 0 ${cx + postHalf + archR} ${H}`;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            <Path d={arcTop} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={spot2} r={spotR} fill={LINEA} />
            <Line x1={cx - postHalf} y1={0} x2={cx + postHalf} y2={0} stroke={LINEA} strokeWidth={7} />

            <Path d={arcBot} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - spot2} r={spotR} fill={LINEA} />
            <Line x1={cx - postHalf} y1={H} x2={cx + postHalf} y2={H} stroke={LINEA} strokeWidth={7} />

            {/* Marcas da zona de substituição, 5m de cada lado do meio-campo */}
            <Line x1={0} y1={H / 2 - 50} x2={6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={0} y1={H / 2 + 50} x2={6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={W} y1={H / 2 - 50} x2={W - 6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={W} y1={H / 2 + 50} x2={W - 6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />
        </Svg>
    );
}

// --- TÉNIS — pista de pares 23,77 × 10,97m, com zona de recuo (imagem "Marcación de pistas de tenis") ---
function FieldTenis() {
    const ox = 12, oy = 18; // zona de recuo (apron)
    const cw = 109.7, ch = 237.7; // pista de pares
    const singlesInset = 13.7;
    const serviceOffset = 64;
    const W = cw + ox * 2, H = ch + oy * 2;
    const netY = oy + ch / 2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
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
    futbol7:    { fondo: '#0f6b3a', aspecto: 0.6636 }, // NOVO
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

/* =====================================================
   COMPONENTE PRINCIPAL
   ===================================================== */

export default function FormationPitch({ equipo, posicionesInfo, deporte, small }) {
    const tipo = detetarDeporte(deporte);
    const cfg = CONFIG[tipo];
    const dividePorRed = DIVIDE_POR_RED.includes(tipo);
    const denso = equipo.length >= 9;
    const tamanho = small || denso ? 'small' : 'normal';
    const { width: cardW, height: cardH } = JERSEY_SIZES[tamanho];

    const formacao = calcularFormacao(equipo, posicionesInfo, tipo, dividePorRed);

    return (
        <View style={[styles.campo, { backgroundColor: cfg.fondo, aspectRatio: cfg.aspecto }]}>
            {tipo !== 'tenis' && (
                <View style={styles.franjas} pointerEvents="none">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <View key={i} style={[styles.franja, { backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'transparent' }]} />
                    ))}
                </View>
            )}
            <View style={styles.vinheta} pointerEvents="none" />

            {tipo === 'futbol' && <FieldFutbol11 />}
            {tipo === 'futbol7' && <FieldFutbol7 />}
            {tipo === 'futsal' && <FieldFutsal />}
            {tipo === 'tenis' && <FieldTenis />}

            {tipo === 'baloncesto' && (
                <>
                    <LineaCentral /><CirculoCentro diametro={64} />
                    <CajaArea extremo="arriba" anchoPorc={30} altoPorc={20} />
                    <ArcoRecortado extremo="arriba" diametro={70} distanciaBorde="20%" />
                    <ArcoRecortado extremo="arriba" diametro={26} distanciaBorde="8%" />
                    <ArcoRecortado extremo="arriba" diametro={300} distanciaBorde={0} />
                    <CajaArea extremo="abajo" anchoPorc={30} altoPorc={20} />
                    <ArcoRecortado extremo="abajo" diametro={70} distanciaBorde="20%" />
                    <ArcoRecortado extremo="abajo" diametro={26} distanciaBorde="8%" />
                    <ArcoRecortado extremo="abajo" diametro={300} distanciaBorde={0} />
                </>
            )}

            {tipo === 'balonmano' && (
                <>
                    <LineaCentral />
                    <ArcoRecortado extremo="arriba" diametro={170} distanciaBorde={0} />
                    <ArcoRecortado extremo="arriba" diametro={230} distanciaBorde={0} dashed />
                    <Punto extremo="arriba" distanciaPorc={11} />
                    <ArcoRecortado extremo="abajo" diametro={170} distanciaBorde={0} />
                    <ArcoRecortado extremo="abajo" diametro={230} distanciaBorde={0} dashed />
                    <Punto extremo="abajo" distanciaPorc={11} />
                </>
            )}

            {tipo === 'hockey' && (
                <>
                    <LineaCentral />
                    <ArcoRecortado extremo="arriba" diametro={150} distanciaBorde={0} />
                    <ArcoRecortado extremo="abajo" diametro={150} distanciaBorde={0} />
                </>
            )}

            {tipo === 'rugby' && (
                <>
                    <LineaCentral />
                    <LineaPunteada extremo="arriba" distanciaPorc={22} />
                    <LineaPunteada extremo="abajo" distanciaPorc={22} />
                    <CajaArea extremo="arriba" anchoPorc={10} altoPorc={6} />
                    <CajaArea extremo="abajo" anchoPorc={10} altoPorc={6} />
                    <Postes extremo="arriba" />
                    <Postes extremo="abajo" />
                </>
            )}

            {tipo === 'voleibol' && (
                <>
                    <Red />
                    <LineaPunteada extremo="arriba" distanciaPorc={25} />
                    <LineaPunteada extremo="abajo" distanciaPorc={25} />
                </>
            )}

            {tipo === 'padel' && (
                <>
                    <Red />
                    <CajasServicio profundidadPorc={30} />
                </>
            )}

            {tipo === 'badminton' && (
                <>
                    <Red />
                    <CajasServicio profundidadPorc={16} />
                </>
            )}

            {tipo === 'tenisMesa' && (
                <>
                    <Red />
                    <LineaPunteada extremo="arriba" distanciaPorc={4} />
                    <LineaPunteada extremo="abajo" distanciaPorc={4} />
                </>
            )}

            {tipo === 'beisbol' && <Diamante />}

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