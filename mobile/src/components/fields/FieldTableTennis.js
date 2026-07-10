import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const TOP = '#0a4f8c';
const BOT = '#073e6f';

export default function FieldTableTennis() {
    // Table tennis table representation
    const W = 300, H = 160;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="tt" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={TOP} />
                    <Stop offset="1" stopColor={BOT} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="#001427" />
            <Rect x={20} y={20} width={W - 40} height={H - 40} fill="url(#tt)" stroke={LINE} strokeWidth={3} />

            {/* Net */}
            <Line x1={W / 2} y1={20} x2={W / 2} y2={H - 20} stroke="#121212" strokeWidth={6} />
            <Line x1={W / 2} y1={20} x2={W / 2} y2={H - 20} stroke={LINE} strokeWidth={1} opacity={0.9} />

            {/* Center line */}
            <Line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke={LINE} strokeWidth={2} />

        </Svg>
    );
}
