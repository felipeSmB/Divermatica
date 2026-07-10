import React from 'react';
import Svg, { Rect, Line, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LINE = 'rgba(255,255,255,0.95)';
const COURT_A = '#d18b42';
const COURT_B = '#b1692a';

export default function FieldBasketball() {
    const W = 560, H = 300;
    const margin = 18;
    const cx = W / 2;
    const cy = H / 2;
    const keyW = 170;
    const keyH = 120;
    const hoopYTop = margin + 34;
    const hoopYBot = H - margin - 34;
    const rimR = 6;
    const restrictedR = 42;
    const centerCircleR = 40;
    const threePointSide = 86;
    const threePointR = 226;
    const freeThrowR = 38;

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="courtGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="0.5" stopColor="#d5914d" />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="#a2612b" />
            <Rect x={margin} y={margin} width={W - margin * 2} height={H - margin * 2} fill="url(#courtGrad)" rx={8} />
            <Rect x={margin + 10} y={margin + 10} width={W - margin * 2 - 20} height={H - margin * 2 - 20} fill="rgba(255,255,255,0.04)" />

            <Rect x={cx - keyW / 2} y={margin} width={keyW} height={keyH} fill="rgba(255,255,255,0.08)" />
            <Rect x={cx - keyW / 2} y={H - margin - keyH} width={keyW} height={keyH} fill="rgba(255,255,255,0.08)" />

            <Line x1={cx} y1={margin} x2={cx} y2={H - margin} stroke={LINE} strokeWidth={3} />
            <Circle cx={cx} cy={cy} r={centerCircleR} fill="none" stroke={LINE} strokeWidth={3} />
            <Circle cx={cx} cy={cy} r={4} fill={LINE} />

            <Rect x={cx - keyW / 2} y={margin} width={keyW} height={keyH} fill="none" stroke={LINE} strokeWidth={3} />
            <Rect x={cx - keyW / 2} y={H - margin - keyH} width={keyW} height={keyH} fill="none" stroke={LINE} strokeWidth={3} />

            <Line x1={cx - keyW / 2} y1={margin + 72} x2={cx + keyW / 2} y2={margin + 72} stroke={LINE} strokeWidth={2.5} />
            <Line x1={cx - keyW / 2} y1={H - margin - 72} x2={cx + keyW / 2} y2={H - margin - 72} stroke={LINE} strokeWidth={2.5} />

            <Path d={`M ${cx - freeThrowR} ${margin + 72} A ${freeThrowR} ${freeThrowR} 0 0 1 ${cx + freeThrowR} ${margin + 72}`} stroke={LINE} strokeWidth={2.5} fill="none" />
            <Path d={`M ${cx - freeThrowR} ${H - margin - 72} A ${freeThrowR} ${freeThrowR} 0 0 0 ${cx + freeThrowR} ${H - margin - 72}`} stroke={LINE} strokeWidth={2.5} fill="none" />

            <Line x1={cx - threePointSide} y1={margin} x2={cx - threePointSide} y2={margin + 72} stroke={LINE} strokeWidth={3} />
            <Line x1={cx + threePointSide} y1={margin} x2={cx + threePointSide} y2={margin + 72} stroke={LINE} strokeWidth={3} />
            <Path d={`M ${cx - threePointSide} ${margin + 72} A ${threePointR} ${threePointR} 0 0 1 ${cx + threePointSide} ${margin + 72}`} stroke={LINE} strokeWidth={3} fill="none" />

            <Line x1={cx - threePointSide} y1={H - margin} x2={cx - threePointSide} y2={H - margin - 72} stroke={LINE} strokeWidth={3} />
            <Line x1={cx + threePointSide} y1={H - margin} x2={cx + threePointSide} y2={H - margin - 72} stroke={LINE} strokeWidth={3} />
            <Path d={`M ${cx - threePointSide} ${H - margin - 72} A ${threePointR} ${threePointR} 0 0 0 ${cx + threePointSide} ${H - margin - 72}`} stroke={LINE} strokeWidth={3} fill="none" />

            <Path d={`M ${cx - restrictedR} ${hoopYTop} A ${restrictedR} ${restrictedR} 0 0 1 ${cx + restrictedR} ${hoopYTop}`} stroke={LINE} strokeWidth={2.5} fill="none" />
            <Path d={`M ${cx - restrictedR} ${hoopYBot} A ${restrictedR} ${restrictedR} 0 0 0 ${cx + restrictedR} ${hoopYBot}`} stroke={LINE} strokeWidth={2.5} fill="none" />

            <Line x1={cx - 52} y1={margin + 22} x2={cx + 52} y2={margin + 22} stroke={LINE} strokeWidth={4} />
            <Line x1={cx - 52} y1={H - margin - 22} x2={cx + 52} y2={H - margin - 22} stroke={LINE} strokeWidth={4} />
            <Line x1={cx - 52} y1={margin + 22} x2={cx - 52} y2={margin + 12} stroke={LINE} strokeWidth={4} />
            <Line x1={cx + 52} y1={margin + 22} x2={cx + 52} y2={margin + 12} stroke={LINE} strokeWidth={4} />
            <Line x1={cx - 52} y1={H - margin - 22} x2={cx - 52} y2={H - margin - 12} stroke={LINE} strokeWidth={4} />
            <Line x1={cx + 52} y1={H - margin - 22} x2={cx + 52} y2={H - margin - 12} stroke={LINE} strokeWidth={4} />

            <Line x1={cx - keyW / 2} y1={margin} x2={cx - keyW / 2} y2={margin + 20} stroke={LINE} strokeWidth={3} />
            <Line x1={cx + keyW / 2} y1={margin} x2={cx + keyW / 2} y2={margin + 20} stroke={LINE} strokeWidth={3} />
            <Line x1={cx - keyW / 2} y1={H - margin} x2={cx - keyW / 2} y2={H - margin - 20} stroke={LINE} strokeWidth={3} />
            <Line x1={cx + keyW / 2} y1={H - margin} x2={cx + keyW / 2} y2={H - margin - 20} stroke={LINE} strokeWidth={3} />

            <Line x1={cx - 12} y1={margin + 12} x2={cx + 12} y2={margin + 12} stroke={LINE} strokeWidth={3} />
            <Line x1={cx - 12} y1={H - margin - 12} x2={cx + 12} y2={H - margin - 12} stroke={LINE} strokeWidth={3} />
            <Circle cx={cx} cy={hoopYTop} r={rimR} fill={LINE} />
            <Circle cx={cx} cy={hoopYBot} r={rimR} fill={LINE} />

            <Line x1={cx - 24} y1={margin + 66} x2={cx - 24} y2={margin + 72} stroke={LINE} strokeWidth={2} />
            <Line x1={cx + 24} y1={margin + 66} x2={cx + 24} y2={margin + 72} stroke={LINE} strokeWidth={2} />
            <Line x1={cx - 24} y1={H - margin - 66} x2={cx - 24} y2={H - margin - 72} stroke={LINE} strokeWidth={2} />
            <Line x1={cx + 24} y1={H - margin - 66} x2={cx + 24} y2={H - margin - 72} stroke={LINE} strokeWidth={2} />
        </Svg>
    );
}
