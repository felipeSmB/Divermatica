import React, { useCallback, useEffect, useState } from 'react';
import {
    View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView,
    SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiFetch } from '../api/client';
import { colorNivel, colorNivelDim, inicialesPosicion } from '../utils/nivel';



const NIVELES = ['Medio', 'Bueno', 'Muy Bueno'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function JugadoresScreen() {
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

    function abrirNuevo() {
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

    function eliminar(id, nombre) {
        Alert.alert(
            'Eliminar jugador',
            `¿Seguro que quieres eliminar a ${nombre}?`,
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
                <Text style={styles.titulo}>Jugadores</Text>
                <TouchableOpacity style={styles.botonPeq} onPress={abrirNuevo}>
                    <Text style={styles.botonTexto}>+ Nuevo</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={jugadores}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                    const color = colorNivel(item.nivel);
                    return (
                        <TouchableOpacity
                            style={[styles.item, { borderLeftColor: color }]}
                            onPress={() => abrirDetalle(item)}
                        >

                            <View style={styles.itemInfo}>
                                <View style={styles.itemCabecera}>
                                    <Text style={styles.itemNombre}>{item.nombre}</Text>
                                    {!!item.posicion && (
                                        <View style={styles.posBadge}>
                                            <Text style={styles.posBadgeTexto}>{inicialesPosicion(item.posicion)}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.itemSub}>{item.deporte_nombre || 'Sin deporte'} · {item.posicion || 'Sin posición'}</Text>
                                <View style={[styles.nivelPill, { backgroundColor: colorNivelDim(item.nivel) }]}>
                                    <Text style={[styles.nivelPillTexto, { color }]}>{item.nivel}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => eliminar(item.id, item.nombre)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Text style={styles.eliminar}>Eliminar</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
            />

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
                                        return (
                                            <TouchableOpacity
                                                key={d.id}
                                                style={[styles.chip, activo && styles.chipActivo]}
                                                onPress={() => { setDeporteId(String(d.id)); setPosicion(''); }}
                                            >
                                                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{d.nombre}</Text>
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
                                                    style={[styles.chip, activo && styles.chipActivo]}
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
                                                style={[styles.chip, activo && styles.chipActivo]}
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
    cabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    item: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#1c1f26', padding: 12, borderRadius: 8, marginBottom: 8,
        borderLeftWidth: 4,
    },
    itemInfo: { flex: 1, marginRight: 8 },
    itemCabecera: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    itemNombre: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    itemSub: { color: '#999', marginTop: 2 },
    posBadge: { backgroundColor: '#2a2f3a', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1 },
    posBadgeTexto: { color: '#00c2ff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
    nivelPill: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginTop: 6 },
    nivelPillTexto: { fontSize: 11, fontWeight: '700' },
    eliminar: { color: '#ff4d4d' },
    botonPeq: { backgroundColor: '#00c2ff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
    botonTexto: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
    botonTextoClaro: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
    modal: { flex: 1, backgroundColor: '#0f1115', padding: 20 },
    input: { backgroundColor: '#1c1f26', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1.5, borderColor: '#00c2ff' },    label: { color: '#999', marginTop: 8, marginBottom: 4 },
    picker: { backgroundColor: '#1c1f26', color: '#fff', marginBottom: 8 },
    chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
    chip: {
        paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
        backgroundColor: '#1c1f26', borderWidth: 1.5, borderColor: '#2a2f3a',
    },
    chipActivo: { backgroundColor: '#00c2ff', borderColor: '#00c2ff' },
    chipTexto: { color: '#ccc', fontWeight: '600', fontSize: 13 },
    chipTextoActivo: { color: '#0f1115' },
    chipsVacio: { color: '#666', fontStyle: 'italic', marginBottom: 8 },

    
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
});