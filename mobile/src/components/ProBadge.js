import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProBadge() {
    return (
        <View style={styles.badge}>
            <Text style={styles.icon}>🔒</Text>
            <Text style={styles.text}>PRO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,152,0,0.18)',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 6,
    },
    icon: { fontSize: 10 },
    text: { color: '#ff9800', fontSize: 10, fontWeight: '800', marginLeft: 2 },
});
