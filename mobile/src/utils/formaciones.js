// Formações fixas por desporto. Sempre que o desporto for reconhecido,
// os equipos gerados respeitam esta composição exata (nº de jogadores
// por posto real), em vez de uma divisão genérica.
//
// Cada posto: { etiqueta, regex, cantidad }
//   etiqueta -> nome legível (só para mensagens ao utilizador)
//   regex    -> testa o nome real da posição (tal como vem da BD)
//   cantidad -> quantos jogadores desse posto entram em CADA equipo
//
// Basquetebol usa os 5 postos clássicos (1x Base, 1x Escolta, 1x Alero,
// 1x Ala-Pívot, 1x Pívot) — é o "quinteto titular" mais conhecido.
// Ténis não tem postos (desporto individual): cada equipo leva sempre
// 2 jogadores, sem distinção de posição (par de dobles).

import { puntajeNivel } from './nivel';

function normalizar(texto) {
    return (texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

const FUTBOL_11 = { etiqueta: '4-3-3', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /lateral|central|zagueiro|l[ií]bero|defensa/, cantidad: 4 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista|interior|\bcentro\b/, cantidad: 3 }, { etiqueta: 'Delantero', regex: /extremo|delanter|punta|centro.?forward|mediapunta/, cantidad: 3 }, ] };

const FUTBOL_11_442 = { etiqueta: '4-4-2', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /lateral|central|zagueiro|l[ií]bero|defensa/, cantidad: 4 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista|interior|\bcentro\b/, cantidad: 4 }, { etiqueta: 'Delantero', regex: /extremo|delanter|punta|centro.?forward|mediapunta/, cantidad: 2 }, ] };

const FUTBOL_11_352 = { etiqueta: '3-5-2', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /central|zagueiro|l[ií]bero/, cantidad: 3 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista|interior|\bcentro\b/, cantidad: 5 }, { etiqueta: 'Delantero', regex: /extremo|delanter|punta|centro.?forward|mediapunta/, cantidad: 2 }, ] };

const FUTBOL_11_4231 = { etiqueta: '4-2-3-1', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /lateral|central|zagueiro|l[ií]bero|defensa/, cantidad: 4 }, { etiqueta: 'Mediocentro', regex: /pivote|volante|mediocentro/, cantidad: 2 }, { etiqueta: 'Mediapunta', regex: /mediapunta|enganche|interior/, cantidad: 3 }, { etiqueta: 'Delantero', regex: /centroavante|delanter|punta|atacante/, cantidad: 1 }, ] };

const FUTBOL_11_343 = { etiqueta: '3-4-3', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /central|zagueiro|l[ií]bero/, cantidad: 3 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista|interior|\bcentro\b/, cantidad: 4 }, { etiqueta: 'Delantero', regex: /extremo|delanter|punta|centro.?forward|mediapunta/, cantidad: 3 }, ] };

const FUTBOL_11_532 = { etiqueta: '5-3-2', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /lateral|central|zagueiro|defensa/, cantidad: 5 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista/, cantidad: 3 }, { etiqueta: 'Delantero', regex: /centroavante|delanter|punta|atacante/, cantidad: 2 }, ] };

const FUTBOL_11_541 = { etiqueta: '5-4-1', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /lateral|central|zagueiro|defensa/, cantidad: 5 }, { etiqueta: 'Centrocampista', regex: /medi|volante|pivote|centrocampista/, cantidad: 4 }, { etiqueta: 'Delantero', regex: /centroavante|delanter|punta|atacante/, cantidad: 1 }, ] };

const FUTBOL_7_A = { etiqueta: '3-2-1', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /defensa|lateral|central/, cantidad: 3 }, { etiqueta: 'Centrocampista', regex: /medi|volante|centrocampista|interior/, cantidad: 2 }, { etiqueta: 'Delantero', regex: /delanter|punta|atacante/, cantidad: 1 }, ] };

const FUTBOL_7_B = { etiqueta: '2-3-1', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /defensa|lateral|central/, cantidad: 2 }, { etiqueta: 'Centrocampista', regex: /medi|volante|centrocampista|interior/, cantidad: 3 }, { etiqueta: 'Delantero', regex: /delanter|punta|atacante/, cantidad: 1 }, ] };

const FUTSAL_232 = { etiqueta: '2-2', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /cierre|fixo|defensa/, cantidad: 2 }, { etiqueta: 'Atacante', regex: /ala|piv[oô]|delanter/, cantidad: 2 }, ] };

const FUTSAL_31 = { etiqueta: '3-1', postos: [ { etiqueta: 'Portero', regex: /porter|guarda.?redes|arquero/, cantidad: 1 }, { etiqueta: 'Defensa', regex: /cierre|fixo|defensa/, cantidad: 3 }, { etiqueta: 'Atacante', regex: /ala|piv[oô]|delanter/, cantidad: 1 }, ] };

const BALONCESTO = { etiqueta: 'Quinteto titular', postos: [ { etiqueta: 'Base', regex: /base|armador/, cantidad: 1 }, { etiqueta: 'Escolta', regex: /escolta/, cantidad: 1 }, { etiqueta: 'Ala-Pívot', regex: /ala.?p[ií]vot/, cantidad: 1 }, { etiqueta: 'Alero', regex: /alero|ala\b/, cantidad: 1 }, { etiqueta: 'Pívot', regex: /p[ií]vo[t]?|center|centro\b/, cantidad: 1 }, ] };

const TENIS = { etiqueta: 'Dobles (2 jugadores)', postos: [ { etiqueta: 'Jugador', regex: /.*/, cantidad: 2 }, ] };

// Mapa de formações possíveis por tipo — usado pela UI para obrigar escolha
const FORMACIONES_POR_TIPO = {
    futbol: [FUTBOL_11, FUTBOL_11_442, FUTBOL_11_352, FUTBOL_11_4231, FUTBOL_11_343, FUTBOL_11_532, FUTBOL_11_541],
    futbol7: [FUTBOL_7_A, FUTBOL_7_B],
    futsal: [FUTSAL_232, FUTSAL_31],
    baloncesto: [BALONCESTO],
    tenis: [TENIS],
};

/**
 * Devuelve la formación fija a usar para un deporte, o null si el
 * deporte no tiene una formación predefinida (en ese caso se usa el
 * reparto genérico equilibrado de siempre, sin postos fijos).
 *
 * @param {string} tipoDeporte      valor devuelto por detetarDeporte()
 * @param {number} numJugadoresEquipo  campo num_jugadores del deporte en la BD
 */
export function obtenerFormacion(tipoDeporte, numJugadoresEquipo) {
    // Mantemos compatibilidade: devolve a formação por omissão (primeira disponível)
    const lista = FORMACIONES_POR_TIPO[tipoDeporte];
    if (!lista || lista.length === 0) return null;
    if (tipoDeporte === 'futbol' && numJugadoresEquipo && numJugadoresEquipo <= 7) {
        return FORMACIONES_POR_TIPO['futbol7'][0];
    }
    return lista[0];
}

export function listarFormaciones(tipoDeporte, numJugadoresEquipo) {
    const lista = FORMACIONES_POR_TIPO[tipoDeporte] || [];
    if (tipoDeporte === 'futbol' && numJugadoresEquipo && numJugadoresEquipo <= 7) return FORMACIONES_POR_TIPO['futbol7'];
    return lista;
}

function baralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function ordenarPorNivelBaralhado(jugadores) {
    const porNivel = {};
    jugadores.forEach(j => {
        const score = puntajeNivel(j.nivel);
        if (!porNivel[score]) porNivel[score] = [];
        porNivel[score].push(j);
    });
    const niveles = Object.keys(porNivel).map(Number).sort((a, b) => b - a);
    return niveles.flatMap(n => baralhar(porNivel[n]));
}

/**
 * Genera equipos respetando una formación fija (postos y cantidades
 * exactas por equipo). Devuelve { equipos, faltantes }:
 *   equipos    -> array de equipos (cada uno, array de jugadores)
 *   faltantes  -> avisos de postos que no se pudieron completar por
 *                 falta de jugadores suficientes en esa posición
 */
export function generarEquiposConFormacion(jugadores, numEquipos, formacion) {
    const equipos = Array.from({ length: numEquipos }, () => []);
    const puntuacionEquipos = Array(numEquipos).fill(0);
    const faltantes = [];
    const usados = new Set();

    formacion.postos.forEach(posto => {
        const candidatos = ordenarPorNivelBaralhado(
            jugadores.filter(j => !usados.has(j.id) && posto.regex.test(normalizar(j.posicion)))
        );

        const necesarios = posto.cantidad * numEquipos;
        if (candidatos.length < necesarios) {
            faltantes.push(`${posto.etiqueta}: faltan ${necesarios - candidatos.length} jugador(es)`);
        }

        const countPos = Array(numEquipos).fill(0);
        candidatos.forEach(jugador => {
            let elegibles = [];
            for (let i = 0; i < numEquipos; i++) {
                if (countPos[i] < posto.cantidad) elegibles.push(i);
            }
            if (elegibles.length === 0) return; // este posto ya está lleno en todos los equipos

            const menorPuntuacion = Math.min(...elegibles.map(i => puntuacionEquipos[i]));
            elegibles = elegibles.filter(i => puntuacionEquipos[i] === menorPuntuacion);
            const elegido = elegibles[Math.floor(Math.random() * elegibles.length)];

            equipos[elegido].push(jugador);
            puntuacionEquipos[elegido] += puntajeNivel(jugador.nivel);
            countPos[elegido] += 1;
            usados.add(jugador.id);
        });
    });

    return { equipos, faltantes };
}