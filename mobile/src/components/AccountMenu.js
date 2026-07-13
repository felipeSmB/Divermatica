import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function AccountMenu({ visible, onClose }) {
    const navigation = useNavigation();
    const { logout } = useAuth();
    const larguraPainel = Dimensions.get('window').width * 0.6;
    const translateX = useRef(new Animated.Value(larguraPainel)).current;

    useEffect(() => {
        if (!visible) {
            Animated.timing(translateX, {
                toValue: larguraPainel,
                duration: 220,
                useNativeDriver: true,
            }).start();
            return;
        }

        Animated.timing(translateX, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [visible, translateX, larguraPainel]);

    function fechar() {
        Animated.timing(translateX, {
            toValue: larguraPainel,
            duration: 220,
            useNativeDriver: true,
        }).start(() => onClose());
    }

    function abrirTela(destino) {
        fechar();
        navigation.navigate(destino);
    }

    function handleLogout() {
        fechar();
        logout();
    }

    return (
        <Modal
            transparent
            animationType="none"
            visible={visible}
            onRequestClose={fechar}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={fechar} />
                <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
                    <TouchableOpacity style={styles.item} onPress={() => abrirTela('Conta')}>
                        <Text style={styles.itemText}>👤 Minha Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => abrirTela('Historial')}>
                        <Text style={styles.itemText}>📖 Histórico</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.item} onPress={handleLogout}>
                        <Text style={styles.itemTextDanger}>🚪 Sair</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    panel: {
        width: '60%',
        minWidth: 220,
        maxWidth: 260,
        alignSelf: 'flex-start',
        backgroundColor: '#1c1f26',
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 56,
        marginBottom: 16,
    },
    item: {
        paddingVertical: 14,
        borderBottomWidth: 0,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    itemTextDanger: {
        color: '#ff4d6d',
        fontSize: 16,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2f3a',
        marginVertical: 8,
    },
});
