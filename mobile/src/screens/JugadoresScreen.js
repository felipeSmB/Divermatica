import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { apiFetch } from '../api/client';
import { colorNivel, colorNivelDim, inicialesPosicion } from '../utils/nivel';
import { ACCENTS, iconoDeporte, normalizarTexto } from '../utils/deporteVisual';
import { detetarDeporte } from '../utils/posicionamento';
import usePlano from '../hooks/usePlano';
import ProBadge from '../components/ProBadge';

const NIVELES = ['Medio', 'Bueno', 'Muy Bueno'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inicialesNombre(nombre) {
    const palabras = (nombre || '').trim().split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return '?';
    if (palabras.length === 1) return palabras[0].charAt(0).toUpperCase();
    return (palabras[0].charAt(0) + palabras[palabras.length - 1].charAt(0)).toUpperCase();
}

export default function JugadoresScreen() {
    const { isDemo } = usePlano();
    const [jugadores, setJugadores] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [posiciones, setPosiciones] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [detalleVisible, setDetalleVisible] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [deporteId, setDeporteId] = useState('');
    const [posicion, setPosicion] = useState('');
    const [nivel, setNivel] = useState('');

    const [busqueda, setBusqueda] = useState('');
    const [filtroDeporte, setFiltroDeporte] = useState(''); // '' = Todos

    const cargarJugadores = useCallback(async () => {
        const res = await apiFetch('/jugadores.php');
        if (res && res.ok) setJugadores(await res.json());
    }, []);

    const cargarDeportes = useCallback(async () => {
        const res = await apiFetch('/deportes.php');
        if (res && res.ok) setDeportes(await res.json());
    }, []);

    useFocusEffect(useCallback(() => { cargarJugadores(); cargarDeportes(); }, []));

    useEffect(() => {
        (async () => {
            if (!deporteId) { setPosiciones([]); return; }
            const res = await apiFetch(`/posiciones.php?deporte_id=${deporteId}`);
            if (res && res.ok) setPosiciones(await res.json());
        })();
    }, [deporteId]);

    const accentPorDeporte = useMemo(() => {
        const map = {};
        deportes.forEach((d, i) => { map[d.id] = ACCENTS[i % ACCENTS.length]; });
        return map;
    }, [deportes]);

    const jugadoresFiltrados = useMemo(() => {
        const q = normalizarTexto(busqueda);
        return jugadores.filter(j => {
            if (filtroDeporte && String(j.deporte_id) !== filtroDeporte) return false;
            if (q && !normalizarTexto(j.nombre).includes(q)) return false;
            return true;
        });
    }, [jugadores, busqueda, filtroDeporte]);

    function abrirNuevo() {
        if (isDemo && jugadores.length >= 22) {
            Alert.alert('Límite demo', 'Límite demo: 22 jugadores. Actualiza a Pro para jugadores ilimitados.');
            return;
        }
        setEditandoId(null);
        setNombre(''); setTelefono(''); setMail(''); setDeporteId(''); setPosicion(''); setNivel('');
        setModalVisible(true);
    }

    function abrirEditar(j) {
        setEditandoId(j.id);
        setNombre(j.nombre); setTelefono(j.telefono || ''); setMail(j.mail || '');
        setDeporteId(j.deporte_id ? String(j.deporte_id) : '');
        setPosicion(j.posicion || ''); setNivel(j.nivel);
        setModalVisible(true);
    }

    function abrirDetalle(j) {
        setJugadorSeleccionado(j);
        setDetalleVisible(true);
    }

    async function guardar() {
        if (!nombre.trim()) return Alert.alert('Atención', 'El nombre es obligatorio');
        if (isDemo && !editandoId && jugadores.length >= 22) {
            Alert.alert('Límite demo', 'Límite demo: 22 jugadores. Actualiza a Pro para jugadores ilimitados.');
            return;
        }
        if (!telefono.trim()) return Alert.alert('Atención', 'El teléfono es obligatorio');
        if (!mail.trim() || !EMAIL_REGEX.test(mail.trim())) return Alert.alert('Atención', 'Introduce un correo válido');
        if (!posicion) return Alert.alert('Atención', 'Selecciona una posición');
        if (!nivel) return Alert.alert('Atención', 'Selecciona un nivel');

        const body = {
            nombre, telefono, mail, posicion, nivel,
            deporte_id: deporteId ? parseInt(deporteId, 10) : null,
        };
        if (editandoId) body.id = editandoId;

        const res = await apiFetch('/jugadores.php', {
            method: editandoId ? 'PUT' : 'POST',
            body: JSON.stringify(body),
        });

        if (res && res.ok) {
            setModalVisible(false);
            cargarJugadores();
        } else {
            const data = res ? await res.json() : {};
            Alert.alert('Error', Array.isArray(data.erro) ? data.erro.join('\n') : (data.erro || 'No se pudo guardar'));
        }
    }

    function eliminar(id, nombreJugador) {
        Alert.alert(
            'Eliminar jugador',
            `¿Seguro que quieres eliminar a ${nombreJugador}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const res = await apiFetch(`/jugadores.php?id=${id}`, { method: 'DELETE' });
                        if (res && res.ok) cargarJugadores();
                        else Alert.alert('Error', 'No se pudo eliminar el jugador');
                    },
                },
            ],
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.cabecera}>
                <View>
                    <Text style={styles.titulo}>Jugadores</Text>
                    <Text style={styles.subtitulo}>
                        {jugadoresFiltrados.length} de {jugadores.length} {jugadores.length === 1 ? 'jugador' : 'jugadores'}
                    </Text>
                </View>
                <TouchableOpacity style={[styles.botonPeq, isDemo && jugadores.length >= 22 && { opacity: 0.5 }]} onPress={abrirNuevo}>
                    <Text style={styles.botonTexto}>+ Nuevo</Text>
                </TouchableOpacity>
            </View>

            {/* Buscador por nombre */}
            <View style={styles.buscadorWrap}>
                <Text style={styles.buscadorIcono}>🔍</Text>
                <TextInput
                    style={styles.buscadorInput}
                    placeholder="Buscar jugador por nombre..."
                    placeholderTextColor="#5b6478"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    autoCapitalize="none"
                />
                {busqueda.length > 0 && (
                    <TouchableOpacity onPress={() => setBusqueda('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Text style={styles.buscadorLimpiar}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Filtro por deporte — SEM scroll escondido: quebra de linha
                automática, para que todos os filtros estejam sempre à vista. */}
            <View style={styles.filtrosFila}>
                <TouchableOpacity
                    style={[styles.chip, filtroDeporte === '' && styles.chipActivoTodos]}
                    onPress={() => setFiltroDeporte('')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.chipTexto, filtroDeporte === '' && styles.chipTextoActivo]}>
                        📋 Todos
                    </Text>
                    <View style={[styles.chipContador, filtroDeporte === '' && styles.chipContadorActivo]}>
                        <Text style={[styles.chipContadorTexto, filtroDeporte === '' && styles.chipContadorTextoActivo]}>
                            {jugadores.length}
                        </Text>
                    </View>
                </TouchableOpacity>
                {deportes.map(d => {
                    const activo = String(d.id) === filtroDeporte;
                    const accent = accentPorDeporte[d.id] || '#00c2ff';
                    const cantidad = jugadores.filter(j => String(j.deporte_id) === String(d.id)).length;
                    const bloqueado = isDemo && detetarDeporte(d.nombre) !== 'futbol';
                    return (
                        <TouchableOpacity
                            key={d.id}
                            style={[styles.chip, activo && { backgroundColor: accent, borderColor: accent }, bloqueado && { opacity: 0.5 }]}
                            onPress={() => {
                                if (bloqueado) {
                                    Alert.alert('Funcionalidad Pro', 'Actualiza a Pro para usar este deporte.');
                                    return;
                                }
                                setFiltroDeporte(String(d.id));
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]} numberOfLines={1}>
                                {iconoDeporte(d.nombre)} {d.nombre}{bloqueado ? ' (Pro)' : ''}
                            </Text>
                            <View style={[styles.chipContador, activo && { backgroundColor: 'rgba(0,0,0,0.18)' }]}>
                                <Text style={[styles.chipContadorTexto, activo && styles.chipContadorTextoActivo]}>
                                    {cantidad}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <FlatList
                data={jugadoresFiltrados}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.columna}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <View style={styles.vacio}>
                        <Text style={styles.vacioEmoji}>🔎</Text>
                        <Text style={styles.vacioTexto}>
                            {jugadores.length === 0 ? 'Aún no hay jugadores' : 'Ningún jugador coincide con la búsqueda'}
                        </Text>
                    </View>
                }
                renderItem={({ item }) => {
                    const accent = accentPorDeporte[item.deporte_id] || '#5b6478';
                    const colorN = colorNivel(item.nivel);
                    return (
                        <TouchableOpacity
                            style={[styles.card, { borderColor: accent + '33' }]}
                            activeOpacity={0.85}
                            onPress={() => abrirDetalle(item)}
                        >
                            <View style={[styles.cardTopo, { backgroundColor: accent }]} />

                            <TouchableOpacity
                                style={styles.botonCerrar}
                                onPress={() => eliminar(item.id, item.nombre)}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Text style={styles.botonCerrarTexto}>✕</Text>
                            </TouchableOpacity>

                            <View style={[styles.avatar, { backgroundColor: accent + '22', borderColor: accent }]}>
                                <Text style={[styles.avatarTexto, { color: accent }]}>{inicialesNombre(item.nombre)}</Text>
                            </View>

                            <View style={styles.nombreFila}>
                                <Text style={styles.nombreJugador} numberOfLines={1}>{item.nombre}</Text>
                                {!!item.posicion && (
                                    <View style={styles.posBadge}>
                                        <Text style={styles.posBadgeTexto}>{inicialesPosicion(item.posicion)}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.stat}>
                                <Text style={styles.statIcono}>{iconoDeporte(item.deporte_nombre)}</Text>
                                <Text style={styles.statTexto} numberOfLines={1}>
                                    {item.deporte_nombre || 'Sin deporte'}
                                </Text>
                            </View>

                            <View style={[styles.nivelPill, { backgroundColor: colorNivelDim(item.nivel) }]}>
                                <Text style={[styles.nivelPillTexto, { color: colorN }]}>{item.nivel}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* Modal de crear / editar */}
            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <SafeAreaView style={styles.modalSafe}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitulo}>{editandoId ? 'Editar jugador' : 'Nuevo jugador'}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.cerrarModal}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView contentContainerStyle={styles.modalBody} keyboardShouldPersistTaps="handled">

                                <Text style={styles.label}>Nombre *</Text>
                                <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#888" value={nombre} onChangeText={setNombre} />

                                <Text style={styles.label}>Teléfono *</Text>
                                <TextInput style={styles.input} placeholder="Teléfono" placeholderTextColor="#888" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

                                <Text style={styles.label}>Correo *</Text>
                                <TextInput style={styles.input} placeholder="Correo" placeholderTextColor="#888" value={mail} onChangeText={setMail} autoCapitalize="none" keyboardType="email-address" />

                                <Text style={styles.label}>Deporte</Text>
                                <View style={styles.chipsContainer}>
                                    {deportes.map(d => {
                                        const activo = String(d.id) === deporteId;
                                        const bloqueado = isDemo && detetarDeporte(d.nombre) !== 'futbol';
                                        return (
                                            <TouchableOpacity
                                                key={d.id}
                                                style={[styles.chip, activo && styles.chipActivoTodos, bloqueado && { opacity: 0.5 }]}
                                                onPress={() => {
                                                    if (bloqueado) {
                                                        Alert.alert('Funcionalidad Pro', 'Actualiza a Pro para usar este deporte.');
                                                        return;
                                                    }
                                                    setDeporteId(String(d.id)); setPosicion('');
                                                }}
                                            >
                                                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{iconoDeporte(d.nombre)} {d.nombre}{bloqueado ? ' (Pro)' : ''}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                <Text style={styles.label}>Posición *</Text>
                                {posiciones.length === 0 ? (
                                    <Text style={styles.chipsVacio}>
                                        {deporteId ? 'Sin posiciones para este deporte' : 'Elige un deporte primero'}
                                    </Text>
                                ) : (
                                    <View style={styles.chipsContainer}>
                                        {posiciones.map(p => {
                                            const activo = p.nombre === posicion;
                                            return (
                                                <TouchableOpacity
                                                    key={p.id}
                                                    style={[styles.chip, activo && styles.chipActivoTodos]}
                                                    onPress={() => setPosicion(p.nombre)}
                                                >
                                                    <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{p.nombre}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                )}

                                <Text style={styles.label}>Nivel *</Text>
                                <View style={styles.chipsContainer}>
                                    {NIVELES.map(n => {
                                        const activo = n === nivel;
                                        return (
                                            <TouchableOpacity
                                                key={n}
                                                style={[styles.chip, activo && styles.chipActivoTodos]}
                                                onPress={() => setNivel(n)}
                                            >
                                                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{n}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                            </ScrollView>
                        </TouchableWithoutFeedback>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.boton} onPress={guardar}>
                                <Text style={styles.botonTexto}>💾 Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonSecundario} onPress={() => setModalVisible(false)}>
                                <Text style={styles.botonTextoClaro}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>

            {/* Modal de detalles */}
            <Modal visible={detalleVisible} animationType="slide" presentationStyle="pageSheet">
                <SafeAreaView style={styles.modalSafe}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitulo}>Detalles</Text>
                        <TouchableOpacity onPress={() => setDetalleVisible(false)}>
                            <Text style={styles.cerrarModal}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {jugadorSeleccionado && (
                        <ScrollView contentContainerStyle={styles.modalBody}>
                            <Text style={styles.detalleNombre}>{jugadorSeleccionado.nombre}</Text>

                            <View style={styles.detalleFila}>
                                <Text style={styles.detalleLabel}>📞 Teléfono</Text>
                                <Text style={styles.detalleValor}>{jugadorSeleccionado.telefono || '—'}</Text>
                            </View>
                            <View style={styles.detalleFila}>
                                <Text style={styles.detalleLabel}>✉️ Correo</Text>
                                <Text style={styles.detalleValor}>{jugadorSeleccionado.mail || '—'}</Text>
                            </View>
                            <View style={styles.detalleFila}>
                                <Text style={styles.detalleLabel}>⚽ Deporte</Text>
                                <Text style={styles.detalleValor}>{jugadorSeleccionado.deporte_nombre || '—'}</Text>
                            </View>
                            <View style={styles.detalleFila}>
                                <Text style={styles.detalleLabel}>📍 Posición</Text>
                                <Text style={styles.detalleValor}>{jugadorSeleccionado.posicion || '—'}</Text>
                            </View>
                            <View style={styles.detalleFila}>
                                <Text style={styles.detalleLabel}>⭐ Nivel</Text>
                                <Text style={styles.detalleValor}>{jugadorSeleccionado.nivel}</Text>
                            </View>

                            <View style={styles.detalleBotones}>
                                <TouchableOpacity
                                    style={styles.boton}
                                    onPress={() => { setDetalleVisible(false); abrirEditar(jugadorSeleccionado); }}
                                >
                                    <Text style={styles.botonTexto}>✏️ Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.botonEliminar}
                                    onPress={() => { setDetalleVisible(false); eliminar(jugadorSeleccionado.id, jugadorSeleccionado.nombre); }}
                                >
                                    <Text style={styles.botonTextoClaro}>🗑️ Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f1115', padding: 16 },

    cabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    subtitulo: { fontSize: 12, color: '#5b6478', marginTop: 2 },

    buscadorWrap: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#1c1f26', borderRadius: 10,
        paddingHorizontal: 12, paddingVertical: 10,
        marginBottom: 12, gap: 8,
    },
    buscadorIcono: { fontSize: 14 },
    buscadorInput: { flex: 1, color: '#fff', fontSize: 14, padding: 0 },
    buscadorLimpiar: { color: '#5b6478', fontSize: 15, fontWeight: 'bold', paddingHorizontal: 4 },

    // Filtros em quebra de linha — nunca ficam escondidos fora do ecrã
    filtrosFila: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 14,
    },

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
    botonCerrar: {
        position: 'absolute',
        top: 10, right: 10,
        width: 22, height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(255,255,255,0.06)',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
    },
    botonCerrarTexto: { color: '#ff4d6d', fontSize: 11, fontWeight: '800' },

    avatar: {
        width: 42, height: 42, borderRadius: 21,
        borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 10,
    },
    avatarTexto: { fontSize: 15, fontWeight: '800' },

    nombreFila: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
    nombreJugador: { color: '#fff', fontSize: 14.5, fontWeight: '700', flexShrink: 1 },
    posBadge: { backgroundColor: '#11141a', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1 },
    posBadgeTexto: { color: '#00c2ff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

    stat: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: '#11141a', borderRadius: 8,
        paddingVertical: 7, paddingHorizontal: 8,
        marginBottom: 10,
    },
    statIcono: { fontSize: 12 },
    statTexto: { color: '#8a9bbf', fontSize: 11.5, flexShrink: 1 },

    nivelPill: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
    nivelPillTexto: { fontSize: 11, fontWeight: '700' },

    botonPeq: { backgroundColor: '#00c2ff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
    botonTexto: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
    botonTextoClaro: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },

    input: {
        backgroundColor: '#1c1f26', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8,
        borderWidth: 1.5, borderColor: '#00c2ff',
    },
    label: { color: '#999', marginTop: 8, marginBottom: 4 },
    chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 9, paddingHorizontal: 14, borderRadius: 20,
        backgroundColor: '#1c1f26', borderWidth: 1.5, borderColor: '#2a2f3a',
    },
    chipActivoTodos: { backgroundColor: '#00c2ff', borderColor: '#00c2ff' },
    chipTexto: { color: '#ccc', fontWeight: '600', fontSize: 13 },
    chipTextoActivo: { color: '#0f1115' },
    chipsVacio: { color: '#666', fontStyle: 'italic', marginBottom: 8 },

    chipContador: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
        minWidth: 20,
        alignItems: 'center',
    },
    chipContadorActivo: { backgroundColor: 'rgba(0,0,0,0.18)' },
    chipContadorTexto: { color: '#ccc', fontSize: 11, fontWeight: '800' },
    chipContadorTextoActivo: { color: '#0f1115' },

    boton: { backgroundColor: '#00c2ff', padding: 14, borderRadius: 8, marginTop: 16 },
    botonSecundario: { backgroundColor: '#333', padding: 14, borderRadius: 8, marginTop: 8 },

    modalSafe: { flex: 1, backgroundColor: '#0f1115' },
    modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 16,
        borderBottomWidth: 1, borderBottomColor: '#1c1f26',
    },
    modalTitulo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    cerrarModal: { color: '#999', fontSize: 20 },
    modalBody: { padding: 20, paddingBottom: 40 },
    modalFooter: { padding: 20, borderTopWidth: 1, borderTopColor: '#1c1f26' },
    botonEliminar: { backgroundColor: '#3a1c1c', padding: 14, borderRadius: 8, marginTop: 10 },
    detalleNombre: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    detalleFila: {
        flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: '#1c1f26', padding: 14, borderRadius: 10, marginBottom: 8,
    },
    detalleLabel: { color: '#999' },
    detalleValor: { color: '#fff', fontWeight: '600' },
    detalleBotones: { marginTop: 20 },

    vacio: { alignItems: 'center', paddingVertical: 60 },
    vacioEmoji: { fontSize: 34, marginBottom: 10 },
    vacioTexto: { color: '#5b6478', fontSize: 13, fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 30 },
});