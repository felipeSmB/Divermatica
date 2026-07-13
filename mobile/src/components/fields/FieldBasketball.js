import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.95)';
const VERMELHO = '#c6322d';

// --- BASQUETEBOL — estilo "ícone plano" conforme a imagem de referência:
// zona pintada fundida com o círculo de lance-livre, círculo central
// vermelho dividido pela linha do meio-campo, tabela e aro simplificados. ---
export default function FieldBasketball() {
    const courtW = 150;
    const W = 178, H = 280;
    const padX = (W - courtW) / 2; // 14
    const cx = W / 2;

    const keyBaseW = 54;
    const keyTopW = 38;
    const keyD = 55;
    const ftCircleR = 22;
    const hoopInset = 14;
    const backboardInset = 11;
    const restrictedR = 13;
    const centerCircleR = 19;

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

            {/* Tabuado — linhas verticais subtis */}
            {Array.from({ length: 12 }).map((_, i) => (
                <Line key={i} x1={padX + (i + 1) * (courtW / 12)} y1={0} x2={padX + (i + 1) * (courtW / 12)} y2={H} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />
            ))}

            {/* Limite real do campo */}
            <Rect x={padX} y={0} width={courtW} height={H} fill="none" stroke={LINEA} strokeWidth={2} />

            {/* --- Metade de cima: zona + círculo de lance-livre fundidos --- */}
            <Path
                d={`M ${cx - keyBaseW / 2} 0 L ${cx - keyTopW / 2} ${keyD} L ${cx + keyTopW / 2} ${keyD} L ${cx + keyBaseW / 2} 0 Z`}
                fill={VERMELHO} stroke={LINEA} strokeWidth={1.6}
            />
            <Circle cx={cx} cy={keyD} r={ftCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Path d={`M ${cx - restrictedR} ${hoopInset} A ${restrictedR} ${restrictedR} 0 0 0 ${cx + restrictedR} ${hoopInset}`} stroke={LINEA} strokeWidth={1.4} fill="none" />
            <Line x1={cx - 9} y1={backboardInset} x2={cx + 9} y2={backboardInset} stroke={LINEA} strokeWidth={2.6} />
            <Circle cx={cx} cy={hoopInset} r={2.4} fill="none" stroke="#ff7a1a" strokeWidth={1.6} />

            {/* --- Metade de baixo (espelhada) --- */}
            <Path
                d={`M ${cx - keyBaseW / 2} ${H} L ${cx - keyTopW / 2} ${H - keyD} L ${cx + keyTopW / 2} ${H - keyD} L ${cx + keyBaseW / 2} ${H} Z`}
                fill={VERMELHO} stroke={LINEA} strokeWidth={1.6}
            />
            <Circle cx={cx} cy={H - keyD} r={ftCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Path d={`M ${cx - restrictedR} ${H - hoopInset} A ${restrictedR} ${restrictedR} 0 0 1 ${cx + restrictedR} ${H - hoopInset}`} stroke={LINEA} strokeWidth={1.4} fill="none" />
            <Line x1={cx - 9} y1={H - backboardInset} x2={cx + 9} y2={H - backboardInset} stroke={LINEA} strokeWidth={2.6} />
            <Circle cx={cx} cy={H - hoopInset} r={2.4} fill="none" stroke="#ff7a1a" strokeWidth={1.6} />

            {/* --- Meio-campo --- */}
            <Line x1={padX} y1={H / 2} x2={padX + courtW} y2={H / 2} stroke={LINEA} strokeWidth={2} />
            <Circle cx={cx} cy={H / 2} r={centerCircleR} fill={VERMELHO} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={cx - centerCircleR} y1={H / 2} x2={cx + centerCircleR} y2={H / 2} stroke={LINEA} strokeWidth={2} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#bballVig)" />
        </Svg>
    );
}