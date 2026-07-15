import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
    Alert, Modal, Pressable, Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SMS from 'expo-sms';
import { apiFetch } from '../api/client';
import { generarEquiposBalanceados } from '../utils/teamBalancer';
import { obtenerFormacion, generarEquiposConFormacion, listarFormaciones } from '../utils/formaciones';
import { detetarDeporte } from '../utils/posicionamento';
import FormationPitch from '../components/fields/FormationPitch';
import { ACCENTS, iconoDeporte } from '../utils/deporteVisual';
import usePlano from '../hooks/usePlano';
import ProBadge from '../components/ProBadge';

const { width: ANCHO_PANTALLA, height: ALTURA_PANTALLA } = Dimensions.get('window');
const ALTURA_CAMPO_DISPONIVEL = ALTURA_PANTALLA * 0.46;

export default function EquiposScreen() {
    const { isDemo } = usePlano();
    const [deportes, setDeportes] = useState([]);
    const [deporteId, setDeporteId] = useState('');
    const [jugadoresDeporte, setJugadoresDeporte] = useState([]);
    const [posicionesDeporte, setPosicionesDeporte] = useState([]);
    const [numEquipos, setNumEquipos] = useState('2');
    const [equipos, setEquipos] = useState([]);
    const [campoVisible, setCampoVisible] = useState(false);
    const [equipoActivo, setEquipoActivo] = useState(0);
    const [guardando, setGuardando] = useState(false);
    const [notificacionVisible, setNotificacionVisible] = useState(false);
    const [fechaPartida, setFechaPartida] = useState('');
    const [horaPartida, setHoraPartida] = useState('');
    const [localPartida, setLocalPartida] = useState('');
    const [notificando, setNotificando] = useState(false);

    const scrollRef = useRef(null);
    const deporteSeleccionado = deportes.find(d => String(d.id) === deporteId);

    const tipoSeleccionado = deporteSeleccionado ? detetarDeporte(deporteSeleccionado.nombre) : null;
    const formacionSeleccionada = deporteSeleccionado
        ? obtenerFormacion(tipoSeleccionado, deporteSeleccionado.num_jugadores)
        : null; // fallback
    const [selectedFormacion, setSelectedFormacion] = useState(null);

    const formacionesDisponibles = deporteSeleccionado ? listarFormaciones(tipoSeleccionado, deporteSeleccionado.num_jugadores) : [];
    const formacionAUsar = formacionesDisponibles.length > 0 ? selectedFormacion : formacionSeleccionada;
    const totalPorEquipoFormacion = formacionAUsar
        ? formacionAUsar.postos.reduce((s, p) => s + p.cantidad, 0)
        : null;

    // Determine whether the "Generar equipos" button must be disabled:
    // - If the sport offers fixed formations, a formation must be selected
    // - There must be enough players for the requested number of teams
    const nEquiposSolicitados = Math.max(2, parseInt(numEquipos, 10) || 2);
    let generarDisabled = false;
    if (formacionesDisponibles.length > 0 && !selectedFormacion) {
        generarDisabled = true;
    } else if (formacionAUsar) {
        const necesarios = totalPorEquipoFormacion * nEquiposSolicitados;
        if (jugadoresDeporte.length < necesarios) generarDisabled = true;
    } else {
        if (jugadoresDeporte.length < nEquiposSolicitados) generarDisabled = true;
    }

    const cargarDeportes = useCallback(async () => {
        const res = await apiFetch('/deportes.php');
        if (res && res.ok) setDeportes(await res.json());
    }, []);

    useFocusEffect(useCallback(() => { cargarDeportes(); }, [cargarDeportes]));

    useEffect(() => {
        (async () => {
            if (!deporteId) { setJugadoresDeporte([]); setPosicionesDeporte([]); return; }
            const [resJ, resP] = await Promise.all([
                apiFetch(`/jugadores.php?deporte_id=${deporteId}`),
                apiFetch(`/posiciones.php?deporte_id=${deporteId}`),
            ]);
            setJugadoresDeporte(resJ && resJ.ok ? await resJ.json() : []);
            setPosicionesDeporte(resP && resP.ok ? await resP.json() : []);
        })();
    }, [deporteId]);

    // Reset selected formation when sport changes
    useEffect(() => {
        setSelectedFormacion(null);
    }, [deporteId]);

    function generar() {
        if (!deporteId) { Alert.alert('Atención', 'Selecciona un deporte'); return; }
        if (jugadoresDeporte.length === 0) { Alert.alert('Atención', 'No hay jugadores suficientes para generar equipos en esta modalidad.'); return; }

        const n = Math.max(2, parseInt(numEquipos, 10) || 2);
        if (isDemo && n > 2) {
            Alert.alert('Límite demo', 'Demo: máximo 2 equipos. Actualiza a Pro para equipos ilimitados.');
            return;
        }

        // If the sport has available fixed formations, require the user to select one
        if (formacionesDisponibles.length > 0 && !selectedFormacion) {
            Alert.alert('Atención', 'Elige primero una formación antes de generar los equipos.');
            return;
        }

        if (formacionAUsar) {
            const necesarios = totalPorEquipoFormacion * n;
            if (jugadoresDeporte.length < necesarios) {
                Alert.alert('Atención', 'No hay jugadores suficientes para generar equipos en esta modalidad.');
                return;
            }

            const { equipos: eq, faltantes } = generarEquiposConFormacion(jugadoresDeporte, n, formacionAUsar);
            if (faltantes.length > 0) {
                Alert.alert('Formación incompleta', faltantes.join('\n'));
            }
            if (eq.every(e => e.length === 0)) return;

            setEquipos(eq);
            setEquipoActivo(0);
            setCampoVisible(true);
            return;
        }

        // Deporte sin formación fija definida: reparto equilibrado genérico
        if (n > jugadoresDeporte.length) {
            Alert.alert('Atención', 'No hay jugadores suficientes para generar equipos en esta modalidad.');
            return;
        }
        setEquipos(generarEquiposBalanceados(jugadoresDeporte, n));
        setEquipoActivo(0);
        setCampoVisible(true);
    }

    function abrirCampo() {
        if (equipos.length === 0) return;
        setCampoVisible(true);
    }

    function cerrarCampo() {
        setCampoVisible(false);
    }

    function irAEquipo(i) {
        setEquipoActivo(i);
        scrollRef.current?.scrollTo({ x: i * ANCHO_PANTALLA, animated: true });
    }

    function onScrollFin(e) {
        const i = Math.round(e.nativeEvent.contentOffset.x / ANCHO_PANTALLA);
        setEquipoActivo(i);
    }

    async function guardarPartido() {
        if (equipos.length === 0) return;
        setGuardando(true);
        const body = {
            deporte_id: parseInt(deporteId, 10),
            numero_equipos: equipos.length,
            equipos: equipos.map((eq, i) => ({
                nombre_equipo: `Equipo ${i + 1}`,
                puntuacion: null,
                jugadores: eq.map(j => ({ id: j.id, nombre: j.nombre, posicion: j.posicion })),
            })),
        };

        const res = await apiFetch('/partidos.php', { method: 'POST', body: JSON.stringify(body) });
        setGuardando(false);
        if (res && res.ok) {
            Alert.alert('Listo', 'Equipo guardado en el historial');
        } else {
            Alert.alert('Error', 'No se pudo guardar el partido');
        }
    }

    async function verificarDisponibilidadSMS() {
        const disponible = await SMS.isAvailableAsync();
        return disponible;
    }

    function limpiarTelefono(telefono) {
        if (!telefono) return null;
        const limpio = String(telefono).trim().replace(/[^\d+]/g, '');
        if (limpio.length < 8) return null;
        return limpio;
    }

    function obtenerNumerosEquipo(equipoJugadores) {
        const numeros = equipoJugadores
            .map(j => limpiarTelefono(j.telefono))
            .filter(Boolean);
        return [...new Set(numeros)];
    }

    function construirMensajeSMS(numEquipo, equipoJugadores) {
        const nombres = equipoJugadores.map(j => j.nombre).join(', ');
        return `DiverSport - Partida\n\nEstás en el Equipo ${numEquipo} con: ${nombres}\n\n📅 ${fechaPartida}\n🕐 ${horaPartida}\n📍 ${localPartida}`;
    }

    async function enviarNotificaciones() {
        if (!fechaPartida || !horaPartida || !localPartida) {
            Alert.alert('Atención', 'Por favor completa todos los campos');
            return;
        }

        setNotificando(true);
        setCampoVisible(false);

        try {
            const smsDisponible = await verificarDisponibilidadSMS();
            if (!smsDisponible) {
                Alert.alert('Error', 'SMS no está disponible en este dispositivo');
                return;
            }

            let equiposEnviados = 0;
            let equiposCancelados = 0;
            const equiposSinNumeros = [];

            for (let i = 0; i < equipos.length; i++) {
                const equipoJugadores = equipos[i];
                const numeros = obtenerNumerosEquipo(equipoJugadores);

                if (numeros.length === 0) {
                    equiposSinNumeros.push(i + 1);
                    continue;
                }

                const mensaje = construirMensajeSMS(i + 1, equipoJugadores);
                const { result } = await SMS.sendSMSAsync(numeros, mensaje);

                if (result === 'cancelled') {
                    equiposCancelados++;
                } else {
                    equiposEnviados++;
                }
            }

            const partes = [];
            if (equiposEnviados > 0) partes.push(`${equiposEnviados} equipo(s) notificado(s)`);
            if (equiposCancelados > 0) partes.push(`${equiposCancelados} cancelado(s)`);
            if (equiposSinNumeros.length > 0) partes.push(`Equipo(s) ${equiposSinNumeros.join(', ')} sin teléfonos válidos`);

            Alert.alert('Listo', partes.length ? partes.join('\n') : 'No se envió ningún mensaje');

            setNotificacionVisible(false);
            setCampoVisible(true);
            setFechaPartida('');
            setHoraPartida('');
            setLocalPartida('');
        } catch (error) {
            console.error('Error en proceso de notificación:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar notificar');
        } finally {
            setNotificando(false);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContenido}>
                <Text style={styles.titulo}>Generar Equipos</Text>

                <Text style={styles.label}>Deporte</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsFila}
                >
                    {deportes.map((d, i) => {
                        const activo = String(d.id) === deporteId;
                        const accent = ACCENTS[i % ACCENTS.length];
                        const bloqueado = isDemo && detetarDeporte(d.nombre) !== 'futbol';
                        return (
                            <TouchableOpacity
                                key={d.id}
                                style={[
                                    styles.chip,
                                    activo && { backgroundColor: accent, borderColor: accent },
                                    bloqueado && { opacity: 0.5 },
                                ]}
                                onPress={() => {
                                    if (bloqueado) {
                                        Alert.alert('Funcionalidad Pro', 'Actualiza a Pro para usar este deporte.');
                                        return;
                                    }
                                    setDeporteId(String(d.id));
                                }}
                            >
                                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                                    {iconoDeporte(d.nombre)} {d.nombre}{bloqueado ? ' (Pro)' : ''}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                {deportes.length === 0 && (
                    <Text style={styles.hint}>Aún no hay deportes creados</Text>
                )}

                {/* Card de formación — a peça que faltava: mostra sempre, de
                    forma clara, que composição exata vai ser usada. */}
                {deporteSeleccionado && (
                    <View style={styles.formacionCard}>
                        <View style={styles.formacionCabecera}>
                            <Text style={styles.formacionIcono}>{iconoDeporte(deporteSeleccionado.nombre)}</Text>
                            <Text style={styles.formacionNombre}>{deporteSeleccionado.nombre}</Text>
                        </View>
                        {formacionesDisponibles && formacionesDisponibles.length > 0 ? (
                            <>
                                <Text style={styles.formacionEtiqueta}>Elige una formación:</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 8 }}>
                                    {formacionesDisponibles.map((f, i) => {
                                        const activo = selectedFormacion && selectedFormacion.etiqueta === f.etiqueta;
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                style={[styles.chip, activo && { backgroundColor: '#00c2ff', borderColor: '#00c2ff' }]}
                                                onPress={() => setSelectedFormacion(f)}
                                            >
                                                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{f.etiqueta}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                                {selectedFormacion ? (
                                    <Text style={styles.formacionDetalle}>{totalPorEquipoFormacion} jugadores por equipo · {selectedFormacion.postos.map(p => `${p.cantidad} ${p.etiqueta}`).join(', ')}</Text>
                                ) : (
                                    <Text style={[styles.formacionDetalle, { marginTop: 8 }]}>Elige una formación antes de generar los equipos.</Text>
                                )}
                            </>
                        ) : (
                            <Text style={styles.formacionDetalle}>
                                Este deporte no tiene formación fija — reparto equilibrado por nivel.
                            </Text>
                        )}
                    </View>
                )}

                <Text style={styles.label}>Número de equipos</Text>
                <TextInput style={styles.input} value={numEquipos} onChangeText={setNumEquipos} keyboardType="numeric" />

                <Text style={styles.hint}>Jugadores disponibles para este deporte: {jugadoresDeporte.length}</Text>

                <TouchableOpacity style={[styles.boton, generarDisabled && styles.botonDeshabilitado]} onPress={generar} activeOpacity={0.85} disabled={generarDisabled}>
                    <Text style={styles.botonTexto}>⚡ Generar equipos</Text>
                </TouchableOpacity>

                {equipos.length > 0 && !campoVisible && (
                    <TouchableOpacity style={styles.resumen} onPress={abrirCampo} activeOpacity={0.85}>
                        <Text style={styles.resumenTexto}>✅ {equipos.length} equipos generados — toca para ver el campo</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {equipos.length > 0 && !campoVisible && (
                <TouchableOpacity style={styles.fab} onPress={abrirCampo} activeOpacity={0.85}>
                    <Text style={styles.fabTexto}>🏟️  Revisar equipo</Text>
                </TouchableOpacity>
            )}

            <Modal visible={campoVisible} animationType="fade" transparent onRequestClose={cerrarCampo}>
                <Pressable style={styles.backdrop} onPress={cerrarCampo}>
                    <Pressable style={styles.modalCard} onPress={() => {}}>
                        <View style={styles.modalCabecera}>
                            <Text style={styles.modalTitulo}>Formación</Text>
                            <TouchableOpacity onPress={cerrarCampo} style={styles.botonCerrar}>
                                <Text style={styles.botonCerrarTexto}>✕ Cerrar</Text>
                            </TouchableOpacity>
                        </View>

                        {equipos.length > 1 && (
                            <View style={styles.tabs}>
                                {equipos.map((_, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={[styles.tab, equipoActivo === i && styles.tabActiva]}
                                        onPress={() => irAEquipo(i)}
                                    >
                                        <Text style={[styles.tabTexto, equipoActivo === i && styles.tabTextoActiva]}>
                                            Equipo {i + 1}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <ScrollView
                            ref={scrollRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={onScrollFin}
                            style={{ width: ANCHO_PANTALLA - 24 }}
                        >
                            {equipos.map((eq, i) => (
                                <ScrollView key={i} style={{ width: ANCHO_PANTALLA - 24 }} contentContainerStyle={styles.paginaCampo}>
                                    <Text style={styles.nombreEquipo}>Equipo {i + 1} · {eq.length} jugadores</Text>
                                    <FormationPitch
                                        equipo={eq}
                                        posicionesInfo={posicionesDeporte}
                                        deporte={deporteSeleccionado?.nombre}
                                        formacion={formacionAUsar}
                                        maxHeight={ALTURA_CAMPO_DISPONIVEL}
                                        maxWidth={ANCHO_PANTALLA - 24}
                                    />
                                </ScrollView>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.botonGuardar, isDemo && { opacity: 0.5 }]}
                            onPress={() => {
                                if (isDemo) {
                                    Alert.alert('Funcionalidad Pro', 'Funcionalidad Pro. Actualiza para guardar el historial de partidas.');
                                    return;
                                }
                                guardarPartido();
                            }}
                            disabled={guardando}
                            activeOpacity={0.85}
                        >
                            <View style={styles.botonTextoRow}>
                                <Text style={styles.botonTextoClaro}>{guardando ? 'Guardando…' : '💾 Guardar en historial'}</Text>
                                {isDemo && <ProBadge />}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botonNotificar, isDemo && { opacity: 0.5 }]}
                            onPress={() => {
                                if (isDemo) {
                                    Alert.alert('Funcionalidad Pro', 'Funcionalidad Pro. Actualiza para enviar notificaciones a los jugadores.');
                                    return;
                                }
                                setCampoVisible(false); setNotificacionVisible(true);
                            }}
                            disabled={guardando}
                            activeOpacity={0.85}
                        >
                            <View style={styles.botonTextoRow}>
                                <Text style={styles.botonTextoClaro}>📱 Notificar Jugadores</Text>
                                {isDemo && <ProBadge />}
                            </View>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal visible={notificacionVisible} animationType="fade" transparent onRequestClose={() => setNotificacionVisible(false)}>
<Pressable style={styles.backdrop} onPress={() => { setNotificacionVisible(false); setCampoVisible(true); }}>                    <Pressable style={styles.modalCard} onPress={() => {}}>
                        <View style={styles.modalCabecera}>
                            <Text style={styles.modalTitulo}>Notificar Jugadores</Text>
<TouchableOpacity onPress={() => { setNotificacionVisible(false); setCampoVisible(true); }} style={styles.botonCerrar}>                                <Text style={styles.botonCerrarTexto}>✕ Cerrar</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                            <Text style={styles.label}>Fecha de la partida</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                placeholderTextColor="#666"
                                value={fechaPartida}
                                onChangeText={setFechaPartida}
                            />

                            <Text style={styles.label}>Hora de la partida</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="HH:MM"
                                placeholderTextColor="#666"
                                value={horaPartida}
                                onChangeText={setHoraPartida}
                            />

                            <Text style={styles.label}>Local de la partida</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: Polideportivo Municipal"
                                placeholderTextColor="#666"
                                value={localPartida}
                                onChangeText={setLocalPartida}
                            />

                            <TouchableOpacity
                                style={[styles.botonNotificar, notificando && styles.botonDeshabilitado]}
                                onPress={enviarNotificaciones}
                                disabled={notificando}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.botonTextoClaro}>
                                    {notificando ? 'Enviando notificaciones…' : `📨 Enviar SMS a ${equipos.length} equipo(s) (${equipos.flat().length} jugadores)`}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f1115' },
    scrollContenido: { padding: 16, paddingBottom: 100 },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
    label: { color: '#999', marginTop: 8, marginBottom: 4 },
    input: { backgroundColor: '#1c1f26', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
    hint: { color: '#999', marginBottom: 12 },
    boton: { backgroundColor: '#00c2ff', padding: 14, borderRadius: 8, marginBottom: 16 },
    botonTexto: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
    botonTextoClaro: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
    resumen: { backgroundColor: '#132a24', borderWidth: 1, borderColor: '#00e676', borderRadius: 10, padding: 14, marginBottom: 8 },
    resumenTexto: { color: '#00e676', fontWeight: '700', textAlign: 'center' },

    chipsFila: { gap: 8, paddingBottom: 4, paddingRight: 8 },
    chip: {
        paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
        backgroundColor: '#1c1f26', borderWidth: 1.5, borderColor: '#2a2f3a',
    },
    chipTexto: { color: '#ccc', fontWeight: '600', fontSize: 13 },
    chipTextoActivo: { color: '#0f1115' },

    formacionCard: {
        backgroundColor: '#1c1f26',
        borderRadius: 12,
        padding: 14,
        marginTop: 14,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#2a2f3a',
    },
    formacionCabecera: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    formacionIcono: { fontSize: 18 },
    formacionNombre: { color: '#fff', fontWeight: '800', fontSize: 15 },
    formacionEtiqueta: { color: '#8a9bbf', fontSize: 13 },
    formacionEtiquetaDestaque: { color: '#00e676', fontWeight: '800' },
    formacionDetalle: { color: '#8a9bbf', fontSize: 12, marginTop: 4 },

    fab: {
        position: 'absolute',
        bottom: 22,
        left: 20,
        right: 20,
        backgroundColor: '#00c2ff',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#00c2ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    fabTexto: { color: '#000', fontWeight: '800', fontSize: 15 },

    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'center', alignItems: 'center', padding: 12 },
    modalCard: {
        width: '100%', height: '94%',
        backgroundColor: '#0f1115',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#232833',
        paddingTop: 14,
    },
    modalCabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
    modalTitulo: { color: '#fff', fontSize: 18, fontWeight: '800' },
    botonCerrar: { backgroundColor: '#1c1f26', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    botonCerrarTexto: { color: '#ff6b6b', fontWeight: '700', fontSize: 12 },

    tabs: { flexDirection: 'row', paddingHorizontal: 12, gap: 8, marginBottom: 10 },
    tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#1c1f26' },
    tabActiva: { backgroundColor: '#00c2ff' },
    tabTexto: { color: '#999', fontWeight: '700', fontSize: 12 },
    tabTextoActiva: { color: '#000' },

    paginaCampo: { paddingHorizontal: 12, paddingBottom: 12, alignItems: 'center' },
    nombreEquipo: { color: '#00c2ff', fontWeight: '800', fontSize: 14, textAlign: 'center', marginBottom: 8 },

    botonGuardar: { backgroundColor: '#00e676', padding: 14, marginHorizontal: 12, marginVertical: 12, borderRadius: 10 },
    botonNotificar: { backgroundColor: '#ff9800', padding: 14, marginHorizontal: 12, marginVertical: 8, borderRadius: 10 },
    botonDeshabilitado: { opacity: 0.5 },
    botonTextoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' },
});