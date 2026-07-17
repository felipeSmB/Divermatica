import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
    Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { apiFetch } from '../api/client';
import usePlano from '../hooks/usePlano';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Ventajas reales de PRO frente a Demo (reflejan los límites ya aplicados
// en JugadoresScreen, DeportesScreen, EquiposScreen e HistorialScreen).
const VENTAJAS = [
    {
        icono: '👥',
        titulo: 'Jugadores ilimitados',
        texto: 'La versión Demo permite hasta 22 jugadores. Con PRO no hay límite.',
    },
    {
        icono: '🏅',
        titulo: 'Todos los deportes',
        texto: 'Demo solo permite gestionar Fútbol. PRO desbloquea todos los deportes disponibles.',
    },
    {
        icono: '⚡',
        titulo: 'Equipos ilimitados',
        texto: 'Demo genera un máximo de 2 equipos por partido. PRO genera tantos como necesites.',
    },
    {
        icono: '📥',
        titulo: 'Guardar en el historial',
        texto: 'Guarda cada partido generado para consultarlo más adelante.',
    },
    {
        icono: '📖',
        titulo: 'Historial completo',
        texto: 'Accede sin restricciones a todo el historial de partidas jugadas.',
    },
    {
        icono: '📱',
        titulo: 'Notificar jugadores por SMS',
        texto: 'Avisa a todo el equipo de la fecha, hora y lugar con un solo toque.',
    },
];

export default function ProScreen() {
    const { isPro } = usePlano();
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function enviarSolicitud() {
        const correo = email.trim();
        const tel = telefono.trim();

        if (!EMAIL_REGEX.test(correo)) {
            Alert.alert('Atención', 'Introduce un email válido');
            return;
        }
        if (tel.length < 6) {
            Alert.alert('Atención', 'Introduce un número de teléfono válido');
            return;
        }

        setEnviando(true);
        try {
            const res = await apiFetch('/pro_contacto.php', {
                method: 'POST',
                body: JSON.stringify({ email: correo, telefono: tel }),
            });

            if (res && res.ok) {
                Alert.alert('¡Solicitud enviada!', 'Gracias, nos pondremos en contacto contigo muy pronto.');
                setEmail('');
                setTelefono('');
            } else {
                const data = res ? await res.json().catch(() => null) : null;
                const msg = Array.isArray(data?.erro) ? data.erro.join('\n') : (data?.erro || 'No se pudo enviar la solicitud.');
                Alert.alert('Error', msg);
            }
        } catch (e) {
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        } finally {
            setEnviando(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContenido}>
                <View style={styles.header}>
                    <View style={styles.badgeGrande}>
                        <Text style={styles.badgeGrandeTexto}>PRO</Text>
                    </View>
                    <Text style={styles.titulo}>DiverSport PRO</Text>
                    <Text style={styles.subtitulo}>
                        {isPro
                            ? 'Ya disfrutas de todas las ventajas PRO. ¡Gracias por tu apoyo!'
                            : 'Desbloquea todo el potencial de tu equipo'}
                    </Text>
                </View>

                <View style={styles.lista}>
                    {VENTAJAS.map((v, i) => (
                        <View key={i} style={styles.item}>
                            <View style={styles.itemIcono}>
                                <Text style={styles.itemIconoTexto}>{v.icono}</Text>
                            </View>
                            <View style={styles.itemTexto}>
                                <Text style={styles.itemTitulo}>{v.titulo}</Text>
                                <Text style={styles.itemDescricao}>{v.texto}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.precoCard}>
                    <Text style={styles.precoLabel}>Todo por solo</Text>
                    <Text style={styles.precoValor}>2.99€</Text>
                    <Text style={styles.precoSub}>Pago único · Sin suscripciones</Text>
                </View>

                {!isPro && (
                    <View style={styles.formCard}>
                        <Text style={styles.formTitulo}>Quiero actualizar a PRO</Text>
                        <Text style={styles.formSubtitulo}>
                            Déjanos tu email y teléfono y te contactaremos para activar tu cuenta PRO.
                        </Text>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="tucorreo@ejemplo.com"
                            placeholderTextColor="#5b6478"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+34 600 000 000"
                            placeholderTextColor="#5b6478"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad"
                        />

                        <TouchableOpacity
                            style={[styles.boton, enviando && styles.botonDeshabilitado]}
                            onPress={enviarSolicitud}
                            disabled={enviando}
                            activeOpacity={0.85}
                        >
                            {enviando
                                ? <ActivityIndicator color="#000" />
                                : <Text style={styles.botonTexto}>Solicitar información PRO</Text>}
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f1115' },
    scrollContenido: { padding: 16, paddingBottom: 40 },

    header: { alignItems: 'center', marginBottom: 22, marginTop: 8 },
    badgeGrande: {
        backgroundColor: 'rgba(255,152,0,0.18)',
        borderWidth: 1,
        borderColor: '#ff9800',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 10,
    },
    badgeGrandeTexto: { color: '#ff9800', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
    titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
    subtitulo: { fontSize: 13, color: '#8a9bbf', textAlign: 'center', paddingHorizontal: 20 },

    lista: { marginBottom: 20 },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#1c1f26',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#232833',
    },
    itemIcono: {
        width: 40, height: 40, borderRadius: 12,
        backgroundColor: 'rgba(255,152,0,0.15)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12,
    },
    itemIconoTexto: { fontSize: 18 },
    itemTexto: { flex: 1 },
    itemTitulo: { color: '#fff', fontWeight: '700', fontSize: 14.5, marginBottom: 3 },
    itemDescricao: { color: '#8a9bbf', fontSize: 12.5, lineHeight: 17 },

    precoCard: {
        backgroundColor: '#132a24',
        borderWidth: 1,
        borderColor: '#00e676',
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 22,
    },
    precoLabel: { color: '#00e676', fontWeight: '700', fontSize: 13, marginBottom: 2 },
    precoValor: { color: '#fff', fontWeight: '900', fontSize: 40 },
    precoSub: { color: '#5b6478', fontSize: 11, marginTop: 4 },

    formCard: { backgroundColor: '#1c1f26', borderRadius: 14, padding: 16 },
    formTitulo: { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 4 },
    formSubtitulo: { color: '#8a9bbf', fontSize: 12.5, marginBottom: 14, lineHeight: 17 },
    label: { color: '#999', marginBottom: 4, fontSize: 12.5 },
    input: { backgroundColor: '#11141a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
    boton: { backgroundColor: '#ff9800', padding: 14, borderRadius: 8, marginTop: 4 },
    botonDeshabilitado: { opacity: 0.6 },
    botonTexto: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
});