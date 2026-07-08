import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorNivel, colorNivelDim, inicialesPosicion } from '../utils/nivel';

// Tamanhos fixos do cartão por variante. O FormationPitch usa estes
// valores para ancorar corretamente cada jogador na coordenada (x%, y%)
// calculada pelo motor de posicionamento — se os tamanhos aqui mudarem,
// a ancoragem no campo continua sempre correta.
export const JERSEY_SIZES = {
    normal: { width: 76, height: 108 },
    small: { width: 60, height: 88 },
};

// Cartão em forma de camisola para representar um jogador dentro de uma
// formação. A cor da camisola muda consoante o nível do jogador (Médio,
// Bom, Muito Bom), tal como na versão web.
export default function PlayerJerseyCard({ jugador, size = 'normal' }) {
    const color = colorNivel(jugador.nivel);
    const colorDim = colorNivelDim(jugador.nivel);
    const iniciales = inicialesPosicion(jugador.posicion);
    const letra = (jugador.nombre || '?').trim().charAt(0).toUpperCase();
    const small = size === 'small';

    const jerseySize = small ? 42 : 54;
    const sleeveW = small ? 12 : 15;
    const sleeveH = small ? 15 : 19;
    const { width } = JERSEY_SIZES[small ? 'small' : 'normal'];

    return (
        <View style={[styles.wrap, { width }]}>
            <View style={[styles.badge, { backgroundColor: colorDim, borderColor: color }]}>
                <Text style={[styles.badgeTexto, { color }]} numberOfLines={1}>{iniciales}</Text>
            </View>

            <View style={styles.jerseyWrap}>
                <View
                    style={[
                        styles.manga,
                        {
                            width: sleeveW, height: sleeveH, borderColor: color,
                            top: small ? -3 : -4, left: small ? -6 : -8,
                            transform: [{ rotate: '-24deg' }],
                        },
                    ]}
                />
                <View
                    style={[
                        styles.manga,
                        {
                            width: sleeveW, height: sleeveH, borderColor: color,
                            top: small ? -3 : -4, right: small ? -6 : -8,
                            transform: [{ rotate: '24deg' }],
                        },
                    ]}
                />

                <View style={[styles.torso, { width: jerseySize, height: jerseySize - 4, borderColor: color }]}>
                    {/* Reflexo diagonal de luz — simula tecido em vez de superfície plana.
                        "overflow: hidden" no torso funciona como máscara para esta tira. */}
                    <View style={styles.brilho} pointerEvents="none" />
                    <View style={[styles.brilhoFino, { left: jerseySize * 0.62 }]} pointerEvents="none" />

                    <View style={[styles.cuello, { backgroundColor: color }]} />
                    <Text style={[styles.letra, { color, fontSize: small ? 16 : 18 }]}>{letra}</Text>
                </View>

                {/* Sombra de contacto em duas camadas: um núcleo mais escuro e
                    estreito por baixo da camisola, com uma penumbra maior e mais
                    suave por fora — evita o "corte" abrupto de uma sombra única. */}
                <View style={[styles.sombraPenumbra, { width: jerseySize * 0.95 }]} pointerEvents="none" />
                <View style={[styles.sombraNucleo, { width: jerseySize * 0.55 }]} pointerEvents="none" />
            </View>

            <Text style={[styles.nome, small && styles.nomeSmall]} numberOfLines={1}>{jugador.nombre}</Text>
            <View style={[styles.nivelPill, { backgroundColor: colorDim }]}>
                <View style={[styles.nivelDot, { backgroundColor: color }]} />
                <Text style={[styles.nivelTexto, { color }]} numberOfLines={1}>{jugador.nivel || '—'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { alignItems: 'center' },
    badge: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 3,
        maxWidth: 60,
    },
    badgeTexto: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
    jerseyWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
    manga: {
        position: 'absolute',
        backgroundColor: '#eef2f7',
        borderWidth: 2,
        borderRadius: 6,
    },
    torso: {
        backgroundColor: '#eef2f7',
        borderWidth: 2.2,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 4,
    },
    // Duas tiras diagonais claras, deslocadas do centro — dão a
    // sensação de dobra/textura de tecido em vez de plástico liso.
    brilho: {
        position: 'absolute',
        top: -10, bottom: -10, left: '8%',
        width: '30%',
        backgroundColor: 'rgba(255,255,255,0.30)',
        transform: [{ rotate: '18deg' }],
    },
    brilhoFino: {
        position: 'absolute',
        top: -10, bottom: -10,
        width: '10%',
        backgroundColor: 'rgba(255,255,255,0.18)',
        transform: [{ rotate: '18deg' }],
    },
    cuello: {
        position: 'absolute',
        top: -3,
        width: 16,
        height: 7,
        borderRadius: 4,
    },
    letra: { fontWeight: '800' },
    sombraPenumbra: {
        height: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.14)',
        marginTop: 2,
    },
    sombraNucleo: {
        position: 'absolute',
        bottom: 2,
        height: 4,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.30)',
    },
    nome: { color: '#fff', fontSize: 11, fontWeight: '700', marginTop: 4, maxWidth: 74, textAlign: 'center' },
    nomeSmall: { fontSize: 10, maxWidth: 58 },
    nivelPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 6,
        paddingVertical: 1.5,
        borderRadius: 8,
        marginTop: 3,
    },
    nivelDot: { width: 5, height: 5, borderRadius: 3 },
    nivelTexto: { fontSize: 8.5, fontWeight: '700' },
});