import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const FLOOR_A = '#146b52';
const FLOOR_B = '#0f5d47';

export default function FieldHandball() {
    // Handball court 40x20m => aspect 2:1 scaled
    const W = 400, H = 200;
    const cx = W / 2;
    const goalW = 96;
    const goalDepth = 60;
    const arcR = 120; // 6m line scaled
    const freeThrowR = 180; // 9m line scaled

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="hFloor" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={FLOOR_A} />
                    <Stop offset="1" stopColor={FLOOR_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#hFloor)" />
            <Rect x={6} y={6} width={W - 12} height={H - 12} fill="none" stroke={LINE} strokeWidth={3} rx={6} />

            <Line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={LINE} strokeWidth={2} />

            {/* Goals and 6m arcs */}
            <Rect x={cx - goalW / 2} y={0} width={goalW} height={goalDepth} fill="none" stroke={LINE} strokeWidth={4} />
            <Path d={`M ${cx - arcR} ${goalDepth} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${goalDepth}`} stroke={LINE} strokeWidth={3} fill="none" />

            <Rect x={cx - goalW / 2} y={H - goalDepth} width={goalW} height={goalDepth} fill="none" stroke={LINE} strokeWidth={4} />
            <Path d={`M ${cx - arcR} ${H - goalDepth} A ${arcR} ${arcR} 0 0 0 ${cx + arcR} ${H - goalDepth}`} stroke={LINE} strokeWidth={3} fill="none" />

            {/* 9m dashed line */}
            <Path d={`M ${cx - freeThrowR} ${goalDepth + 12} A ${freeThrowR} ${freeThrowR} 0 0 1 ${cx + freeThrowR} ${goalDepth + 12}`} stroke={LINE} strokeWidth={1.8} strokeDasharray="6,6" fill="none" />
            <Path d={`M ${cx - freeThrowR} ${H - goalDepth - 12} A ${freeThrowR} ${freeThrowR} 0 0 0 ${cx + freeThrowR} ${H - goalDepth - 12}`} stroke={LINE} strokeWidth={1.8} strokeDasharray="6,6" fill="none" />

        </Svg>
    );
}
