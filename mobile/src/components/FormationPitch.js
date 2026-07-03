import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerJerseyCard from './PlayerJerseyCard';

// Agrupa los jugadores por posición y ordena los grupos de abajo (orden más
// bajo, ej. portero) hacia arriba (orden más alto, ej. delantero), usando la
// lista de posiciones del deporte (con su "orden") cuando está disponible.
function agruparPorPosicion(jugadores, posicionesInfo) {
    const grupos = {};
    jugadores.forEach(j => {
        const pos = j.posicion || 'Sin posición';
        if (!grupos[pos]) grupos[pos] = [];
        grupos[pos].push(j);
    });

    const ordenDe = {};
    (posicionesInfo || []).forEach(p => { ordenDe[p.nombre] = p.orden ?? 0; });

    return Object.keys(grupos)
        .map(nombre => ({
            nombre,
            jugadores: grupos[nombre],
            orden: nombre === 'Sin posición' ? -1 : (ordenDe[nombre] ?? 999),
        }))
        .sort((a, b) => a.orden - b.orden);
}

// Detecta qué tipo de cancha/campo hay que dibujar según el nombre del deporte.
function tipoCampo(nombre) {
    const n = (nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (n.includes('baloncesto') || n.includes('basquet') || n.includes('balonmano') || n.includes('handball')) {
        return 'continua';
    }
    if (n.includes('voleibol') || n.includes('voley') || n.includes('tenis de mesa') || n.includes('ping pong') ||
        n.includes('padel') || n.includes('tenis') || n.includes('badminton')) {
        return 'dividida';
    }
    if (n.includes('futbol') || n.includes('futsal') || n.includes('rugby') || n.includes('hockey')) {
        return 'campo';
    }
    return 'generico';
}

const CONFIG_CAMPO = {
    campo:     { fondo: '#0f6b3a', aspecto: 0.64 },
    continua:  { fondo: '#a15c2e', aspecto: 0.58 },
    dividida:  { fondo: '#0e7490', aspecto: 0.52 },
    generico:  { fondo: '#232833', aspecto: 0.70 },
};

export default function FormationPitch({ equipo, posicionesInfo, deporte, small }) {
    const filas = agruparPorPosicion(equipo, posicionesInfo);
    const muchasFilas = filas.length >= 5;
    const tipo = tipoCampo(deporte);
    const cfg = CONFIG_CAMPO[tipo];

    return (
        <View style={[styles.campo, { backgroundColor: cfg.fondo, aspectRatio: cfg.aspecto }]}>
            {/* Textura de franjas */}
            <View style={styles.franjas} pointerEvents="none">
                {Array.from({ length: 8 }).map((_, i) => (
                    <View key={i} style={[styles.franja, { backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'transparent' }]} />
                ))}
            </View>

            {/* Campo de fútbol / rugby / hockey: 2 balizas + círculo central */}
            {tipo === 'campo' && (
                <>
                    <View style={styles.lineaMedio} pointerEvents="none" />
                    <View style={styles.circuloCentro} pointerEvents="none" />
                    <View style={styles.puntoCentro} pointerEvents="none" />
                    <View style={[styles.area, styles.areaArriba]} pointerEvents="none" />
                    <View style={[styles.areaChica, styles.areaChicaArriba]} pointerEvents="none" />
                    <View style={[styles.area, styles.areaAbajo]} pointerEvents="none" />
                    <View style={[styles.areaChica, styles.areaChicaAbajo]} pointerEvents="none" />
                </>
            )}

            {/* Cancha continua (baloncesto / balonmano): zona + círculo de tiro libre en cada punta */}
            {tipo === 'continua' && (
                <>
                    <View style={styles.lineaMedio} pointerEvents="none" />
                    <View style={styles.circuloCentro} pointerEvents="none" />
                    <View style={[styles.zona, styles.zonaArriba]} pointerEvents="none" />
                    <View style={[styles.tiroLibre, styles.tiroLibreArriba]} pointerEvents="none" />
                    <View style={[styles.zona, styles.zonaAbajo]} pointerEvents="none" />
                    <View style={[styles.tiroLibre, styles.tiroLibreAbajo]} pointerEvents="none" />
                </>
            )}

            {/* Cancha dividida por red (voleibol / tenis / pádel / bádminton) */}
            {tipo === 'dividida' && (
                <>
                    <View style={styles.red} pointerEvents="none" />
                    <View style={[styles.lineaAtaque, styles.lineaAtaqueArriba]} pointerEvents="none" />
                    <View style={[styles.lineaAtaque, styles.lineaAtaqueAbajo]} pointerEvents="none" />
                </>
            )}

            {/* Genérico: solo línea y círculo central */}
            {tipo === 'generico' && (
                <>
                    <View style={styles.lineaMedio} pointerEvents="none" />
                    <View style={styles.circuloCentro} pointerEvents="none" />
                </>
            )}

            {/* Filas de jugadores. En canchas divididas por red, el equipo se
                queda solo en su propia mitad (más realista, no invade el otro lado) */}
            <View style={[styles.filasContenedor, tipo === 'dividida' && styles.filasContenedorMitad]}>
                {filas.map((fila, idx) => (
                    <View key={fila.nombre + idx} style={[styles.fila, muchasFilas && styles.filaCompacta]}>
                        {fila.jugadores.map(j => (
                            <PlayerJerseyCard key={j.id} jugador={j} size={small || muchasFilas ? 'small' : 'normal'} />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const LINEA = 'rgba(255,255,255,0.85)';

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

    // -- Fútbol / rugby / hockey --
    lineaMedio: {
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 2, backgroundColor: LINEA,
    },
    circuloCentro: {
        position: 'absolute', top: '50%', left: '50%',
        width: 78, height: 78, borderRadius: 39,
        marginTop: -39, marginLeft: -39,
        borderWidth: 2, borderColor: LINEA,
    },
    puntoCentro: {
        position: 'absolute', top: '50%', left: '50%',
        width: 5, height: 5, borderRadius: 2.5,
        marginTop: -2.5, marginLeft: -2.5,
        backgroundColor: LINEA,
    },
    area: {
        position: 'absolute', left: '18%', right: '18%',
        height: '13%', borderWidth: 2, borderColor: LINEA,
    },
    areaArriba: { top: 0, borderTopWidth: 0 },
    areaAbajo: { bottom: 0, borderBottomWidth: 0 },
    areaChica: {
        position: 'absolute', left: '34%', right: '34%',
        height: '6%', borderWidth: 2, borderColor: LINEA,
    },
    areaChicaArriba: { top: 0, borderTopWidth: 0 },
    areaChicaAbajo: { bottom: 0, borderBottomWidth: 0 },

    // -- Baloncesto / balonmano --
    zona: {
        position: 'absolute', left: '30%', right: '30%',
        height: '20%', borderWidth: 2, borderColor: LINEA,
    },
    zonaArriba: { top: 0, borderTopWidth: 0 },
    zonaAbajo: { bottom: 0, borderBottomWidth: 0 },
    tiroLibre: {
        position: 'absolute', left: '50%',
        width: 70, height: 70, borderRadius: 35,
        marginLeft: -35, borderWidth: 2, borderColor: LINEA,
    },
    tiroLibreArriba: { top: '20%', marginTop: -35 },
    tiroLibreAbajo: { bottom: '20%', marginBottom: -35 },

    // -- Voleibol / tenis / pádel / bádminton --
    red: {
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 4, marginTop: -2,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    lineaAtaque: {
        position: 'absolute', left: '8%', right: '8%',
        height: 0, borderTopWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
        borderStyle: 'dashed',
    },
    lineaAtaqueArriba: { top: '25%' },
    lineaAtaqueAbajo: { bottom: '25%' },

    filasContenedor: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-evenly',
        paddingVertical: 14,
        paddingHorizontal: 6,
    },
    filasContenedorMitad: {
        flex: 0,
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: '44%',
        paddingVertical: 8,
    },
    fila: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        rowGap: 10,
    },
    filaCompacta: { rowGap: 4 },
});