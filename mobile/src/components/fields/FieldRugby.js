import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.6)';
const PITCH_A = '#0e7a42';
const PITCH_B = '#0a5c32';
const INGOAL = 'rgba(255,255,255,0.05)';

// --- RUGBY (União) — campo de jogo 100m + 2 zonas de ensaio de 10m
// (120m) x 70m (1 unidade = 5cm), em retrato, com as duas balizas em
// cima/baixo, tal como os restantes campos do projeto.
// A tela (W) é ligeiramente mais larga do que o campo real (pitchW) para
// que o rácio visual final fique igual ao do Futebol 11 / Futebol 7 —
// a diferença fica como margem lateral (padX), à semelhança da apron
// que já existe nos outros campos. ---
export default function FieldRugby() {
    const pitchW = 350; // 70m
    const W = 382, H = 600; // + margens laterais para igualar o rácio do Futebol 11/7
    const padX = (W - pitchW) / 2; // 16
    const left = padX;
    const right = padX + pitchW;
    const inGoalD = 50; // 10m
    const line22 = 110; // 22m
    const line10 = 50; // 10m a partir do meio-campo
    const half = H / 2;
    const cx = W / 2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="rugbyPitch" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={PITCH_A} />
                    <Stop offset="0.5" stopColor="#0c6c3a" />
                    <Stop offset="1" stopColor={PITCH_B} />
                </LinearGradient>
                <RadialGradient id="rugbyVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#rugbyPitch)" />

            {/* Zonas de ensaio (in-goal), com sombreado ligeiro — confinadas ao campo real */}
            <Rect x={left} y={0} width={pitchW} height={inGoalD} fill={INGOAL} />
            <Rect x={left} y={H - inGoalD} width={pitchW} height={inGoalD} fill={INGOAL} />

            {/* Linha lateral (touchline) esquerda e direita */}
            <Line x1={left} y1={0} x2={left} y2={H} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={right} y1={0} x2={right} y2={H} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de ensaio (try-lines) */}
            <Line x1={left} y1={inGoalD} x2={right} y2={inGoalD} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={left} y1={H - inGoalD} x2={right} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de 22m */}
            <Line x1={left} y1={inGoalD + line22} x2={right} y2={inGoalD + line22} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={left} y1={H - inGoalD - line22} x2={right} y2={H - inGoalD - line22} stroke={LINEA} strokeWidth={1.6} />

            {/* Linha de meio-campo */}
            <Line x1={left} y1={half} x2={right} y2={half} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de 10m (cada lado do meio-campo) */}
            <Line x1={left} y1={half - line10} x2={right} y2={half - line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />
            <Line x1={left} y1={half + line10} x2={right} y2={half + line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />

            {/* Marcas de 5m e 15m junto às linhas laterais */}
            {Array.from({ length: 12 }).map((_, i) => {
                const y = inGoalD + (i + 0.5) * ((H - inGoalD * 2) / 12);
                return (
                    <React.Fragment key={i}>
                        <Line x1={left + 25} y1={y} x2={left + 25} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={left + 75} y1={y} x2={left + 75} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={right - 25} y1={y} x2={right - 25} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={right - 75} y1={y} x2={right - 75} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                    </React.Fragment>
                );
            })}

            {/* Postes em H (topo) */}
            <Line x1={cx - 14} y1={inGoalD - 30} x2={cx - 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx + 14} y1={inGoalD - 30} x2={cx + 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx - 14} y1={inGoalD - 12} x2={cx + 14} y2={inGoalD - 12} stroke={LINEA} strokeWidth={2.6} />

            {/* Postes em H (base, espelhados) */}
            <Line x1={cx - 14} y1={H - inGoalD} x2={cx - 14} y2={H - inGoalD + 30} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx + 14} y1={H - inGoalD} x2={cx + 14} y2={H - inGoalD + 30} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx - 14} y1={H - inGoalD + 12} x2={cx + 14} y2={H - inGoalD + 12} stroke={LINEA} strokeWidth={2.6} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#rugbyVig)" />
        </Svg>
    );
}