import React from 'react';
import Svg, { Rect, Line, Path, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const FLOOR_A = '#178a63';
const FLOOR_B = '#106a4c';

// --- ANDEBOL — pista IHF 40 x 20m (1 unidade = 0,1m), em retrato, com
// as duas balizas em cima/baixo, tal como os restantes campos do projeto. ---
export default function FieldHandball() {
    const W = 200, H = 400;
    const cx = W / 2;
    const goalW = 30; // baliza 3m
    const goalD = 8;
    const sixMeterR = 60; // linha de área (6m)
    const nineMeterR = 90; // linha de livre (9m), tracejada
    const fourMeterMarkY = 40; // marca do guarda-redes (4m)

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="hbFloor" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={FLOOR_A} />
                    <Stop offset="0.5" stopColor="#147a58" />
                    <Stop offset="1" stopColor={FLOOR_B} />
                </LinearGradient>
                <RadialGradient id="hbVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#hbFloor)" />
            <Rect x={1.5} y={1.5} width={W - 3} height={H - 3} fill="none" stroke={LINEA} strokeWidth={2} />

            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINEA} strokeWidth={1.6} />

            {/* Marcas de substituição, a 4,5m de cada lado do meio-campo */}
            <Line x1={0} y1={H / 2 - 45} x2={5} y2={H / 2 - 45} stroke={LINEA} strokeWidth={1.4} />
            <Line x1={0} y1={H / 2 + 45} x2={5} y2={H / 2 + 45} stroke={LINEA} strokeWidth={1.4} />
            <Line x1={W} y1={H / 2 - 45} x2={W - 5} y2={H / 2 - 45} stroke={LINEA} strokeWidth={1.4} />
            <Line x1={W} y1={H / 2 + 45} x2={W - 5} y2={H / 2 + 45} stroke={LINEA} strokeWidth={1.4} />

            {/* --- Baliza de cima --- */}
            <Path d={`M ${cx - sixMeterR} 0 A ${sixMeterR} ${sixMeterR} 0 0 0 ${cx + sixMeterR} 0`} fill="rgba(255,255,255,0.06)" stroke={LINEA} strokeWidth={1.6} />
            <Path d={`M ${cx - nineMeterR} 0 A ${nineMeterR} ${nineMeterR} 0 0 0 ${cx + nineMeterR} 0`} fill="none" stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="5,5" />
            <Line x1={cx - 10} y1={fourMeterMarkY} x2={cx + 10} y2={fourMeterMarkY} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="4,4" />
            <Rect x={cx - goalW / 2} y={-1} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - goalW / 2} y1={0} x2={cx + goalW / 2} y2={0} stroke={LINEA} strokeWidth={4} />

            {/* --- Baliza de baixo (espelhada) --- */}
            <Path d={`M ${cx - sixMeterR} ${H} A ${sixMeterR} ${sixMeterR} 0 0 1 ${cx + sixMeterR} ${H}`} fill="rgba(255,255,255,0.06)" stroke={LINEA} strokeWidth={1.6} />
            <Path d={`M ${cx - nineMeterR} ${H} A ${nineMeterR} ${nineMeterR} 0 0 1 ${cx + nineMeterR} ${H}`} fill="none" stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="5,5" />
            <Line x1={cx - 10} y1={H - fourMeterMarkY} x2={cx + 10} y2={H - fourMeterMarkY} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="4,4" />
            <Rect x={cx - goalW / 2} y={H + 1 - goalD} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - goalW / 2} y1={H} x2={cx + goalW / 2} y2={H} stroke={LINEA} strokeWidth={4} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#hbVig)" />
        </Svg>
    );
}