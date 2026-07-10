import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { decodificarPayload, getToken } from '../utils/auth';

export default function usePlano() {
    const [plano, setPlano] = useState('demo');

    const leerPlano = async () => {
        const token = await getToken();
        const payload = decodificarPayload(token);
        setPlano(payload?.plano || 'demo');
    };

    useEffect(() => { leerPlano(); }, []);

    useFocusEffect(() => {
        leerPlano();
    });

    return {
        plano,
        isDemo: plano === 'demo',
        isPro: plano === 'pro',
    };
}
