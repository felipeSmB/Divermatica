import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atobPolyfill } from 'base-64';

const TOKEN_KEY = 'diversport_token';

export async function getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function guardarToken(token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function eliminarToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export function decodificarPayload(token) {
    try {
        if (!token) return null;
        const [, payloadBase64] = token.split('.');
        if (!payloadBase64) return null;
        return JSON.parse(atobPolyfill(payloadBase64));
    } catch {
        return null;
    }
}

export function tokenExpirado(token) {
    try {
        const payload = decodificarPayload(token);
        return !payload || Date.now() / 1000 > payload.exp;
    } catch {
        return true;
    }
}