import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerJerseyCard, { JERSEY_SIZES } from './PlayerJerseyCard';
import { detetarDeporte, calcularFormacao } from '../utils/posicionamento';

const LINEA = 'rgba(255,255,255,0.85)';
const LINEA_SUAVE = 'rgba(255,255,255,0.55)';

/* =====================================================
   PEÇAS REUTILIZÁVEIS DO CAMPO
   ===================================================== */

function LineaCentral() {
    return <View style={styles.lineaMedio} pointerEvents="none" />;
}

function CirculoCentro({ diametro = 78 }) {
    const r = diametro / 2;
    return (
        <View
            style={[styles.circulo, { width: diametro, height: diametro, borderRadius: r, top: '50%', left: '50%', marginTop: -r, marginLeft: -r }]}
            pointerEvents="none"
        />
    );
}

function PuntoCentro() {
    return <View style={styles.puntoCentro} pointerEvents="none" />;
}

function Punto({ extremo, distanciaPorc }) {
    const lado = extremo === 'arriba' ? { top: `${distanciaPorc}%` } : { bottom: `${distanciaPorc}%` };
    return <View style={[styles.punto, lado]} pointerEvents="none" />;
}

// Retângulo de área, aberto para a linha de fundo (futebol, râguebi...)
function CajaArea({ extremo, anchoPorc = 18, altoPorc = 13 }) {
    const lado = extremo === 'arriba' ? { top: 0, borderTopWidth: 0 } : { bottom: 0, borderBottomWidth: 0 };
    return (
        <View style={[styles.caja, { left: `${anchoPorc}%`, right: `${anchoPorc}%`, height: `${altoPorc}%` }, lado]} pointerEvents="none" />
    );
}

// Arco obtido recortando um círculo grande contra o limite do campo
// (o "overflow: hidden" do contentor funciona como tesoura). Serve para
// desenhar desde a grande área do futebol até à linha de 3 pontos do
// basquetebol ou à área de 6m do andebol, só mudando o diâmetro.
function ArcoRecortado({ extremo, diametro, distanciaBorde = 0, dashed = false }) {
    const r = diametro / 2;
    const lado = extremo === 'arriba' ? { top: distanciaBorde, marginTop: -r } : { bottom: distanciaBorde, marginBottom: -r };
    return (
        <View
            style={[styles.arco, { width: diametro, height: diametro, borderRadius: r, left: '50%', marginLeft: -r, borderStyle: dashed ? 'dashed' : 'solid' }, lado]}
            pointerEvents="none"
        />
    );
}

// Pequeno arco de canto — mesma técnica de recorte, aplicada aos 4
// cantos do campo. Só faz sentido em desportos com cantos retos (futebol/futsal).
function ArcoCanto({ vertical, horizontal, tamanho = 16 }) {
    const posStyle = {};
    posStyle[vertical] = -tamanho / 2;
    posStyle[horizontal] = -tamanho / 2;
    const raioStyle = {};
    if (vertical === 'top' && horizontal === 'left') raioStyle.borderBottomRightRadius = tamanho;
    if (vertical === 'top' && horizontal === 'right') raioStyle.borderBottomLeftRadius = tamanho;
    if (vertical === 'bottom' && horizontal === 'left') raioStyle.borderTopRightRadius = tamanho;
    if (vertical === 'bottom' && horizontal === 'right') raioStyle.borderTopLeftRadius = tamanho;
    return (
        <View
            pointerEvents="none"
            style={[styles.cantoBase, posStyle, raioStyle, { width: tamanho, height: tamanho }]}
        />
    );
}

function LineaPunteada({ extremo, distanciaPorc, anchoPorc = 8 }) {
    const lado = extremo === 'arriba' ? { top: `${distanciaPorc}%` } : { bottom: `${distanciaPorc}%` };
    return <View style={[styles.lineaPunteada, { left: `${anchoPorc}%`, right: `${anchoPorc}%` }, lado]} pointerEvents="none" />;
}

function Red() {
    return (
        <>
            <View style={styles.red} pointerEvents="none" />
            <View style={[styles.poste, { left: '3%' }]} pointerEvents="none" />
            <View style={[styles.poste, { right: '3%' }]} pointerEvents="none" />
        </>
    );
}

// Caixas de serviço de ténis / padel / badminton, de cada lado da rede
function CajasServicio({ profundidadPorc = 22 }) {
    const borde = `${50 - profundidadPorc}%`;
    return (
        <>
            <View style={[styles.cajaServicio, { top: borde, height: `${profundidadPorc}%` }]} pointerEvents="none" />
            <View style={[styles.cajaServicio, { bottom: borde, height: `${profundidadPorc}%` }]} pointerEvents="none" />
            <View style={[styles.lineaServicioCentral, { top: borde, bottom: borde }]} pointerEvents="none" />
        </>
    );
}

// Postes em "H" de râguebi
function Postes({ extremo }) {
    const lado = extremo === 'arriba' ? { top: 2 } : { bottom: 2 };
    return (
        <View style={[styles.postesWrap, lado]} pointerEvents="none">
            <View style={styles.posteIzq} />
            <View style={styles.posteDer} />
            <View style={styles.travesano} />
        </View>
    );
}

// Losango de basebol / softbol
function Diamante() {
    return (
        <View style={styles.diamanteWrap} pointerEvents="none">
            <View style={styles.diamante} />
            <View style={styles.monticulo} />
        </View>
    );
}

/* =====================================================
   CONFIGURAÇÃO VISUAL POR DESPORTO
   ===================================================== */

const CONFIG = {
    futbol:     { fondo: '#0f6b3a', aspecto: 0.64 },
    futsal:     { fondo: '#1a6ea8', aspecto: 0.50 }, // era 0.62 — campo oficial 40×20m
    baloncesto: { fondo: '#c17f3e', aspecto: 0.56 },
    balonmano:  { fondo: '#146b52', aspecto: 0.50 }, // era 0.58 — campo oficial 40×20m
    voleibol:   { fondo: '#1d6fae', aspecto: 0.50 },
    padel:      { fondo: '#0e9488', aspecto: 0.50 }, // era 0.55 — campo oficial 20×10m
    tenis:      { fondo: '#b5541f', aspecto: 0.46 },
    tenisMesa:  { fondo: '#0a4f8c', aspecto: 0.60 },
    badminton:  { fondo: '#2f9e52', aspecto: 0.48 },
    rugby:      { fondo: '#0c5c33', aspecto: 0.60 },
    hockey:     { fondo: '#1560bd', aspecto: 0.64 },
    beisbol:    { fondo: '#2e7d32', aspecto: 0.80 },
    generico:   { fondo: '#232833', aspecto: 0.70 },
};

const DIVIDE_POR_RED = ['voleibol', 'padel', 'tenis', 'tenisMesa', 'badminton'];

/* =====================================================
   COMPONENTE PRINCIPAL
   ===================================================== */

export default function FormationPitch({ equipo, posicionesInfo, deporte, small }) {
    const tipo = detetarDeporte(deporte);
    const cfg = CONFIG[tipo];
    const dividePorRed = DIVIDE_POR_RED.includes(tipo);
    const denso = equipo.length >= 9;
    const tamanho = small || denso ? 'small' : 'normal';
    const { width: cardW, height: cardH } = JERSEY_SIZES[tamanho];

    const formacao = calcularFormacao(equipo, posicionesInfo, tipo, dividePorRed);

    return (
        <View style={[styles.campo, { backgroundColor: cfg.fondo, aspectRatio: cfg.aspecto }]}>
            <View style={styles.franjas} pointerEvents="none">
                {Array.from({ length: 8 }).map((_, i) => (
                    <View key={i} style={[styles.franja, { backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'transparent' }]} />
                ))}
            </View>
            <View style={styles.vinheta} pointerEvents="none" />

            {(tipo === 'futbol' || tipo === 'futsal') && (
                <>
                    <LineaCentral /><CirculoCentro diametro={78} /><PuntoCentro />
                    <CajaArea extremo="arriba" anchoPorc={18} altoPorc={13} />
                    <CajaArea extremo="arriba" anchoPorc={34} altoPorc={6} />
                    <ArcoRecortado extremo="arriba" diametro={90} distanciaBorde="13%" />
                    <CajaArea extremo="abajo" anchoPorc={18} altoPorc={13} />
                    <CajaArea extremo="abajo" anchoPorc={34} altoPorc={6} />
                    <ArcoRecortado extremo="abajo" diametro={90} distanciaBorde="13%" />
                    <ArcoCanto vertical="top" horizontal="left" />
                    <ArcoCanto vertical="top" horizontal="right" />
                    <ArcoCanto vertical="bottom" horizontal="left" />
                    <ArcoCanto vertical="bottom" horizontal="right" />
                </>
            )}

            {tipo === 'baloncesto' && (
                <>
                    <LineaCentral /><CirculoCentro diametro={64} />
                    <CajaArea extremo="arriba" anchoPorc={30} altoPorc={20} />
                    <ArcoRecortado extremo="arriba" diametro={70} distanciaBorde="20%" />
                    <ArcoRecortado extremo="arriba" diametro={26} distanciaBorde="8%" />
                    <ArcoRecortado extremo="arriba" diametro={300} distanciaBorde={0} />
                    <CajaArea extremo="abajo" anchoPorc={30} altoPorc={20} />
                    <ArcoRecortado extremo="abajo" diametro={70} distanciaBorde="20%" />
                    <ArcoRecortado extremo="abajo" diametro={26} distanciaBorde="8%" />
                    <ArcoRecortado extremo="abajo" diametro={300} distanciaBorde={0} />
                </>
            )}

            {tipo === 'balonmano' && (
                <>
                    <LineaCentral />
                    <ArcoRecortado extremo="arriba" diametro={170} distanciaBorde={0} />
                    <ArcoRecortado extremo="arriba" diametro={230} distanciaBorde={0} dashed />
                    <Punto extremo="arriba" distanciaPorc={11} />
                    <ArcoRecortado extremo="abajo" diametro={170} distanciaBorde={0} />
                    <ArcoRecortado extremo="abajo" diametro={230} distanciaBorde={0} dashed />
                    <Punto extremo="abajo" distanciaPorc={11} />
                </>
            )}

            {tipo === 'hockey' && (
                <>
                    <LineaCentral />
                    <ArcoRecortado extremo="arriba" diametro={150} distanciaBorde={0} />
                    <ArcoRecortado extremo="abajo" diametro={150} distanciaBorde={0} />
                </>
            )}

            {tipo === 'rugby' && (
                <>
                    <LineaCentral />
                    <LineaPunteada extremo="arriba" distanciaPorc={22} />
                    <LineaPunteada extremo="abajo" distanciaPorc={22} />
                    <CajaArea extremo="arriba" anchoPorc={10} altoPorc={6} />
                    <CajaArea extremo="abajo" anchoPorc={10} altoPorc={6} />
                    <Postes extremo="arriba" />
                    <Postes extremo="abajo" />
                </>
            )}

            {tipo === 'voleibol' && (
                <>
                    <Red />
                    <LineaPunteada extremo="arriba" distanciaPorc={25} />
                    <LineaPunteada extremo="abajo" distanciaPorc={25} />
                </>
            )}

            {(tipo === 'tenis' || tipo === 'padel') && (
                <>
                    <Red />
                    <CajasServicio profundidadPorc={tipo === 'padel' ? 30 : 26} />
                </>
            )}

            {tipo === 'badminton' && (
                <>
                    <Red />
                    <CajasServicio profundidadPorc={16} />
                </>
            )}

            {tipo === 'tenisMesa' && (
                <>
                    <Red />
                    <LineaPunteada extremo="arriba" distanciaPorc={4} />
                    <LineaPunteada extremo="abajo" distanciaPorc={4} />
                </>
            )}

            {tipo === 'beisbol' && <Diamante />}

            {tipo === 'generico' && (
                <>
                    <LineaCentral /><CirculoCentro diametro={60} />
                </>
            )}

            {formacao.map(({ jogador, xPorc, yPorc }) => (
                <View
                    key={jogador.id}
                    style={[
                        styles.jogadorAbs,
                        {
                            left: `${xPorc}%`,
                            top: `${yPorc}%`,
                            marginLeft: -(cardW / 2),
                            marginTop: -(cardH / 2),
                        },
                    ]}
                >
                    <PlayerJerseyCard jugador={jogador} size={tamanho} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    campo: {
        width: '100%',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: LINEA,
        overflow: 'hidden',
        position: 'relative',
    },
    franjas: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
    franja: { flex: 1 },
    vinheta: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 26,
        borderColor: 'rgba(0,0,0,0.10)',
        borderRadius: 30,
    },

    lineaMedio: { position: 'absolute', left: 0, right: 0, top: '50%', height: 2, backgroundColor: LINEA },
    circulo: { position: 'absolute', borderWidth: 2, borderColor: LINEA },
    puntoCentro: {
        position: 'absolute', top: '50%', left: '50%',
        width: 5, height: 5, borderRadius: 2.5, marginTop: -2.5, marginLeft: -2.5,
        backgroundColor: LINEA,
    },
    punto: { position: 'absolute', left: '50%', width: 5, height: 5, borderRadius: 2.5, marginLeft: -2.5, backgroundColor: LINEA },

    caja: { position: 'absolute', borderWidth: 2, borderColor: LINEA },
    arco: { position: 'absolute', borderWidth: 2, borderColor: LINEA, backgroundColor: 'transparent' },
    cantoBase: { position: 'absolute', borderWidth: 2, borderColor: LINEA, backgroundColor: 'transparent' },
    lineaPunteada: { position: 'absolute', height: 0, borderTopWidth: 2, borderColor: LINEA_SUAVE, borderStyle: 'dashed' },

    red: { position: 'absolute', left: 0, right: 0, top: '50%', height: 4, marginTop: -2, backgroundColor: 'rgba(255,255,255,0.9)' },
    poste: { position: 'absolute', top: '46%', width: 4, height: '8%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2 },

    cajaServicio: { position: 'absolute', left: '12%', right: '12%', borderWidth: 1.5, borderColor: LINEA_SUAVE },
    lineaServicioCentral: { position: 'absolute', left: '50%', width: 2, marginLeft: -1, backgroundColor: LINEA_SUAVE },

    postesWrap: { position: 'absolute', left: '50%', marginLeft: -17, width: 34, height: 24 },
    posteIzq: { position: 'absolute', left: 0, top: 0, width: 3, height: 24, backgroundColor: 'rgba(255,255,255,0.9)' },
    posteDer: { position: 'absolute', right: 0, top: 0, width: 3, height: 24, backgroundColor: 'rgba(255,255,255,0.9)' },
    travesano: { position: 'absolute', top: 16, left: 0, right: 0, height: 3, backgroundColor: 'rgba(255,255,255,0.9)' },

    diamanteWrap: {
        position: 'absolute', left: '10%', right: '10%', bottom: '6%', height: '46%',
        alignItems: 'center', justifyContent: 'flex-end',
    },
    diamante: {
        width: '78%', aspectRatio: 1,
        backgroundColor: '#8b5e34', borderWidth: 2, borderColor: 'rgba(255,255,255,0.7)',
        transform: [{ rotate: '45deg' }],
    },
    monticulo: {
        position: 'absolute', bottom: '34%', width: 16, height: 16, borderRadius: 8,
        backgroundColor: '#a9744a', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
    },

    jogadorAbs: { position: 'absolute' },
});