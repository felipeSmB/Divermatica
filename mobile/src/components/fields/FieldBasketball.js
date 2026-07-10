import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const COURT_A = '#d17f3e';
const COURT_B = '#c36f31';

export default function FieldBasketball() {
    // Dimensions in arbitrary units keeping aspect ratio ~0.54 (NBA court 28x15m)
    const W = 560, H = 300; // scale for clarity
    const cx = W / 2;
    const keyW = 160; // width of the painted area
    const keyH = 120; // distance from baseline to free throw line
    const threeR = 220; // approx radius for 3pt line
    const rimYTop = 28;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="courtGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#courtGrad)" />

            {/* Outer boundary */}
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={4} rx={6} />

            {/* Half court */}
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={3} />
            <Circle cx={cx} cy={H / 2} r={28} fill="none" stroke={LINE} strokeWidth={3} />

            {/* Paint areas (both ends) */}
            <Rect x={cx - keyW / 2} y={0} width={keyW} height={keyH} fill="none" stroke={LINE} strokeWidth={3} />
            <Rect x={cx - keyW / 2} y={H - keyH} width={keyW} height={keyH} fill="none" stroke={LINE} strokeWidth={3} />

            {/* Free throw circles */}
            <Circle cx={cx} cy={keyH} r={28} fill="none" stroke={LINE} strokeWidth={2} />
            <Circle cx={cx} cy={H - keyH} r={28} fill="none" stroke={LINE} strokeWidth={2} />

            {/* 3-point arcs (approximated) */}
            <Path d={`M ${cx - threeR} ${rimYTop} A ${threeR} ${threeR} 0 0 1 ${cx + threeR} ${rimYTop}`} stroke={LINE} strokeWidth={3} fill="none" />
            <Path d={`M ${cx - threeR} ${H - rimYTop} A ${threeR} ${threeR} 0 0 0 ${cx + threeR} ${H - rimYTop}`} stroke={LINE} strokeWidth={3} fill="none" />

            {/* Rims and backboards */}
            <Line x1={cx - 36} y1={12} x2={cx + 36} y2={12} stroke={LINE} strokeWidth={6} />
            <Line x1={cx - 36} y1={H - 12} x2={cx + 36} y2={H - 12} stroke={LINE} strokeWidth={6} />
            <Circle cx={cx} cy={rimYTop + 10} r={6} fill={LINE} />
            <Circle cx={cx} cy={H - rimYTop - 10} r={6} fill={LINE} />

        </Svg>
    );
}
