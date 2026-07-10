import React from 'react';
import Svg, { Rect, Line, Text, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const PITCH_A = '#0c5c33';
const PITCH_B = '#0a4f2b';

export default function FieldRugby() {
    // Rugby pitch ~ length 100m (in-play) x 70m -> aspect ~0.7
    const W = 700, H = 490;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="pitch" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={PITCH_A} />
                    <Stop offset="1" stopColor={PITCH_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#pitch)" />
            <Rect x={8} y={8} width={W - 16} height={H - 16} fill="none" stroke={LINE} strokeWidth={4} rx={8} />

            {/* Halfway line */}
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={3} />

            {/* 22m lines (approx at 22% from each end) */}
            <Line x1={0} y1={H * 0.22} x2={W} y2={H * 0.22} stroke={LINE} strokeWidth={2} strokeDasharray="6,6" />
            <Line x1={0} y1={H * 0.78} x2={W} y2={H * 0.78} stroke={LINE} strokeWidth={2} strokeDasharray="6,6" />

            {/* Goal posts (stylized) */}
            <Line x1={W / 2 - 20} y1={12} x2={W / 2 - 20} y2={60} stroke={LINE} strokeWidth={4} />
            <Line x1={W / 2 + 20} y1={12} x2={W / 2 + 20} y2={60} stroke={LINE} strokeWidth={4} />
            <Line x1={W / 2 - 60} y1={60} x2={W / 2 + 60} y2={60} stroke={LINE} strokeWidth={4} />

            <Line x1={W / 2 - 20} y1={H - 12} x2={W / 2 - 20} y2={H - 60} stroke={LINE} strokeWidth={4} />
            <Line x1={W / 2 + 20} y1={H - 12} x2={W / 2 + 20} y2={H - 60} stroke={LINE} strokeWidth={4} />
            <Line x1={W / 2 - 60} y1={H - 60} x2={W / 2 + 60} y2={H - 60} stroke={LINE} strokeWidth={4} />

        </Svg>
    );
}
