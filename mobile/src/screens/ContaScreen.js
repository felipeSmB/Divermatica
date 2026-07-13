import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerPerfil, alterarSenha } from '../api/perfil';

export default function ContaScreen() {
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [confirmarSenhaNova, setConfirmarSenhaNova] = useState('');
    const [guardando, setGuardando] = useState(false);

    const carregarPerfil = useCallback(async () => {
        setCargando(true);
        try {
            const data = await obtenerPerfil();
            setPerfil(data || null);
        } catch (error) {
            Alert.alert('Error', error.message || 'No se pudo cargar el perfil');
        } finally {
            setCargando(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        carregarPerfil();
    }, [carregarPerfil]));

    async function onTrocarSenha() {
        if (!senhaAtual || !senhaNova || !confirmarSenhaNova) {
            Alert.alert('Atención', 'Completa los tres campos para cambiar la contraseña');
            return;
        }

        if (senhaNova !== confirmarSenhaNova) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setGuardando(true);
        try {
            await alterarSenha(senhaAtual, senhaNova, confirmarSenhaNova);
            Alert.alert('Listo', 'Contraseña actualizada correctamente');
            setSenhaAtual('');
            setSenhaNova('');
            setConfirmarSenhaNova('');
        } catch (error) {
            Alert.alert('Error', error.message || 'No se pudo cambiar la contraseña');
        } finally {
            setGuardando(false);
        }
    }

    function formatarPlano(plano) {
        return plano === 'pro' ? 'Pro' : 'Demo';
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inner}>
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Usuario</Text>
                    <Text style={styles.cardValue}>{cargando ? 'Cargando...' : perfil?.username || '—'}</Text>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Plan</Text>
                        <Text style={styles.infoValue}>{cargando ? '—' : formatarPlano(perfil?.plano)}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Cambiar contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña actual"
                    placeholderTextColor="#5b6478"
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nueva contraseña"
                    placeholderTextColor="#5b6478"
                    value={senhaNova}
                    onChangeText={setSenhaNova}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar nueva contraseña"
                    placeholderTextColor="#5b6478"
                    value={confirmarSenhaNova}
                    onChangeText={setConfirmarSenhaNova}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={onTrocarSenha} disabled={guardando}>
                    <Text style={styles.buttonText}>{guardando ? 'Guardando...' : 'Actualizar contraseña'}</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#0f1115', paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 24 },
    inner: { width: '100%', maxWidth: 480, alignSelf: 'center' },
    card: { backgroundColor: '#1c1f26', borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#2a2f3a' },
    cardLabel: { color: '#8a9bbf', marginBottom: 6 },
    cardValue: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 12 },
    infoBlock: { backgroundColor: '#2a2f3a', borderRadius: 10, padding: 10, marginTop: 6 },
    infoLabel: { color: '#8a9bbf', fontSize: 12, marginBottom: 4 },
    infoValue: { color: '#fff', fontWeight: '700' },
    sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 12 },
    input: { backgroundColor: '#0f1115', borderWidth: 1, borderColor: '#2a2f3a', color: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12 },
    button: { backgroundColor: '#00c2ff', paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
    buttonText: { color: '#0f1115', fontWeight: '800' },
});
