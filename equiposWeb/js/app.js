

const API_URL = 'http://192.168.0.141/equiposWeb/api';


function mostrarMensaje(elementoId, texto, esError = false) {
    const el = document.getElementById(elementoId);
    if (el) {
        el.textContent = texto;
        el.style.color = esError ? '#C62828' : '#2E7D32';
    }
}

function limpiarMensaje(elementoId) {
    const el = document.getElementById(elementoId);
    if (el) el.textContent = '';
}


function badgeNivel(nivel) {
    const clases = {
        'Medio':     'nivel-medio',
        'Bueno':     'nivel-bueno',
        'Muy Bueno': 'nivel-muybueno'
    };
    return `<span class="${clases[nivel] || 'nivel-medio'}">${nivel}</span>`;
}


function puntajeNivel(nivel) {
    if (nivel === 'Muy Bueno') return 3;
    if (nivel === 'Bueno')     return 2;
    return 1;
}