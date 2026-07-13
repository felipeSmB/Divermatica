import React from 'react';
import Svg, { Rect, Line, Text, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.6)';
const INGOAL = 'rgba(255,255,255,0.06)';
const GRASS_A = '#0d7a3e';
const GRASS_B = '#0a6534';

function FaixasRelva({ x, width, H, largura = 60 }) {
    const n = Math.ceil(H / largura);
    return (
        <>
            {Array.from({ length: n }).map((_, i) => {
                const y = i * largura;
                const h = Math.min(largura, H - y);
                return <Rect key={i} x={x} y={y} width={width} height={h} fill={i % 2 === 0 ? GRASS_A : GRASS_B} />;
            })}
        </>
    );
}

// --- RUGBY (União) — campo 100m + 2 zonas de ensaio de 10m (120m) x 70m
// (1 unidade = 0,2m), em retrato, com as duas balizas em cima/baixo. ---
export default function FieldRugby() {
    const pitchW = 350; // 70m
    const H = 600; // 120m (100m de jogo + 2x10m de ensaio)
    const padX = 6; // margem mínima
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
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill={GRASS_B} />
            <FaixasRelva x={left} width={pitchW} H={H} largura={60} />

            {/* Zonas de ensaio (in-goal) */}
            <Rect x={left} y={0} width={pitchW} height={inGoalD} fill={INGOAL} />
            <Rect x={left} y={H - inGoalD} width={pitchW} height={inGoalD} fill={INGOAL} />

            {/* Linhas laterais */}
            <Line x1={left} y1={0} x2={left} y2={H} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={right} y1={0} x2={right} y2={H} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de ensaio */}
            <Line x1={left} y1={inGoalD} x2={right} y2={inGoalD} stroke={LINEA} strokeWidth={2.2} />
            <Line x1={left} y1={H - inGoalD} x2={right} y2={H - inGoalD} stroke={LINEA} strokeWidth={2.2} />

            {/* Linhas de 22m + rótulo */}
            <Line x1={left} y1={inGoalD + line22} x2={right} y2={inGoalD + line22} stroke={LINEA} strokeWidth={1.6} />
            <Text x={left + 14} y={inGoalD + line22 - 6} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">22</Text>
            <Text x={right - 14} y={inGoalD + line22 - 6} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">22</Text>

            <Line x1={left} y1={H - inGoalD - line22} x2={right} y2={H - inGoalD - line22} stroke={LINEA} strokeWidth={1.6} />
            <Text x={left + 14} y={H - inGoalD - line22 + 14} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">22</Text>
            <Text x={right - 14} y={H - inGoalD - line22 + 14} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">22</Text>

            {/* Linha de meio-campo + rótulo */}
            <Line x1={left} y1={half} x2={right} y2={half} stroke={LINEA} strokeWidth={2.4} />
            <Text x={left + 14} y={half - 6} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">50</Text>
            <Text x={right - 14} y={half - 6} fill={LINEA_SUAVE} fontSize={11} textAnchor="middle">50</Text>

            {/* Linhas de 10m + rótulo */}
            <Line x1={left} y1={half - line10} x2={right} y2={half - line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />
            <Text x={left + 14} y={half - line10 - 6} fill={LINEA_SUAVE} fontSize={10} textAnchor="middle">10</Text>
            <Text x={right - 14} y={half - line10 - 6} fill={LINEA_SUAVE} fontSize={10} textAnchor="middle">10</Text>

            <Line x1={left} y1={half + line10} x2={right} y2={half + line10} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="7,6" />
            <Text x={left + 14} y={half + line10 + 14} fill={LINEA_SUAVE} fontSize={10} textAnchor="middle">10</Text>
            <Text x={right - 14} y={half + line10 + 14} fill={LINEA_SUAVE} fontSize={10} textAnchor="middle">10</Text>

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