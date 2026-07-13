import React from 'react';
import Svg, { Rect, Line, Path, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';

export default function FieldHandball() {
    const courtW = 200; // 20m
    const W = 254, H = 400;
    const padX = (W - courtW) / 2; // 27 — mesma escala do Futsal
    const cx = W / 2;
    const goalW = 30;
    const goalD = 7;
    const sixMeterR = 60;
    const nineMeterR = 90;
    const fourMeterMarkY = 40;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="hbFloor" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#1a9169" />
                    <Stop offset="0.5" stopColor="#147a58" />
                    <Stop offset="1" stopColor="#106a4c" />
                </LinearGradient>
                <RadialGradient id="hbVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#hbFloor)" />

            <Rect x={padX} y={0} width={courtW} height={H} fill="none" stroke={LINEA} strokeWidth={3} />

            <Line x1={padX} y1={H / 2} x2={padX + courtW} y2={H / 2} stroke={LINEA} strokeWidth={2} />

            <Line x1={padX} y1={H / 2 - 45} x2={padX + 6} y2={H / 2 - 45} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={padX} y1={H / 2 + 45} x2={padX + 6} y2={H / 2 + 45} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={padX + courtW} y1={H / 2 - 45} x2={padX + courtW - 6} y2={H / 2 - 45} stroke={LINEA} strokeWidth={1.6} />
            <Line x1={padX + courtW} y1={H / 2 + 45} x2={padX + courtW - 6} y2={H / 2 + 45} stroke={LINEA} strokeWidth={1.6} />

            {/* Baliza de cima */}
            <Path d={`M ${cx - sixMeterR} 0 A ${sixMeterR} ${sixMeterR} 0 0 0 ${cx + sixMeterR} 0`} fill="rgba(255,255,255,0.08)" stroke={LINEA} strokeWidth={2} />
            <Path d={`M ${cx - nineMeterR} 0 A ${nineMeterR} ${nineMeterR} 0 0 0 ${cx + nineMeterR} 0`} fill="none" stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="5,5" />
            <Line x1={cx - 10} y1={fourMeterMarkY} x2={cx + 10} y2={fourMeterMarkY} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="4,4" />
            <Rect x={cx - goalW / 2} y={-1} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - goalW / 2} y1={0} x2={cx + goalW / 2} y2={0} stroke={LINEA} strokeWidth={4} />

            {/* Baliza de baixo (espelhada) */}
            <Path d={`M ${cx - sixMeterR} ${H} A ${sixMeterR} ${sixMeterR} 0 0 1 ${cx + sixMeterR} ${H}`} fill="rgba(255,255,255,0.08)" stroke={LINEA} strokeWidth={2} />
            <Path d={`M ${cx - nineMeterR} ${H} A ${nineMeterR} ${nineMeterR} 0 0 1 ${cx + nineMeterR} ${H}`} fill="none" stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="5,5" />
            <Line x1={cx - 10} y1={H - fourMeterMarkY} x2={cx + 10} y2={H - fourMeterMarkY} stroke={LINEA_SUAVE} strokeWidth={1.3} strokeDasharray="4,4" />
            <Rect x={cx - goalW / 2} y={H - goalD + 1} width={goalW} height={goalD} fill="none" stroke={LINEA} strokeWidth={2.4} />
            <Line x1={cx - goalW / 2} y1={H} x2={cx + goalW / 2} y2={H} stroke={LINEA} strokeWidth={4} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#hbVig)" />
        </Svg>
    );
}