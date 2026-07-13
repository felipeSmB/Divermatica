import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.6)';
const PITCH_A = '#0e7a42';
const PITCH_B = '#0a5c32';
const INGOAL = 'rgba(255,255,255,0.05)';

// --- RUGBY (União) — campo de jogo 100m + 2 zonas de ensaio de 10m
// (120m) x 70m (1 unidade = 5cm), em retrato, com as duas balizas em
// cima/baixo, tal como os restantes campos do projeto. ---
export default function FieldRugby() {
    const W = 350, H = 600; // 70m x 120m, escala 5/m
    const inGoalD = 50; // 10m
    const line22 = 110; // 22m
    const line10 = 50; // 10m a partir do meio-campo
    const half = H / 2;

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

            {/* Zonas de ensaio (in-goal), com sombreado ligeiro */}
            <Rect x={0} y={0} width={W} height={inGoalD} fill={INGOAL} />
            <Rect x={0} y={H - inGoalD} width={W} height={inGoalD} fill={INGOAL} />

            {/* Limite exterior */}
            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={2} />

            {/* Linhas de ensaio (try-lines) */}
            <Line x1={0} y1={inGoalD} x2={W} y2={inGoalD} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={0} y1={H - inGoalD} x2={W} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de 22m */}
            <Line x1={0} y1={inGoalD + line22} x2={W} y2={inGoalD + line22} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={0} y1={H - inGoalD - line22} x2={W} y2={H - inGoalD - line22} stroke={LINEA} strokeWidth={1.6} />

            {/* Linha de meio-campo */}
            <Line x1={0} y1={half} x2={W} y2={half} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de 10m (cada lado do meio-campo) */}
            <Line x1={0} y1={half - line10} x2={W} y2={half - line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />
            <Line x1={0} y1={half + line10} x2={W} y2={half + line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />

            {/* Marcas de 5m e 15m junto às linhas laterais */}
            {Array.from({ length: 12 }).map((_, i) => {
                const y = inGoalD + (i + 0.5) * ((H - inGoalD * 2) / 12);
                return (
                    <React.Fragment key={i}>
                        <Line x1={25} y1={y} x2={25} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={75} y1={y} x2={75} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={W - 25} y1={y} x2={W - 25} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                        <Line x1={W - 75} y1={y} x2={W - 75} y2={y + 6} stroke={LINEA_SUAVE} strokeWidth={1.2} />
                    </React.Fragment>
                );
            })}

            {/* Postes em H (topo) */}
            <Line x1={W / 2 - 14} y1={inGoalD - 30} x2={W / 2 - 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={W / 2 + 14} y1={inGoalD - 30} x2={W / 2 + 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={W / 2 - 14} y1={inGoalD - 12} x2={W / 2 + 14} y2={inGoalD - 12} stroke={LINEA} strokeWidth={2.6} />

            {/* Postes em H (base, espelhados) */}
            <Line x1={W / 2 - 14} y1={H - inGoalD} x2={W / 2 - 14} y2={H - inGoalD + 30} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={W / 2 + 14} y1={H - inGoalD} x2={W / 2 + 14} y2={H - inGoalD + 30} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={W / 2 - 14} y1={H - inGoalD + 12} x2={W / 2 + 14} y2={H - inGoalD + 12} stroke={LINEA} strokeWidth={2.6} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#rugbyVig)" />
        </Svg>
    );
}