import React from 'react';
import Svg, { Rect, Line, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const LINEA = 'rgba(255,255,255,0.92)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';
const COURT_A = '#2178b8';
const COURT_B = '#175f92';

// --- VOLEIBOL — pista FIVB 18 x 9m (1 unidade = 0,1m), em retrato, com
// a rede a meio-campo e as duas metades (a mesma convenção usada nos
// restantes desportos "de rede" do projeto). ---
export default function FieldVolleyball() {
    const W = 90, H = 180;
    const cx = W / 2;
    const netY = H / 2;
    const attackDist = 30; // linha dos 3m

    return (
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
            <Defs>
                <LinearGradient id="volleyCourt" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={COURT_A} />
                    <Stop offset="0.5" stopColor="#1f6fa8" />
                    <Stop offset="1" stopColor={COURT_B} />
                </LinearGradient>
                <RadialGradient id="volleyVig" cx="50%" cy="50%" r="72%">
                    <Stop offset="55%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="0.25" />
                </RadialGradient>
            </Defs>

            <Rect x={0} y={0} width={W} height={H} fill="url(#volleyCourt)" />
            <Rect x={1.2} y={1.2} width={W - 2.4} height={H - 2.4} fill="none" stroke={LINEA} strokeWidth={1.6} />

            {/* Linha central (debaixo da rede) */}
            <Line x1={0} y1={netY} x2={W} y2={netY} stroke={LINEA} strokeWidth={1.6} />

            {/* Linhas de ataque, a 3m da rede de cada lado */}
            <Line x1={0} y1={netY - attackDist} x2={W} y2={netY - attackDist} stroke={LINEA_SUAVE} strokeWidth={1.3} />
            <Line x1={0} y1={netY + attackDist} x2={W} y2={netY + attackDist} stroke={LINEA_SUAVE} strokeWidth={1.3} />

            {/* Marcas da zona de serviço, atrás da linha de fundo */}
            <Line x1={W} y1={4} x2={W + 4} y2={4} stroke={LINEA_SUAVE} strokeWidth={1.2} />
            <Line x1={W} y1={H - 4} x2={W + 4} y2={H - 4} stroke={LINEA_SUAVE} strokeWidth={1.2} />

            {/* Rede */}
            <Line x1={-3} y1={netY} x2={W + 3} y2={netY} stroke="#12202c" strokeWidth={5} />
            <Line x1={-3} y1={netY} x2={W + 3} y2={netY} stroke="#ffffff" strokeWidth={1} opacity={0.85} />
            {/* Antenas */}
            <Line x1={0} y1={netY - 6} x2={0} y2={netY + 6} stroke="#ff5a3c" strokeWidth={2} />
            <Line x1={W} y1={netY - 6} x2={W} y2={netY + 6} stroke="#ff5a3c" strokeWidth={2} />

            <Rect x={0} y={0} width={W} height={H} fill="url(#volleyVig)" />
        </Svg>
    );
}