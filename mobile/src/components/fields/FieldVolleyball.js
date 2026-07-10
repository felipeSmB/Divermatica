import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const COURT_A = '#1d6fae';
const COURT_B = '#1b67a2';

export default function FieldVolleyball() {
    // Volleyball court 18x9m -> aspect 2:1; scaled for clarity
    const W = 360, H = 180;
    const centerY = H / 2;
    const attackDistance = 60;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="vCourt" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#vCourt)" />
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={3} rx={6} />

            {/* Net */}
            <Line x1={0} y1={centerY} x2={W} y2={centerY} stroke="#121212" strokeWidth={6} />
            <Line x1={0} y1={centerY} x2={W} y2={centerY} stroke="#ffffff" strokeWidth={1} opacity={0.85} />

            {/* Center line */}
            <Line x1={W / 2} y1={6} x2={W / 2} y2={H - 6} stroke={LINE} strokeWidth={3} />

            {/* Attack lines (3m from net on each side) */}
            <Line x1={6} y1={centerY - attackDistance} x2={W - 6} y2={centerY - attackDistance} stroke={LINE} strokeWidth={2.5} />
            <Line x1={6} y1={centerY + attackDistance} x2={W - 6} y2={centerY + attackDistance} stroke={LINE} strokeWidth={2.5} />
            <Line x1={0} y1={centerY} x2={W} y2={centerY} stroke="#121212" strokeWidth={6} />
            <Line x1={0} y1={centerY} x2={W} y2={centerY} stroke="#ffffff" strokeWidth={1} opacity={0.85} />

        </Svg>
    );
}
