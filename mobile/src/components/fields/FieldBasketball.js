import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.95)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const PINTURA = 'rgba(198,50,45,0.75)';
const PINTURA_STROKE = 'rgba(198,50,45,0.95)';

// --- BASQUETEBOL — pista FIBA 28 x 15m (1 unidade = 0,1m), em retrato,
// com os dois cestos em cima/baixo, tal como os restantes campos. ---
export default function FieldBasketball() {
    const courtW = 150; // 15m — largura real da pista FIBA
    const W = 162, H = 280;
    const padX = (W - courtW) / 2; // 6 — margem mínima
    const cx = W / 2;
    const keyW = 49; // largura do garrafão (4,9m)
    const keyD = 58; // profundidade linha de fundo -> lance livre (5,8m)
    const freeThrowR = 18; // raio círculo de lance livre (1,8m)
    const centerR = 18; // raio círculo central (1,8m)
    const restrictedR = 12.5; // área restritiva sob o cesto (1,25m)
    const hoopInset = 15.75; // distância do cesto à linha de fundo
    const backboardInset = 12; // distância do tabuleiro à linha de fundo
    const threePointR = 67.5; // raio linha de 3 pontos (6,75m)
    const threePointSideX = 9; // distância da linha reta à lateral (0,9m)

    const dx = cx - threePointSideX;
    const dy = Math.sqrt(Math.max(0, threePointR * threePointR - dx * dx));
    const threeStraightY = hoopInset + dy;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
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

            <Rect x={0} y={0} width={W} height={H} fill="url(#bballCourt)" />

            {/* Tabuado — linhas verticais subtis a imitar o chão de madeira */}
            {Array.from({ length: 14 }).map((_, i) => (
                <Line key={i} x1={(i + 1) * (W / 14)} y1={0} x2={(i + 1) * (W / 14)} y2={H} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />
            ))}

            {/* Linha lateral da pista (limite real do campo) */}
            <Rect x={padX} y={0} width={courtW} height={H} fill="none" stroke={LINEA} strokeWidth={2} />

            {/* Linha e círculo central */}
            <Line x1={padX} y1={H / 2} x2={padX + courtW} y2={H / 2} stroke={LINEA} strokeWidth={2} />
            <Circle cx={cx} cy={H / 2} r={centerR} fill={PINTURA} stroke={LINEA} strokeWidth={2} />
            <Circle cx={cx} cy={H / 2} r={1.4} fill={LINEA} />

            {/* --- Metade de cima --- */}
            <Rect x={cx - keyW / 2} y={0} width={keyW} height={keyD} fill={PINTURA} stroke={LINEA} strokeWidth={2} />
            <Path d={`M ${cx - freeThrowR} ${keyD} A ${freeThrowR} ${freeThrowR} 0 0 0 ${cx + freeThrowR} ${keyD}`} stroke={LINEA} strokeWidth={1.8} fill="none" />
            <Path d={`M ${cx - freeThrowR} ${keyD} A ${freeThrowR} ${freeThrowR} 0 0 1 ${cx + freeThrowR} ${keyD}`} stroke={LINEA_SUAVE} strokeWidth={1.4} strokeDasharray="3,3" fill="none" />
            <Path d={`M ${cx - restrictedR} ${hoopInset} A ${restrictedR} ${restrictedR} 0 0 0 ${cx + restrictedR} ${hoopInset}`} stroke={LINEA} strokeWidth={1.4} fill="none" />
            <Line x1={cx - threePointSideX} y1={0} x2={cx - threePointSideX} y2={threeStraightY} stroke={LINEA} strokeWidth={1.8} />
            <Line x1={cx + threePointSideX} y1={0} x2={cx + threePointSideX} y2={threeStraightY} stroke={LINEA} strokeWidth={1.8} />
            <Path d={`M ${cx - threePointSideX} ${threeStraightY} A ${threePointR} ${threePointR} 0 0 0 ${cx + threePointSideX} ${threeStraightY}`} stroke={LINEA} strokeWidth={1.8} fill="none" />
            <Line x1={cx - 9} y1={backboardInset} x2={cx + 9} y2={backboardInset} stroke={LINEA} strokeWidth={2.6} />
            <Circle cx={cx} cy={hoopInset} r={2.4} fill="none" stroke="#ff7a1a" strokeWidth={1.6} />

            {/* --- Metade de baixo (espelhada) --- */}
            <Rect x={cx - keyW / 2} y={H - keyD} width={keyW} height={keyD} fill={PINTURA} stroke={LINEA} strokeWidth={2} />
            <Path d={`M ${cx - freeThrowR} ${H - keyD} A ${freeThrowR} ${freeThrowR} 0 0 1 ${cx + freeThrowR} ${H - keyD}`} stroke={LINEA} strokeWidth={1.8} fill="none" />
            <Path d={`M ${cx - freeThrowR} ${H - keyD} A ${freeThrowR} ${freeThrowR} 0 0 0 ${cx + freeThrowR} ${H - keyD}`} stroke={LINEA_SUAVE} strokeWidth={1.4} strokeDasharray="3,3" fill="none" />
            <Path d={`M ${cx - restrictedR} ${H - hoopInset} A ${restrictedR} ${restrictedR} 0 0 1 ${cx + restrictedR} ${H - hoopInset}`} stroke={LINEA} strokeWidth={1.4} fill="none" />
            <Line x1={cx - threePointSideX} y1={H} x2={cx - threePointSideX} y2={H - threeStraightY} stroke={LINEA} strokeWidth={1.8} />
            <Line x1={cx + threePointSideX} y1={H} x2={cx + threePointSideX} y2={H - threeStraightY} stroke={LINEA} strokeWidth={1.8} />
            <Path d={`M ${cx - threePointSideX} ${H - threeStraightY} A ${threePointR} ${threePointR} 0 0 1 ${cx + threePointSideX} ${H - threeStraightY}`} stroke={LINEA} strokeWidth={1.8} fill="none" />
            <Line x1={cx - 9} y1={H - backboardInset} x2={cx + 9} y2={H - backboardInset} stroke={LINEA} strokeWidth={2.6} />
            <Circle cx={cx} cy={H - hoopInset} r={2.4} fill="none" stroke="#ff7a1a" strokeWidth={1.6} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#bballVig)" />
        </Svg>
    );
}