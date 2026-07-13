import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, ClipPath, RadialGradient, LinearGradient, Stop } from 'react-native-svg';
import PlayerJerseyCard, { JERSEY_SIZES } from '../PlayerJerseyCard';
import { detetarDeporte, calcularFormacao } from '../../utils/posicionamento';
import { classificarPosicao, distribuirX } from '../../utils/posicionamento';
import FieldBasketball from './FieldBasketball';
import FieldRugby from './FieldRugby';
import FieldHandball from './FieldHandball';

const LINEA = 'rgba(255,255,255,0.85)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const GRASS_A = '#0e6b39';
const GRASS_B = '#125f34';

const POSICIONES_FORMACION = {
    futbol: {
        '4-3-3': {
            Portero: [{ x: 50, y: 6 }],
            Defensa: [
                { x: 14, y: 26 },
                { x: 40, y: 22 },
                { x: 60, y: 22 },
                { x: 86, y: 26 },
            ],
            Centrocampista: [
                { x: 22, y: 46 },
                { x: 50, y: 52 },
                { x: 78, y: 46 },
            ],
            Delantero: [
                { x: 14, y: 78 },
                { x: 50, y: 84 },
                { x: 86, y: 78 },
            ],
        },
        '4-4-2': {
            Portero: [{ x: 50, y: 6 }],
            Defensa: [
                { x: 14, y: 26 },
                { x: 40, y: 22 },
                { x: 60, y: 22 },
                { x: 86, y: 26 },
            ],
            Centrocampista: [
                { x: 18, y: 46 },
                { x: 42, y: 52 },
                { x: 58, y: 52 },
                { x: 82, y: 46 },
            ],
            Delantero: [
                { x: 35, y: 74 },
                { x: 65, y: 74 },
            ],
        },
        '3-5-2': {
            Portero: [{ x: 50, y: 6 }],
            Defensa: [
                { x: 24, y: 24 },
                { x: 50, y: 20 },
                { x: 76, y: 24 },
            ],
            Centrocampista: [
                { x: 15, y: 46 },
                { x: 38, y: 50 },
                { x: 50, y: 54 },
                { x: 62, y: 50 },
                { x: 85, y: 46 },
            ],
            Delantero: [
                { x: 36, y: 78 },
                { x: 64, y: 78 },
            ],
        },
        '4-2-3-1': {
            Portero: [{ x: 50, y: 6 }],
            Defensa: [
                { x: 14, y: 26 },
                { x: 40, y: 22 },
                { x: 60, y: 22 },
                { x: 86, y: 26 },
            ],
            Mediocentro: [
                { x: 39, y: 44 },
                { x: 61, y: 44 },
            ],
            Mediapunta: [
                { x: 18, y: 58 },
                { x: 50, y: 64 },
                { x: 82, y: 58 },
            ],
            Delantero: [{ x: 50, y: 80 }],
        },
        '3-4-3': {
            Portero: [{ x: 50, y: 6 }],
            Defensa: [
                { x: 20, y: 24 },
                { x: 50, y: 20 },
                { x: 80, y: 24 },
            ],
            Centrocampista: [
                { x: 18, y: 46 },
                { x: 42, y: 50 },
                { x: 58, y: 50 },
                { x: 82, y: 46 },
            ],
            Delantero: [
                { x: 14, y: 78 },
                { x: 50, y: 84 },
                { x: 86, y: 78 },
            ],
        },
    },
    futbol7: {
        '3-2-1': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [
                { x: 18, y: 26 },
                { x: 50, y: 20 },
                { x: 82, y: 26 },
            ],
            Centrocampista: [
                { x: 34, y: 44 },
                { x: 66, y: 44 },
            ],
            Delantero: [{ x: 50, y: 76 }],
        },
        '2-3-1': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [
                { x: 28, y: 26 },
                { x: 72, y: 26 },
            ],
            Centrocampista: [
                { x: 18, y: 48 },
                { x: 50, y: 42 },
                { x: 82, y: 48 },
            ],
            Delantero: [{ x: 50, y: 76 }],
        },
        '1-2-1-2': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [{ x: 50, y: 24 }],
            Centrocampista: [
                { x: 36, y: 44 },
                { x: 64, y: 44 },
            ],
            Mediapunta: [{ x: 50, y: 58 }],
            Delantero: [
                { x: 34, y: 74 },
                { x: 66, y: 74 },
            ],
        },
        '2-1-2-1': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [
                { x: 28, y: 26 },
                { x: 72, y: 26 },
            ],
            Centrocampista: [{ x: 50, y: 44 }],
            Ala: [
                { x: 18, y: 54 },
                { x: 82, y: 54 },
            ],
            Delantero: [{ x: 50, y: 76 }],
        },
        '2-2-2': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [
                { x: 28, y: 26 },
                { x: 72, y: 26 },
            ],
            Ala: [
                { x: 30, y: 52 },
                { x: 70, y: 52 },
            ],
            Delantero: [
                { x: 34, y: 74 },
                { x: 66, y: 74 },
            ],
        },
    },
    futsal: {
        '3-1': {
            Portero: [{ x: 50, y: 8 }],
            Fixo: [{ x: 50, y: 26 }],
            Ala: [
                { x: 22, y: 46 },
                { x: 78, y: 46 },
            ],
            'Pivô': [{ x: 50, y: 74 }],
        },
        '2-2': {
            Portero: [{ x: 50, y: 8 }],
            Defensa: [
                { x: 26, y: 28 },
                { x: 74, y: 28 },
            ],
            Atacante: [
                { x: 38, y: 62 },
                { x: 62, y: 62 },
            ],
        },
        '4-0': {
            Portero: [{ x: 50, y: 8 }],
            Ala: [
                { x: 22, y: 38 },
                { x: 39, y: 38 },
                { x: 61, y: 38 },
                { x: 78, y: 38 },
            ],
        },
        'Australiano (1-2-1)': {
            Portero: [{ x: 50, y: 8 }],
            Fixo: [{ x: 50, y: 26 }],
            Ala: [
                { x: 22, y: 46 },
                { x: 78, y: 46 },
            ],
            'Pivô': [{ x: 50, y: 74 }],
        },
        'Goleiro-Linha (3-2)': {
            'Goleiro-Linha': [{ x: 50, y: 20 }],
            Defensa: [
                { x: 25, y: 40 },
                { x: 50, y: 36 },
                { x: 75, y: 40 },
            ],
            Atacante: [{ x: 50, y: 74 }],
        },
        'Goleiro-Linha (2-3)': {
            'Goleiro-Linha': [{ x: 50, y: 20 }],
            Defensa: [
                { x: 31, y: 38 },
                { x: 69, y: 38 },
            ],
            Atacante: [
                { x: 31, y: 64 },
                { x: 69, y: 64 },
            ],
        },
    },
    baloncesto: {
        'Quinteto titular': {
            Base: [{ x: 50, y: 24 }],
            Escolta: [{ x: 30, y: 38 }],
            Alero: [{ x: 70, y: 38 }],
            'Ala-Pívot': [{ x: 36, y: 62 }],
            'Pívot': [{ x: 56, y: 78 }],
        },
        'Zona 2-3': {
            Escolta: [
                { x: 28, y: 30 },
                { x: 72, y: 30 },
            ],
            'Pívot': [
                { x: 27, y: 66 },
                { x: 50, y: 78 },
                { x: 73, y: 66 },
            ],
        },
        'Zona 3-2': {
            Escolta: [
                { x: 23, y: 28 },
                { x: 50, y: 28 },
                { x: 77, y: 28 },
            ],
            'Pívot': [
                { x: 37, y: 68 },
                { x: 63, y: 68 },
            ],
        },
        'Defesa Individual': {
            Base: [{ x: 50, y: 24 }],
            Escolta: [{ x: 28, y: 38 }],
            Alero: [{ x: 72, y: 38 }],
            'Ala-Pívot': [{ x: 36, y: 64 }],
            'Pívot': [{ x: 56, y: 78 }],
        },
        'Motion Offense': {
            Base: [{ x: 44, y: 24 }],
            Escolta: [{ x: 25, y: 40 }],
            Alero: [{ x: 75, y: 40 }],
            'Ala-Pívot': [{ x: 37, y: 64 }],
            'Pívot': [{ x: 54, y: 76 }],
        },
        'Pick and Roll': {
            Base: [{ x: 44, y: 28 }],
            'Ala-Pívot': [{ x: 50, y: 34 }],
            Escolta: [{ x: 23, y: 40 }],
            Alero: [{ x: 77, y: 40 }],
            'Pívot': [{ x: 56, y: 74 }],
        },
    },
    balonmano: {
        'Andebol 7': {
            'Guarda-Redes': [{ x: 50, y: 8 }],
            'Ponta Esquerda': [{ x: 15, y: 76 }],
            'Lateral Esquerdo': [{ x: 29, y: 42 }],
            Central: [{ x: 50, y: 38 }],
            Pivot: [{ x: 50, y: 80 }],
            'Lateral Direito': [{ x: 71, y: 42 }],
            'Ponta Direita': [{ x: 85, y: 76 }],
        },
    },
    rugby: {
        'XV Completo': {
            Pilar: [
                { x: 38, y: 10 },
                { x: 62, y: 10 },
            ],
            Talonador: [{ x: 50, y: 8 }],
            'Segunda Linha': [
                { x: 42, y: 18 },
                { x: 58, y: 18 },
            ],
            Ala: [
                { x: 26, y: 26 },
                { x: 74, y: 26 },
            ],
            'Número 8': [{ x: 50, y: 28 }],
            'Médio Scrum': [{ x: 50, y: 40 }],
            Abertura: [{ x: 50, y: 50 }],
            Centro: [
                { x: 36, y: 60 },
                { x: 64, y: 60 },
            ],
            Ponta: [
                { x: 12, y: 76 },
                { x: 88, y: 76 },
            ],
            Zagueiro: [{ x: 50, y: 90 }],
        },
    },
};

function obtenerPosicionesFormacion(tipo, etiquetaFormacion, puestoEtiqueta, cantidad) {
    const form = POSICIONES_FORMACION[tipo]?.[etiquetaFormacion];
    if (!form) return null;
    const posiciones = form[puestoEtiqueta];
    if (!posiciones) return null;
    if (posiciones.length === cantidad) return posiciones;
    if (posiciones.length > cantidad) return posiciones.slice(0, cantidad);
    if (posiciones.length === 1) return Array.from({ length: cantidad }, () => posiciones[0]);
    return posiciones;
}

// Faixas de relva cortada (mowing stripes) — largura real de uma faixa
// de corte profissional (~9m); o nº de faixas muda consoante o
// comprimento real de cada campo.
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
   CAMPOS EM SVG — Futebol 11, Futebol 7, Futsal
   Medidas reais convertidas para unidades = decímetros
   (1 unidade = 0,1m), para ficarem exatas e legíveis.
   ===================================================== */

// --- FUTEBOL 11 — 100,6 × 64m ---
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

            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            <Rect x={cx - boxW / 2} y={0} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Rect x={cx - goalW / 2} y={0} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={penaltyDist} r={circleR} clipPath="url(#f11ArcTop)" fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={cx - goalW / 2 + 10} y1={0} x2={cx + goalW / 2 - 10} y2={0} stroke={LINEA} strokeWidth={7} />

            <Rect x={cx - boxW / 2} y={H - boxD} width={boxW} height={boxD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Rect x={cx - goalW / 2} y={H - goalD} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - penaltyDist} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - penaltyDist} r={circleR} clipPath="url(#f11ArcBot)" fill="none" stroke={LINEA} strokeWidth={3} />
            <Line x1={cx - goalW / 2 + 10} y1={H} x2={cx + goalW / 2 - 10} y2={H} stroke={LINEA} strokeWidth={7} />

            <Path d={`M ${cornerR} 0 A ${cornerR} ${cornerR} 0 0 0 0 ${cornerR}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M ${W - cornerR} 0 A ${cornerR} ${cornerR} 0 0 1 ${W} ${cornerR}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M 0 ${H - cornerR} A ${cornerR} ${cornerR} 0 0 1 ${cornerR} ${H}`} stroke={LINEA} strokeWidth={3} fill="none" />
            <Path d={`M ${W} ${H - cornerR} A ${cornerR} ${cornerR} 0 0 0 ${W - cornerR} ${H}`} stroke={LINEA} strokeWidth={3} fill="none" />

            <Rect x={0} y={0} width={W} height={H} fill="url(#f11Vig)" />
        </Svg>
    );
}

// --- FUTEBOL 7 — 55 × 36,5m ---
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

// --- FUTSAL — 40 × 20m, zona de baliza em "D" (arco de 6m), tal como o
// campo real de futsal (baliza + retângulo de profundidade + arco duplo). ---
function FieldFutsal() {
    const courtW = 200; // 20m — largura real da pista
    const W = 232, H = 400;
    const padX = (W - courtW) / 2; // 16 — margem mínima para igualar a escala das outras modalidades
    const cx = W / 2;
    const postHalf = 15; // meia-largura da baliza (3m)
    const archR = 60; // raio do arco da área (6m)
    const spot1 = 60, spot2 = 100; // marca de grande penalidade (6m) e dupla penalidade (10m)
    const circleR = 30;
    const spotR = 2.6;
    const goalDepth = 8;

    const arcTop = `M ${cx - postHalf - archR} 0 A ${archR} ${archR} 0 0 0 ${cx - postHalf} ${archR} L ${cx + postHalf} ${archR} A ${archR} ${archR} 0 0 1 ${cx + postHalf + archR} 0 Z`;
    const arcBot = `M ${cx - postHalf - archR} ${H} A ${archR} ${archR} 0 0 1 ${cx - postHalf} ${H - archR} L ${cx + postHalf} ${H - archR} A ${archR} ${archR} 0 0 0 ${cx + postHalf + archR} ${H} Z`;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="futsalPiso" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#2266b8" />
                    <Stop offset="0.5" stopColor="#1c58a0" />
                    <Stop offset="1" stopColor="#154a89" />
                </LinearGradient>
                <RadialGradient id="futsalVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#futsalPiso)" />

            {/* Linhas laterais da pista (limite real do campo) */}
            <Rect x={padX} y={0} width={courtW} height={H} fill="none" stroke={LINEA} strokeWidth={3} />

            <Line x1={padX} y1={H / 2} x2={padX + courtW} y2={H / 2} stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={circleR} fill="none" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={spotR} fill={LINEA} />

            {/* Área de baliza de cima (arco duplo em D, laranja sólido) */}
            <Path d={arcTop} fill="#f5921e" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={spot2} r={spotR} fill={LINEA} />
            <Rect x={cx - postHalf} y={-goalDepth} width={postHalf * 2} height={goalDepth} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - postHalf} y1={0} x2={cx + postHalf} y2={0} stroke={LINEA} strokeWidth={7} />

            {/* Área de baliza de baixo (espelhada) */}
            <Path d={arcBot} fill="#f5921e" stroke={LINEA} strokeWidth={3} />
            <Circle cx={cx} cy={H - spot1} r={spotR} fill={LINEA} />
            <Circle cx={cx} cy={H - spot2} r={spotR} fill={LINEA} />
            <Rect x={cx - postHalf} y={H} width={postHalf * 2} height={goalDepth} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - postHalf} y1={H} x2={cx + postHalf} y2={H} stroke={LINEA} strokeWidth={7} />

            {/* Marcas de substituição no meio-campo */}
            <Line x1={padX} y1={H / 2 - 50} x2={padX + 6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={padX} y1={H / 2 + 50} x2={padX + 6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={padX + courtW} y1={H / 2 - 50} x2={padX + courtW - 6} y2={H / 2 - 50} stroke={LINEA} strokeWidth={2.5} />
            <Line x1={padX + courtW} y1={H / 2 + 50} x2={padX + courtW - 6} y2={H / 2 + 50} stroke={LINEA} strokeWidth={2.5} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#futsalVig)" />
        </Svg>
    );
}

/* =====================================================
   CONFIGURAÇÃO VISUAL POR DESPORTO
   ===================================================== */

const CONFIG = {
    futbol:     { fondo: '#0f6b3a', aspecto: 0.6362 },
    futbol7:    { fondo: '#0f6b3a', aspecto: 0.6636 },
    futsal:     { fondo: '#1c58a0', aspecto: 0.58 },
    baloncesto: { fondo: '#c98f4e', aspecto: 0.579 },
    balonmano:  { fondo: '#147a58', aspecto: 0.58 },
    rugby:      { fondo: '#0c6c3a', aspecto: 0.6033 },
};

const SVG_FIELDS = ['futbol', 'futbol7', 'futsal', 'baloncesto', 'balonmano', 'rugby'];

/* =====================================================
   COMPONENTE PRINCIPAL
   ===================================================== */

export default function FormationPitch({ equipo, posicionesInfo, deporte, small, formacion }) {
    const tipo = detetarDeporte(deporte);
    const cfg = CONFIG[tipo] || CONFIG.futbol;
    const denso = equipo.length >= 9;
    const tamanho = small || denso ? 'small' : 'normal';
    const { width: cardW, height: cardH } = JERSEY_SIZES[tamanho];

    function calcularFormacaoPrecisa(equipoLocal, formacionTemplate) {
        const resultado = [];
        if (!formacionTemplate) return [];

        const grupos = {};
        equipoLocal.forEach(j => {
            const pos = j.posicion || 'Sem posición';
            if (!grupos[pos]) grupos[pos] = [];
            grupos[pos].push(j);
        });

        formacionTemplate.postos.forEach(posto => {
            const jugadoresGrupo = grupos[posto.etiqueta] || [];
            const posiciones = obtenerPosicionesFormacion(tipo, formacionTemplate.etiqueta, posto.etiqueta, jugadoresGrupo.length);

            if (posiciones && posiciones.length > 0) {
                jugadoresGrupo.forEach((j, i) => {
                    const posicion = posiciones[i] || posiciones[0];
                    resultado.push({ jogador: j, xPorc: posicion.x, yPorc: posicion.y });
                });
            } else {
                const n = jugadoresGrupo.length;
                const info = classificarPosicao(posto.etiqueta, tipo) || { y: 50, xBase: 50, anchoMax: 40 };
                const xs = distribuirX(n || 1, info.xBase, info.anchoMax);

                jugadoresGrupo.forEach((j, i) => {
                    let offsetY = 0;
                    if (n > 1) {
                        const step = Math.min(6, 3 + Math.floor(n / 2));
                        offsetY = (i - (n - 1) / 2) * step;
                    }
                    resultado.push({ jogador: j, xPorc: Math.min(92, Math.max(8, xs[i] ?? xs[0])), yPorc: Math.min(94, Math.max(6, info.y + offsetY)) });
                });
            }
        });

        const usados = new Set(resultado.map(r => r.jogador.id));
        const sobrantes = equipoLocal.filter(j => !usados.has(j.id));
        if (sobrantes.length > 0) {
            const xs = distribuirX(sobrantes.length, 50, 76);
            sobrantes.forEach((j, i) => resultado.push({ jogador: j, xPorc: xs[i], yPorc: 50 }));
        }

        return resultado;
    }

    const formacao = formacion ? calcularFormacaoPrecisa(equipo, formacion) : calcularFormacao(equipo, posicionesInfo, tipo, false);
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
            {tipo === 'baloncesto' && <FieldBasketball />}
            {tipo === 'balonmano' && <FieldHandball />}
            {tipo === 'rugby' && <FieldRugby />}

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

    jogadorAbs: { position: 'absolute' },
});