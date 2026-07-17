import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, guardarToken, eliminarToken, tokenExpirado, decodificarPayload } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        (async () => {
            const token = await getToken();
            if (token && !tokenExpirado(token)) {
                const payload = decodificarPayload(token);
                setAutenticado(true);
                setRole(payload?.role || 'user');
            } else {
                await eliminarToken();
                setRole(null);
            }
            setCargando(false);
        })();
    }, []);

    async function login(token) {
        await guardarToken(token);
        const payload = decodificarPayload(token);
        setAutenticado(true);
        setRole(payload?.role || 'user');
    }

    async function logout() {
        await eliminarToken();
        setAutenticado(false);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ autenticado, cargando, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}