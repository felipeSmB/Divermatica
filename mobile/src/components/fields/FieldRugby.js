import React from 'react';
import Svg, { Rect, Line, Defs, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.95)';
const LINEA_TRACEJADA = 'rgba(255,255,255,0.85)';
const PITCH = '#0c6c3a';
const INGOAL = 'rgba(255,255,255,0.06)';

// --- RUGBY — relva lisa, linhas iguais ao diagrama de referência:
// linha de touch sólida no campo principal, touch-in-goal tracejada,
// linha de golo e 22m sólidas, linha de 10m tracejada, meio-campo sólido. ---
export default function FieldRugby() {
    const pitchW = 350; // 70m
    const H = 600; // 100m de jogo + 2x10m de ensaio
    const padX = 16;
    const W = pitchW + padX * 2;
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
                <RadialGradient id="rugbyVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.22" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill={PITCH} />

            {/* Zonas de ensaio (in-goal) */}
            <Rect x={left} y={0} width={pitchW} height={inGoalD} fill={INGOAL} />
            <Rect x={left} y={H - inGoalD} width={pitchW} height={inGoalD} fill={INGOAL} />

            {/* Linha de pelota morta (limite superior/inferior) */}
            <Line x1={left} y1={0} x2={right} y2={0} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={left} y1={H} x2={right} y2={H} stroke={LINEA} strokeWidth={2.2} />

            {/* Linha de touch: sólida no campo principal, tracejada no in-goal (touch-in-goal) */}
            <Line x1={left} y1={0} x2={left} y2={inGoalD} stroke={LINEA_TRACEJADA} strokeWidth={2} strokeDasharray="6,5" />
            <Line x1={right} y1={0} x2={right} y2={inGoalD} stroke={LINEA_TRACEJADA} strokeWidth={2} strokeDasharray="6,5" />
            <Line x1={left} y1={inGoalD} x2={left} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={right} y1={inGoalD} x2={right} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={left} y1={H - inGoalD} x2={left} y2={H} stroke={LINEA_TRACEJADA} strokeWidth={2} strokeDasharray="6,5" />
            <Line x1={right} y1={H - inGoalD} x2={right} y2={H} stroke={LINEA_TRACEJADA} strokeWidth={2} strokeDasharray="6,5" />

            {/* Linha de golo (try-line) */}
            <Line x1={left} y1={inGoalD} x2={right} y2={inGoalD} stroke={LINEA} strokeWidth={2.4} />
            <Line x1={left} y1={H - inGoalD} x2={right} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.4} />

            {/* Linhas de 22m */}
            <Line x1={left} y1={inGoalD + line22} x2={right} y2={inGoalD + line22} stroke={LINEA} strokeWidth={1.8} />
            <Line x1={left} y1={H - inGoalD - line22} x2={right} y2={H - inGoalD - line22} stroke={LINEA} strokeWidth={1.8} />

            {/* Linha de meio-campo */}
            <Line x1={left} y1={half} x2={right} y2={half} stroke={LINEA} strokeWidth={2.4} />

            {/* Linhas de 10m (tracejadas) */}
            <Line x1={left} y1={half - line10} x2={right} y2={half - line10} stroke={LINEA_TRACEJADA} strokeWidth={1.6} strokeDasharray="8,6" />
            <Line x1={left} y1={half + line10} x2={right} y2={half + line10} stroke={LINEA_TRACEJADA} strokeWidth={1.6} strokeDasharray="8,6" />

            {/* Postes em H (topo) */}
            <Line x1={cx - 14} y1={inGoalD - 28} x2={cx - 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx + 14} y1={inGoalD - 28} x2={cx + 14} y2={inGoalD} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx - 14} y1={inGoalD - 12} x2={cx + 14} y2={inGoalD - 12} stroke={LINEA} strokeWidth={2.6} />

            {/* Postes em H (base, espelhados) */}
            <Line x1={cx - 14} y1={H - inGoalD} x2={cx - 14} y2={H - inGoalD + 28} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx + 14} y1={H - inGoalD} x2={cx + 14} y2={H - inGoalD + 28} stroke={LINEA} strokeWidth={2.6} />
            <Line x1={cx - 14} y1={H - inGoalD + 12} x2={cx + 14} y2={H - inGoalD + 12} stroke={LINEA} strokeWidth={2.6} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#rugbyVig)" />
        </Svg>
    );
}