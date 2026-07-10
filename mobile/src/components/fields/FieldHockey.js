import React from 'react';
import Svg, { Rect, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const PITCH_A = '#1560bd';
const PITCH_B = '#1356a8';

export default function FieldHockey() {
    // Hockey field approx aspect 1.33
    const W = 660, H = 400;
    const cx = W / 2;
    const circleR = 106;
    const goalAreaW = 140, goalAreaH = 60;
    const line23 = 167;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="hockey" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={PITCH_A} />
                    <Stop offset="1" stopColor={PITCH_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#hockey)" />
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={3} rx={6} />

            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={2.5} />
            <Line x1={0} y1={line23} x2={W} y2={line23} stroke={LINE} strokeWidth={2.5} strokeDasharray="8,6" />
            <Line x1={0} y1={H - line23} x2={W} y2={H - line23} stroke={LINE} strokeWidth={2.5} strokeDasharray="8,6" />
            <Path d={`M ${cx - circleR} ${goalAreaH + 20} A ${circleR} ${circleR} 0 0 1 ${cx + circleR} ${goalAreaH + 20}`} fill="none" stroke={LINE} strokeWidth={2.5} />
            <Path d={`M ${cx - circleR} ${H - goalAreaH - 20} A ${circleR} ${circleR} 0 0 0 ${cx + circleR} ${H - goalAreaH - 20}`} fill="none" stroke={LINE} strokeWidth={2.5} />

            {/* Goal areas */}
            <Rect x={cx - goalAreaW / 2} y={0} width={goalAreaW} height={goalAreaH} fill="none" stroke={LINE} strokeWidth={3} />
            <Rect x={cx - goalAreaW / 2} y={H - goalAreaH} width={goalAreaW} height={goalAreaH} fill="none" stroke={LINE} strokeWidth={3} />

        </Svg>
    );
}
