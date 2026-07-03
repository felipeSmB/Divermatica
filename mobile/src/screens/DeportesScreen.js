import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiFetch } from '../api/client';

// Mesma paleta de acentos já usada em utils/nivel.js, para manter a
// identidade visual consistente com o resto da app.
const ACCENTS = ['#00d4ff', '#7c4dff', '#00e676', '#ffc107', '#ff4d6d', '#1e88e5'];

function iconoDeporte(nombre) {
    const n = (nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (n.includes('futbol sala') || n.includes('futsal')) return '🥅';
    if (n.includes('futbol'))     return '⚽';
    if (n.includes('baloncesto') || n.includes('basquet')) return '🏀';
    if (n.includes('voleibol') || n.includes('voley'))     return '🏐';
    if (n.includes('tenis de mesa') || n.includes('ping pong')) return '🏓';
    if (n.includes('padel'))      return '🎾';
    if (n.includes('tenis'))      return '🎾';
    if (n.includes('balonmano') || n.includes('handball')) return '🤾';
    if (n.includes('rugby'))      return '🏉';
    if (n.includes('beisbol') || n.includes('softball'))   return '⚾';
    if (n.includes('hockey'))     return '🏑';
    if (n.includes('badminton'))  return '🏸';
    if (n.includes('natacion'))   return '🏊';
    if (n.includes('ciclismo'))   return '🚴';
    if (n.includes('atletismo') || n.includes('carrera'))  return '🏃';
    if (n.includes('boxeo'))      return '🥊';
    if (n.includes('golf'))       return '⛳';
    return '🏅';
}

export default function DeportesScreen() {
    const [deportes, setDeportes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [numJugadores, setNumJugadores] = useState('7');

    const cargar = useCallback(async () => {
        const res = await apiFetch('/deportes.php');
        if (res && res.ok) setDeportes(await res.json());
    }, []);

    useFocusEffect(useCallback(() => { cargar(); }, [cargar]));

    async function crear() {
        if (!nombre) return;
        const res = await apiFetch('/deportes.php', {
            method: 'POST',
            body: JSON.stringify({ nombre, num_jugadores: parseInt(numJugadores, 10) || 7 }),
        });
        if (res && res.ok) {
            setNombre('');
            cargar();
        } else {
            Alert.alert('Error', 'No se pudo crear el deporte');
        }
    }

    async function eliminar(id) {
        const res = await apiFetch(`/deportes.php?id=${id}`, { method: 'DELETE' });
        if (res && res.ok) cargar();
    }

    function confirmarEliminar(item) {
        Alert.alert(
            'Eliminar deporte',
            `¿Seguro que quieres eliminar "${item.nombre}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => eliminar(item.id) },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Deportes</Text>
                <Text style={styles.subtitulo}>
                    {deportes.length} {deportes.length === 1 ? 'deporte registrado' : 'deportes registrados'}
                </Text>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.formLabel}>Nuevo deporte</Text>
                <View style={styles.formRow}>
                    <TextInput
                        style={[styles.input, { flex: 2 }]}
                        placeholder="Nombre del deporte"
                        placeholderTextColor="#5b6478"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Nº"
                        placeholderTextColor="#5b6478"
                        value={numJugadores}
                        onChangeText={setNumJugadores}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.boton} onPress={crear} activeOpacity={0.85}>
                    <Text style={styles.botonTexto}>+ Añadir deporte</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={deportes}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.columna}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <View style={styles.vacio}>
                        <Text style={styles.vacioEmoji}>🏅</Text>
                        <Text style={styles.vacioTexto}>Aún no hay deportes</Text>
                    </View>
                }
                renderItem={({ item, index }) => {
                    const accent = ACCENTS[index % ACCENTS.length];
                    return (
                        <View style={[styles.card, { borderColor: accent + '33' }]}>
                            <View style={[styles.cardTopo, { backgroundColor: accent }]} />
                            <View style={[styles.icono, { backgroundColor: accent + '22', borderColor: accent }]}>
                                <Text style={styles.iconoTexto}>{iconoDeporte(item.nombre)}</Text>
                            </View>
                            <Text style={styles.nombreDeporte} numberOfLines={1}>{item.nombre}</Text>
                            <Text style={styles.idDeporte}>ID #{item.id}</Text>
                            <View style={styles.stat}>
                                <Text style={styles.statIcono}>👥</Text>
                                <Text style={styles.statTexto}>
                                    <Text style={styles.statNum}>{item.num_jugadores}</Text> por equipo
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.botonEliminar} onPress={() => confirmarEliminar(item)}>
                                <Text style={styles.botonEliminarTexto}>✕ Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f1115', padding: 16 },

    header: { marginBottom: 16 },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    subtitulo: { fontSize: 12, color: '#5b6478', marginTop: 2 },

    formCard: {
        backgroundColor: '#1c1f26',
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
    },
    formLabel: { color: '#8a9bbf', fontSize: 12, fontWeight: '700', marginBottom: 8, letterSpacing: 0.3 },
    formRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
    input: { backgroundColor: '#11141a', color: '#fff', padding: 12, borderRadius: 8 },
    boton: { backgroundColor: '#00c2ff', padding: 12, borderRadius: 8 },
    botonTexto: { color: '#000', textAlign: 'center', fontWeight: 'bold' },

    lista: { paddingBottom: 24 },
    columna: { gap: 12 },

    card: {
        flex: 1,
        backgroundColor: '#1c1f26',
        borderRadius: 16,
        borderWidth: 1,
        padding: 14,
        marginBottom: 12,
        overflow: 'hidden',
    },
    cardTopo: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
    },
    icono: {
        width: 42,
        height: 42,
        borderRadius: 13,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    iconoTexto: { fontSize: 20 },

    nombreDeporte: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
    idDeporte: { color: '#5b6478', fontSize: 10, marginTop: 2, marginBottom: 10 },

    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#11141a',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    statIcono: { fontSize: 12 },
    statTexto: { color: '#8a9bbf', fontSize: 11.5, flexShrink: 1 },
    statNum: { color: '#fff', fontWeight: '700' },

    botonEliminar: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.06)',
        paddingTop: 10,
        alignItems: 'center',
    },
    botonEliminarTexto: { color: '#ff4d6d', fontSize: 12, fontWeight: '700' },

    vacio: { alignItems: 'center', paddingVertical: 60 },
    vacioEmoji: { fontSize: 34, marginBottom: 10 },
    vacioTexto: { color: '#5b6478', fontSize: 13, fontStyle: 'italic' },
});