// Paleta e ícones partilhados entre DeportesScreen, JugadoresScreen e
// EquiposScreen, para que a identidade visual seja sempre consistente
// em toda a app.

export const ACCENTS = ['#00d4ff', '#7c4dff', '#00e676', '#ffc107', '#ff4d6d', '#1e88e5'];

export function iconoDeporte(nombre) {
    const n = (nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (n.includes('futbol sala') || n.includes('futsal')) return '🥅';
    if (n.includes('futbol'))     return '⚽';
    if (n.includes('baloncesto') || n.includes('basquet')) return '🏀';
    if (n.includes('balonmano') || n.includes('handball')) return '🤾';
    if (n.includes('rugby'))      return '🏉';
    return '🏅';
}

// Remove acentos e passa para minúsculas, para permitir pesquisa/filtragem
// que ignore diacríticos (ex: "joao" encontra "João").
export function normalizarTexto(texto) {
    return (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}