import { puntajeNivel } from './Level';

export { puntajeNivel };

// Baraja un array sin mutar el original (Fisher-Yates)
function baralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Genera equipos aleatorios pero equilibrados, respetando siempre la
// posición real de cada jugador.
//
// Reglas que sigue, por orden de prioridad:
//   1) Un jugador SIEMPRE queda en su posición real (nunca se reasigna
//      ni se inventa una posición para "encajarlo" en otro sitio).
//   2) Cada posición se reparte lo más parejo posible entre todos los
//      equipos (si hay 4 porteros y 2 equipos, cada equipo recibe 2;
//      nunca un equipo se queda sin jugadores en una posición mientras
//      otro tiene de sobra).
//   3) El TAMAÑO TOTAL de cada equipo se mantiene lo más igual posible
//      (máximo 1 jugador de diferencia), para que nunca un equipo acabe
//      con muchos más jugadores que otro.
//   4) Entre equipos empatados en lo anterior, gana el que tiene menor
//      puntuación total (nivel acumulado), para que la fuerza de cada
//      equipo quede lo más igualada posible.
//   5) Cualquier empate que quede se resuelve al azar — y entre
//      jugadores del mismo nivel, el orden también se baraja al azar —
//      así cada vez que pulsas "Generar equipos" el resultado cambia,
//      en vez de salir siempre lo mismo.
export function generarEquiposBalanceados(jugadores, numEquipos) {
    // 1. Agrupar por posición (se mantiene la posición real de cada jugador)
    const grupos = {};
    jugadores.forEach(j => {
        const pos = j.posicion || 'Sin posición';
        if (!grupos[pos]) grupos[pos] = [];
        grupos[pos].push(j);
    });

    const equipos = Array.from({ length: numEquipos }, () => []);
    const puntuacionEquipos = Array(numEquipos).fill(0);
    const tamanoEquipos = Array(numEquipos).fill(0); // nº total de jugadores por equipo (todas las posiciones)

    // Procesamos primero las posiciones con más jugadores: así las
    // posiciones más "ajustadas" (con pocos jugadores, ej. 1 solo
    // portero) se reparten cuando el balance global ya está más
    // avanzado, en vez de decidir a ciegas al principio.
    const nombresGrupos = Object.keys(grupos).sort((a, b) => grupos[b].length - grupos[a].length);

    nombresGrupos.forEach(nombrePos => {
        // Separamos por nivel exacto y barajamos dentro de cada nivel:
        // entre jugadores igual de buenos, quién va a cada equipo
        // cambia cada vez que se generan los equipos.
        const porNivel = {};
        grupos[nombrePos].forEach(j => {
            const score = puntajeNivel(j.nivel);
            if (!porNivel[score]) porNivel[score] = [];
            porNivel[score].push(j);
        });

        const ordenNiveles = Object.keys(porNivel).map(Number).sort((a, b) => b - a);
        const ordenado = ordenNiveles.flatMap(score => baralhar(porNivel[score]));

        // Cuántos jugadores de ESTA posición lleva ya cada equipo
        const countPos = Array(numEquipos).fill(0);
        const minPorEquipo = Math.floor(ordenado.length / numEquipos);

        ordenado.forEach(jugador => {
            // Paso 1: equipos que todavía no llegaron al mínimo de esta
            // posición tienen prioridad absoluta
            let candidatos = [];
            for (let i = 0; i < numEquipos; i++) {
                if (countPos[i] < minPorEquipo) candidatos.push(i);
            }
            if (candidatos.length === 0) {
                // Ya todos llegaron al mínimo de esta posición: el
                // "sobrante" se reparte entre los que menos tienen de
                // esta posición
                const minActual = Math.min(...countPos);
                candidatos = countPos
                    .map((c, i) => ({ c, i }))
                    .filter(x => x.c === minActual)
                    .map(x => x.i);
            }

            // Paso 2: entre los candidatos, el/los equipo(s) con MENOS
            // jugadores en total (para que el tamaño final quede igual)
            const menorTamano = Math.min(...candidatos.map(i => tamanoEquipos[i]));
            candidatos = candidatos.filter(i => tamanoEquipos[i] === menorTamano);

            // Paso 3: entre esos, el/los equipo(s) con menor puntuación total
            const menorPuntuacion = Math.min(...candidatos.map(i => puntuacionEquipos[i]));
            candidatos = candidatos.filter(i => puntuacionEquipos[i] === menorPuntuacion);

            // Paso 4: desempate aleatorio
            const elegido = candidatos[Math.floor(Math.random() * candidatos.length)];

            equipos[elegido].push(jugador);
            puntuacionEquipos[elegido] += puntajeNivel(jugador.nivel);
            tamanoEquipos[elegido] += 1;
            countPos[elegido] += 1;
        });
    });

    return equipos;
}