import React from 'react';
import Svg, { Rect, Circle, Line, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const OUT = '#2e7d32';
const DIAM = '#a97c4b';
const LINE = 'rgba(255,255,255,0.95)';

export default function FieldBaseball() {
    // Stylized diamond infield + outfield suggestion
    const W = 480, H = 420;
    const cx = W / 2;
    const cy = H / 2;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Rect x={0} y={0} width={W} height={H} fill={OUT} />
            <Defs>
                <LinearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#2e7d32" />
                    <Stop offset="1" stopColor="#236126" />
                </LinearGradient>
            </Defs>

            {/* Infield diamond */}
            <Path d={`M ${cx} ${60} L ${W - 60} ${cy} L ${cx} ${H - 60} L 60 ${cy} Z`} fill={DIAM} stroke={LINE} strokeWidth={3} />
            <Circle cx={cx} cy={cy} r={10} fill={LINE} />

            {/* Bases (stylized) */}
            <Rect x={cx - 12} y={52} width={24} height={12} fill="#fff" transform={`rotate(45 ${cx} 58)`} />
            <Rect x={W - 72} y={cy - 12} width={24} height={12} fill="#fff" transform={`rotate(45 ${W - 60} ${cy})`} />
            <Rect x={cx - 12} y={H - 64} width={24} height={12} fill="#fff" transform={`rotate(45 ${cx} ${H - 58})`} />

        </Svg>
    );
}
