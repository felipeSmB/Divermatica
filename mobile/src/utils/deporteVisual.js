// Paleta e ícones partilhados entre DeportesScreen, JugadoresScreen e
// EquiposScreen, para que a identidade visual seja sempre consistente
// em toda a app.

export const ACCENTS = ['#00d4ff', '#7c4dff', '#00e676', '#ffc107', '#ff4d6d', '#1e88e5'];

export function iconoDeporte(nombre) {
    const n = (nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (n.includes('futbol sala') || n.includes('futsal')) return '🥅';
    if (n.includes('futbol'))     return '⚽';
    if (n.includes('baloncesto') || n.includes('basquet')) return '🏀';
    if (n.includes('voleibol') || n.includes('voley'))     return '🏐';
    if (n.includes('tenis de mesa') || n.includes('ping pong')) return '🏓';
    if (n.includes('padel'))      return '🎾';
    if (n.includes('tenis'))      return '🎾';
    if (n.includes('balonmano') || n.includes('handball')) return '🤾';
    if (n.includes('rugby'))      return '🏉';
    if (n.includes('beisbol') || n.includes('softball'))   return '⚾';
    if (n.includes('hockey'))     return '🏑';
    if (n.includes('badminton'))  return '🏸';
    if (n.includes('natacion'))   return '🏊';
    if (n.includes('ciclismo'))   return '🚴';
    if (n.includes('atletismo') || n.includes('carrera'))  return '🏃';
    if (n.includes('boxeo'))      return '🥊';
    if (n.includes('golf'))       return '⛳';
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