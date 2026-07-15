import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.95)';
const VERMELHO = '#c6322d';
const FRAME_RED = '#e2231a';
const SUPORTE_ESCURO = '#33415c';
const SUPORTE_CLARO = '#7c8798';

export default function FieldBasketball() {
    const W = 178, H = 280;
    const FRAME = 10;

    const x0 = FRAME, y0 = FRAME;
    const x1 = W - FRAME, y1 = H - FRAME;
    const courtW = x1 - x0;
    const courtH = y1 - y0;
    const cx = W / 2;

    const keyBaseW = 54;
    const keyTopW = 38;
    const keyD = 55;
    const ftCircleR = 22;
    const hoopInset = 14;
    const backboardInset = 11;
    const restrictedR = 13;
    const centerCircleR = 19;

    // Linha de 3 pontos: corrigida para ficar bem redonda (arco ~170°)
    const threePointSide = 65;      // distância horizontal dos troços retos ao centro
    const threePointCornerY = 18;   // altura curta do troço reto antes do arco começar
    const threePointR = 65;         // raio do arco (centrado no aro)

    const Hoop = ({ top }) => {
        const edgeY = top ? y0 : y1;
        const dir = top ? 1 : -1;

        return (
            <>
                <Rect x={cx - 10} y={edgeY - 5} width={20} height={10} fill={SUPORTE_ESCURO} rx={1.5} />
                <Rect x={cx - 13.5} y={edgeY - 3} width={5} height={6} fill={SUPORTE_CLARO} rx={1} />
                <Rect x={cx + 8.5} y={edgeY - 3} width={5} height={6} fill={SUPORTE_CLARO} rx={1} />
                <Line
                    x1={cx - 9} y1={edgeY + dir * backboardInset}
                    x2={cx + 9} y2={edgeY + dir * backboardInset}
                    stroke={LINEA} strokeWidth={2.6}
                />
                <Circle cx={cx} cy={edgeY + dir * hoopInset} r={2.4} fill="none" stroke="#ff7a1a" strokeWidth={1.6} />
            </>
        );
    };

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <Defs>
                <LinearGradient id="bballCourt" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#e2ac6e" />
                    <Stop offset="0.5" stopColor="#d59a55" />
                    <Stop offset="1" stopColor="#c98f4e" />
                </LinearGradient>
                <RadialGradient id="bballVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill={FRAME_RED} />

            <Rect x={x0} y={y0} width={courtW} height={courtH} fill="url(#bballCourt)" />

            {Array.from({ length: 12 }).map((_, i) => (
                <Line
                    key={i}
                    x1={x0 + (i + 1) * (courtW / 12)} y1={y0}
                    x2={x0 + (i + 1) * (courtW / 12)} y2={y1}
                    stroke="rgba(0,0,0,0.05)" strokeWidth={1}
                />
            ))}

            <Rect x={x0} y={y0} width={courtW} height={courtH} fill="none" stroke={LINEA} strokeWidth={2} />

            {/* ===== Lado de CIMA ===== */}
            <Path
                d={`M ${cx - keyBaseW / 2} ${y0} L ${cx - keyTopW / 2} ${y0 + keyD} L ${cx + keyTopW / 2} ${y0 + keyD} L ${cx + keyBaseW / 2} ${y0} Z`}
                fill={VERMELHO} stroke={LINEA} strokeWidth={1.6}
            />
            <Circle cx={cx} cy={y0 + keyD} r={ftCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Path
                d={`M ${cx - restrictedR} ${y0 + hoopInset} A ${restrictedR} ${restrictedR} 0 0 0 ${cx + restrictedR} ${y0 + hoopInset}`}
                stroke={LINEA} strokeWidth={1.4} fill="none"
            />
            <Path
                d={`M ${cx - threePointSide} ${y0} L ${cx - threePointSide} ${y0 + threePointCornerY} A ${threePointR} ${threePointR} 0 0 0 ${cx + threePointSide} ${y0 + threePointCornerY} L ${cx + threePointSide} ${y0}`}
                stroke={LINEA} strokeWidth={2} fill="none"
            />
            <Hoop top={true} />

            {/* ===== Lado de BAIXO ===== */}
            <Path
                d={`M ${cx - keyBaseW / 2} ${y1} L ${cx - keyTopW / 2} ${y1 - keyD} L ${cx + keyTopW / 2} ${y1 - keyD} L ${cx + keyBaseW / 2} ${y1} Z`}
                fill={VERMELHO} stroke={LINEA} strokeWidth={1.6}
            />
            <Circle cx={cx} cy={y1 - keyD} r={ftCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Path
                d={`M ${cx - restrictedR} ${y1 - hoopInset} A ${restrictedR} ${restrictedR} 0 0 1 ${cx + restrictedR} ${y1 - hoopInset}`}
                stroke={LINEA} strokeWidth={1.4} fill="none"
            />
            <Path
                d={`M ${cx - threePointSide} ${y1} L ${cx - threePointSide} ${y1 - threePointCornerY} A ${threePointR} ${threePointR} 0 0 1 ${cx + threePointSide} ${y1 - threePointCornerY} L ${cx + threePointSide} ${y1}`}
                stroke={LINEA} strokeWidth={2} fill="none"
            />
            <Hoop top={false} />

            <Line x1={x0} y1={H / 2} x2={x1} y2={H / 2} stroke={LINEA} strokeWidth={2} />
            <Circle cx={cx} cy={H / 2} r={centerCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={cx - centerCircleR} y1={H / 2} x2={cx + centerCircleR} y2={H / 2} stroke={LINEA} strokeWidth={2} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#bballVig)" />
        </Svg>
    );
}