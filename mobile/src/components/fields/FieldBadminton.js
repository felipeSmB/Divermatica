import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const COURT_A = '#2f9e52';
const COURT_B = '#278a46';

export default function FieldBadminton() {
    // Badminton court 13.4 x 6.1m -> aspect ~2.2 width:height
    const W = 440, H = 200;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="bd" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#bd)" />
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={3} rx={4} />

            {/* Net */}
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#121212" strokeWidth={6} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={1} opacity={0.9} />

            {/* Service lines */}
            <Line x1={W * 0.1} y1={H * 0.05} x2={W * 0.9} y2={H * 0.05} stroke={LINE} strokeWidth={2} />
            <Line x1={W * 0.1} y1={H * 0.95} x2={W * 0.9} y2={H * 0.95} stroke={LINE} strokeWidth={2} />

        </Svg>
    );
}
