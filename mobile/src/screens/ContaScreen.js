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
            Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden');
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

    function formatarRole(role) {
        return role === 'admin' ? 'Admin' : 'User';
    }

    function formatarPlano(plano) {
        return plano === 'pro' ? 'Pro' : 'Demo';
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardLabel}>Mi cuenta</Text>
                <Text style={styles.cardValue}>{cargando ? 'Carregando...' : perfil?.username || '—'}</Text>
                <View style={styles.rowInfo}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Rol</Text>
                        <Text style={styles.infoValue}>{cargando ? '—' : formatarRole(perfil?.role)}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Plano</Text>
                        <Text style={styles.infoValue}>{cargando ? '—' : formatarPlano(perfil?.plano)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Trocar senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha atual"
                    placeholderTextColor="#5b6478"
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    placeholderTextColor="#5b6478"
                    value={senhaNova}
                    onChangeText={setSenhaNova}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar nova senha"
                    placeholderTextColor="#5b6478"
                    value={confirmarSenhaNova}
                    onChangeText={setConfirmarSenhaNova}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={onTrocarSenha} disabled={guardando}>
                    <Text style={styles.buttonText}>{guardando ? 'Guardando...' : 'Atualizar senha'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#0f1115', padding: 16, paddingBottom: 24 },
    card: { backgroundColor: '#1c1f26', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#2a2f3a' },
    cardLabel: { color: '#8a9bbf', marginBottom: 6 },
    cardValue: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 12 },
    rowInfo: { flexDirection: 'row', gap: 12 },
    infoBlock: { flex: 1, backgroundColor: '#2a2f3a', borderRadius: 10, padding: 10 },
    infoLabel: { color: '#8a9bbf', fontSize: 12, marginBottom: 4 },
    infoValue: { color: '#fff', fontWeight: '700' },
    sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 12 },
    input: { backgroundColor: '#0f1115', borderWidth: 1, borderColor: '#2a2f3a', color: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12 },
    button: { backgroundColor: '#00c2ff', paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
    buttonText: { color: '#0f1115', fontWeight: '800' },
});
