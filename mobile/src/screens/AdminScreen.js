import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colorNivel } from '../utils/nivel';
import {
    alterarBloqueioUsuario,
    alterarPlanoUsuario,
    alterarRoleUsuario,
    eliminarUsuarioAdmin,
    listarLogsAdmin,
    listarUsuariosAdmin,
    obtenerEstadisticasAdmin,
} from '../api/admin';

const SECTIONS = ['overview', 'users', 'logs'];
const SECTION_LABELS = {
    overview: 'General',
    users: 'Utilizadores',
    logs: 'Logs',
};

function formatFecha(fecha) {
    if (!fecha) return '—';
    const date = new Date(fecha);
    if (Number.isNaN(date.getTime())) return fecha;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatFechaHora(fecha) {
    if (!fecha) return '—';
    const date = new Date(fecha);
    if (Number.isNaN(date.getTime())) return fecha;
    return date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminScreen() {
    const [seccionActiva, setSeccionActiva] = useState('overview');
    const [stats, setStats] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [logs, setLogs] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [usernameFiltro, setUsernameFiltro] = useState('');
    const [buscaUsuario, setBuscaUsuario] = useState('');

    const cargarStats = useCallback(async () => {
        try {
            const data = await obtenerEstadisticasAdmin();
            setStats(data);
        } catch (error) {
            Alert.alert('Error', error.message || 'No se pudieron cargar las estadísticas');
        }
    }, []);

    const cargarUsuarios = useCallback(async () => {
        try {
            const data = await listarUsuariosAdmin();
            setUsuarios(data?.usuarios || data || []);
        } catch (error) {
            Alert.alert('Error', error.message || 'No se pudieron cargar los usuarios');
        }
    }, []);

    const cargarLogs = useCallback(async () => {
        try {
            const data = await listarLogsAdmin({ tipo: tipoFiltro || undefined, username: usernameFiltro || undefined });
            setLogs(data?.logs || []);
        } catch (error) {
            Alert.alert('Error', error.message || 'No se pudieron cargar los logs');
        }
    }, [tipoFiltro, usernameFiltro]);

    useFocusEffect(useCallback(() => {
        if (seccionActiva === 'overview') {
            cargarStats();
        }
        if (seccionActiva === 'users') {
            cargarUsuarios();
        }
        if (seccionActiva === 'logs') {
            cargarLogs();
        }
    }, [cargarStats, cargarUsuarios, cargarLogs, seccionActiva]));

    async function confirmarAccion(titulo, mensaje, accion) {
        Alert.alert(titulo, mensaje, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Aceptar', onPress: accion },
        ]);
    }

    async function onToggleRole(usuario) {
        const siguienteRole = usuario.role === 'admin' ? 'user' : 'admin';
        confirmarAccion(
            'Confirmar',
            `¿Cambiar el rol de ${usuario.username} a ${siguienteRole === 'admin' ? 'Admin' : 'User'}?`,
            async () => {
                try {
                    await alterarRoleUsuario(usuario.id, siguienteRole);
                    cargarUsuarios();
                } catch (error) {
                    Alert.alert('Error', error.message || 'No se pudo actualizar el rol');
                }
            },
        );
    }

    async function onToggleBloqueo(usuario) {
        const siguienteBloqueo = usuario.bloqueado ? 0 : 1;
        confirmarAccion(
            'Confirmar',
            `¿${siguienteBloqueo ? 'Bloquear' : 'Desbloquear'} a ${usuario.username}?`,
            async () => {
                try {
                    await alterarBloqueioUsuario(usuario.id, siguienteBloqueo);
                    cargarUsuarios();
                } catch (error) {
                    Alert.alert('Error', error.message || 'No se pudo actualizar el bloqueo');
                }
            },
        );
    }

    async function onTogglePlano(usuario) {
        const planoAtual = usuario.plano || 'demo';
        const siguientePlano = planoAtual === 'pro' ? 'demo' : 'pro';
        confirmarAccion(
            'Confirmar',
            `¿Cambiar el plan de ${usuario.username} a ${siguientePlano === 'pro' ? 'Pro' : 'Demo'}?`,
            async () => {
                try {
                    await alterarPlanoUsuario(usuario.id, siguientePlano);
                    cargarUsuarios();
                } catch (error) {
                    Alert.alert('Error', error.message || 'No se pudo actualizar el plan');
                }
            },
        );
    }

    async function onEliminarUsuario(usuario) {
        confirmarAccion(
            'Eliminar usuario',
            `Esta acción no se puede deshacer. ¿Eliminar a ${usuario.username}?`,
            async () => {
                try {
                    await eliminarUsuarioAdmin(usuario.id);
                    cargarUsuarios();
                } catch (error) {
                    Alert.alert('Error', error.message || 'No se pudo eliminar el usuario');
                }
            },
            true,
        );
    }

    const maxNivel = useMemo(() => {
        if (!stats?.jugadores_por_nivel?.length) return 1;
        return Math.max(...stats.jugadores_por_nivel.map(item => Number(item.cantidad) || 0));
    }, [stats]);

    const usuariosFiltrados = useMemo(() => {
        if (!buscaUsuario.trim()) return usuarios;
        const termo = buscaUsuario.trim().toLowerCase();
        return usuarios.filter(u => (u.username || '').toLowerCase().includes(termo));
    }, [usuarios, buscaUsuario]);

    return (
        <View style={styles.container}>
            <View style={styles.chipsRow}>
                {SECTIONS.map(seccion => (
                    <TouchableOpacity
                        key={seccion}
                        style={[styles.chip, seccionActiva === seccion && styles.chipActive]}
                        onPress={() => setSeccionActiva(seccion)}>
                        <Text style={[styles.chipText, seccionActiva === seccion && styles.chipTextActive]}>{SECTION_LABELS[seccion]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {seccionActiva === 'overview' && (
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.grid}>
                        <View style={[styles.card, styles.statsCard]}>
                            <Text style={styles.cardLabel}>Total Utilizadores</Text>
                            <Text style={styles.cardValue}>{stats?.total_usuarios ?? '—'}</Text>
                        </View>
                        <View style={[styles.card, styles.statsCard]}>
                            <Text style={styles.cardLabel}>Total Jugadores</Text>
                            <Text style={styles.cardValue}>{stats?.total_jugadores ?? '—'}</Text>
                        </View>
                        <View style={[styles.card, styles.statsCard]}>
                            <Text style={styles.cardLabel}>Total Deportes</Text>
                            <Text style={styles.cardValue}>{stats?.total_deportes ?? '—'}</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Últimos 5 usuarios</Text>
                        {stats?.usuarios_recientes?.length ? stats.usuarios_recientes.map(item => (
                            <View key={item.id} style={styles.listItem}>
                                <Text style={styles.listTitle}>{item.username}</Text>
                                <Text style={styles.listSubtitle}>{formatFecha(item.created_at)}</Text>
                            </View>
                        )) : <Text style={styles.emptyText}>No hay usuarios recientes.</Text>}
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Jugadores por nivel</Text>
                        {stats?.jugadores_por_nivel?.map(item => (
                            <View key={item.nivel || item.id} style={styles.barRow}>
                                <Text style={styles.barLabel}>{item.nivel}</Text>
                                <View style={styles.barTrack}>
                                    <View style={[styles.barFill, { width: `${(Number(item.cantidad) / maxNivel) * 100}%`, backgroundColor: colorNivel(item.nivel) }]} />
                                </View>
                                <Text style={styles.barValue}>{item.cantidad}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}

            {seccionActiva === 'users' && (
                <FlatList
                    data={usuariosFiltrados}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.content}
                    ListHeaderComponent={
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar por username (ej: para confirmar pago MB WAY)"
                            placeholderTextColor="#5b6478"
                            value={buscaUsuario}
                            onChangeText={setBuscaUsuario}
                        />
                    }
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.listTitle}>{item.username}</Text>
                                <View style={styles.badgeRow}>
                                    <View style={[styles.badge, item.role === 'admin' ? styles.badgeAdmin : styles.badgeUser]}>
                                        <Text style={styles.badgeText}>{item.role === 'admin' ? 'Admin' : 'User'}</Text>
                                    </View>
                                    <View style={[styles.badge, item.bloqueado ? styles.badgeBlocked : styles.badgeActive]}>
                                        <Text style={styles.badgeText}>{item.bloqueado ? 'Bloqueado' : 'Activo'}</Text>
                                    </View>
                                    <View style={[styles.badge, (item.plano || 'demo') === 'pro' ? styles.badgePro : styles.badgeDemo]}>
                                        <Text style={styles.badgeText}>{(item.plano || 'demo') === 'pro' ? 'Pro' : 'Demo'}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.listSubtitle}>Creado: {formatFecha(item.created_at)}</Text>
                            <View style={styles.actionsRow}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => onToggleRole(item)}>
                                    <Text style={styles.actionText}>{item.role === 'admin' ? 'Tornar User' : 'Tornar Admin'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => onToggleBloqueo(item)}>
                                    <Text style={styles.actionText}>{item.bloqueado ? 'Desbloquear' : 'Bloquear'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => onTogglePlano(item)}>
                                    <Text style={styles.actionText}>{(item.plano || 'demo') === 'pro' ? 'Tornar Demo' : 'Tornar Pro'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, styles.actionDanger]} onPress={() => onEliminarUsuario(item)}>
                                    <Text style={styles.actionText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}

            {seccionActiva === 'logs' && (
                <View style={styles.content}>
                    <View style={styles.filterRow}>
                        <View style={styles.filterChipRow}>
                            {['', 'login', 'login_falhou', 'registro', 'login_bloqueado'].map(opcion => {
                                const label = opcion === '' ? 'Todos' : opcion === 'login' ? 'Login' : opcion === 'login_falhou' ? 'Login Fallido' : opcion === 'registro' ? 'Registro' : 'Login Bloqueado';
                                return (
                                    <TouchableOpacity
                                        key={opcion}
                                        style={[styles.filterChip, tipoFiltro === opcion && styles.filterChipActive]}
                                        onPress={() => setTipoFiltro(opcion)}>
                                        <Text style={[styles.filterChipText, tipoFiltro === opcion && styles.filterChipTextActive]}>{label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Filtrar por username"
                            placeholderTextColor="#5b6478"
                            value={usernameFiltro}
                            onChangeText={setUsernameFiltro}
                        />
                    </View>
                    <FlatList
                        data={logs}
                        keyExtractor={item => String(item.id)}
                        contentContainerStyle={styles.content}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registo encontrado</Text>}
                        renderItem={({ item }) => {
                            const tipoKey = item.tipo || '';
                            const tipoColor = tipoKey === 'login' ? '#00e676' : tipoKey === 'login_falhou' ? '#ff4d6d' : tipoKey === 'registro' ? '#00c2ff' : '#ffb347';
                            return (
                                <View style={styles.card}>
                                    <View style={styles.rowBetween}>
                                        <View style={[styles.badge, { backgroundColor: tipoColor }]}> 
                                            <Text style={styles.badgeText}>{item.tipo || 'Log'}</Text>
                                        </View>
                                        <Text style={styles.listSubtitle}>{formatFechaHora(item.criado_em)}</Text>
                                    </View>
                                    <Text style={styles.listTitle}>{item.username || '—'}</Text>
                                    <Text style={styles.listSubtitle}>IP: {item.ip || '—'}</Text>
                                    <Text style={styles.listSubtitle}>{item.detalhes || '—'}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f1115' },
    chipsRow: { flexDirection: 'row', backgroundColor: '#1c1f26', borderColor: '#2a2f3a', borderWidth: 1, borderRadius: 999, padding: 4, margin: 12, gap: 4 },
    chip: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 8 },
    chipActive: { backgroundColor: '#00c2ff' },
    chipText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
    chipTextActive: { color: '#0f1115' },
    content: { padding: 12, paddingBottom: 24 },
    grid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    statsCard: { flex: 1, minWidth: 0, alignItems: 'center', justifyContent: 'center' },
    card: { backgroundColor: '#1c1f26', borderRadius: 14, padding: 14, marginBottom: 12 },
    cardLabel: { color: '#8a9bbf', marginBottom: 6, textAlign: 'center' },
    cardTitle: { color: '#fff', fontWeight: '700', marginBottom: 8 },
    cardValue: { color: '#00c2ff', fontSize: 28, fontWeight: '800', textAlign: 'center' },
    listItem: { paddingVertical: 8, borderBottomColor: '#2a2f3a', borderBottomWidth: 1 },
    listTitle: { color: '#fff', fontWeight: '700' },
    listSubtitle: { color: '#8a9bbf', marginTop: 2 },
    emptyText: { color: '#8a9bbf', fontStyle: 'italic', marginTop: 8 },
    barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    barLabel: { color: '#fff', width: 70 },
    barTrack: { flex: 1, height: 8, backgroundColor: '#2a2f3a', borderRadius: 999, overflow: 'hidden', marginRight: 8 },
    barFill: { height: 8, borderRadius: 999 },
    barValue: { color: '#fff', width: 24 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    badgeRow: { flexDirection: 'row', gap: 6 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
    badgeAdmin: { backgroundColor: '#00c2ff' },
    badgeUser: { backgroundColor: '#2a2f3a' },
    badgeBlocked: { backgroundColor: '#ff4d6d' },
    badgeActive: { backgroundColor: '#00e676' },
    badgePro: { backgroundColor: '#ffb300' },
    badgeDemo: { backgroundColor: '#2a2f3a' },
    badgeText: { color: '#0f1115', fontWeight: '700', fontSize: 11 },
    actionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    actionBtn: { backgroundColor: '#2a2f3a', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
    actionDanger: { backgroundColor: '#ff4d6d' },
    actionText: { color: '#fff', fontWeight: '700', fontSize: 11 },
    filterRow: { gap: 8, marginBottom: 8 },
    filterChipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    filterChip: { backgroundColor: '#1c1f26', borderColor: '#2a2f3a', borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
    filterChipActive: { backgroundColor: '#00c2ff' },
    filterChipText: { color: '#fff', fontWeight: '700', fontSize: 11 },
    filterChipTextActive: { color: '#0f1115' },
    input: { backgroundColor: '#1c1f26', borderColor: '#2a2f3a', borderWidth: 1, color: '#fff', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
});