import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BrandTitle() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>DIVERSPORT</Text>
            <LinearGradient
                colors={['#00d4ff', '#7c4dff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.line}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 4,
        alignItems: 'flex-start',
    },
    title: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 15,
        letterSpacing: 1,
    },
    line: {
        height: 3,
        width: '90%',
        borderRadius: 2,
        marginTop: 3,
    },
});
