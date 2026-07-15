import { apiFetch } from './client';

export async function listarUsuariosAdmin() {
    const res = await apiFetch('/admin_usuarios.php');
    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudieron cargar los usuarios');
    }
    return res.json().catch(() => null);
}

export async function alterarRoleUsuario(id, role) {
    const res = await apiFetch('/admin_usuarios.php', {
        method: 'PUT',
        body: JSON.stringify({ id, role }),
    });

    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudo actualizar el rol');
    }
    return res.json().catch(() => null);
}

export async function alterarBloqueioUsuario(id, bloqueado) {
    const res = await apiFetch('/admin_usuarios.php', {
        method: 'PUT',
        body: JSON.stringify({ id, bloqueado }),
    });

    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudo actualizar el bloqueo');
    }
    return res.json().catch(() => null);
}


export async function alterarPlanoUsuario(id, plano) {
    const res = await apiFetch('/admin_usuarios.php', {
        method: 'PUT',
        body: JSON.stringify({ id, plano }),
    });

    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudo actualizar el plan');
    }
    return res.json().catch(() => null);
}


export async function eliminarUsuarioAdmin(id) {
    const res = await apiFetch(`/admin_usuarios.php?id=${id}`, {
        method: 'DELETE',
    });

    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudo eliminar el usuario');
    }
    return res.json().catch(() => null);
}

export async function obtenerEstadisticasAdmin() {
    const res = await apiFetch('/admin_stats.php');
    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudieron cargar las estadísticas');
    }
    return res.json().catch(() => null);
}

export async function listarLogsAdmin({ tipo, username } = {}) {
    const params = new URLSearchParams();
    if (tipo) params.append('tipo', tipo);
    if (username) params.append('username', username);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await apiFetch(`/admin_logs.php${query}`);
    if (!res) return null;
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || 'No se pudieron cargar los logs');
    }
    return res.json().catch(() => null);
}
