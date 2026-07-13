import { apiFetch } from './client';

export async function obtenerPerfil() {
    const res = await apiFetch('/perfil.php');
    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(Array.isArray(data?.erro) ? data.erro.join(', ') : data?.erro || 'No se pudo cargar el perfil');
    }
    return res.json().catch(() => null);
}

export async function alterarSenha(senhaAtual, senhaNova, confirmarSenhaNova) {
    const res = await apiFetch('/perfil_senha.php', {
        method: 'POST',
        body: JSON.stringify({
            senha_atual: senhaAtual,
            senha_nova: senhaNova,
            confirmar_senha_nova: confirmarSenhaNova,
        }),
    });

    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(Array.isArray(data?.erro) ? data.erro.join(', ') : data?.erro || 'No se pudo cambiar la contraseña');
    }
    return res.json().catch(() => null);
}
