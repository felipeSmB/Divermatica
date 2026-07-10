import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const COURT_A = '#0e9488';
const COURT_B = '#0b7b71';

export default function FieldPadel() {
    // Padel court 20x10m -> aspect 2:1, internal walls omitted for clarity
    const W = 400, H = 200;
    const cx = W / 2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="pad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#pad)" />
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={3} rx={4} />

            {/* Net */}
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#121212" strokeWidth={6} />
            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={1} opacity={0.9} />

            {/* Service boxes */}
            <Line x1={6} y1={H / 4} x2={W - 6} y2={H / 4} stroke={LINE} strokeWidth={2} />
            <Line x1={6} y1={(H / 4) * 3} x2={W - 6} y2={(H / 4) * 3} stroke={LINE} strokeWidth={2} />
            <Line x1={W / 2} y1={6} x2={W / 2} y2={H / 2 - 6} stroke={LINE} strokeWidth={2} />
            <Line x1={W / 2} y1={H / 2 + 6} x2={W / 2} y2={H - 6} stroke={LINE} strokeWidth={2} />

        </Svg>
    );
}
