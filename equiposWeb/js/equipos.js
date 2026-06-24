let jugadoresEquipos = [];

async function iniciarModuloEquipos() {
    try {
        const resJ = await fetch(`${API_URL}/jugadores.php`);
        jugadoresEquipos = await resJ.json();
        renderizarListaJugadores();

        const resD = await fetch(`${API_URL}/deportes.php`);
        const deportes = await resD.json();
        const sel = document.getElementById('selDeporte');
        sel.innerHTML = deportes.map(d =>
            `<option value="${d.id}" data-num="${d.num_jugadores}">${d.nombre}</option>`
        ).join('');

        document.getElementById('numEquipos')
            .addEventListener('input', actualizarNombresEquipos);
        actualizarNombresEquipos();

    } catch (e) {
        mostrarMensaje('mensajeEquipos', '❌ Error al cargar datos', true);
    }
}

function actualizarNombresEquipos() {
    const num = parseInt(document.getElementById('numEquipos').value);
    const contenedor = document.getElementById('nombresEquipos');
    contenedor.innerHTML = Array.from({ length: num }, (_, i) => `
        <div style="display:flex;flex-direction:column;gap:4px;">
            <label style="font-size:12px;font-weight:bold;color:#546E7A;">
                EQUIPO ${i + 1}
            </label>
            <input type="text" id="nombreEquipo${i}"
                   placeholder="Equipo ${i + 1}"
                   style="padding:8px;border:1px solid #CFD8DC;
                          border-radius:6px;font-size:13px;width:130px;">
        </div>
    `).join('');
}

function renderizarListaJugadores() {
    const lista = document.getElementById('listaJugadoresEquipos');
    const total = document.getElementById('totalJugadores');
    lista.innerHTML = jugadoresEquipos.map(j =>
        `<li>• ${j.nombre} — <em>${j.posicion || '—'}</em> — ${badgeNivel(j.nivel)}</li>`
    ).join('');
    total.textContent = 'Total: ' + jugadoresEquipos.length + ' jugadores';
}

function generarEquipos() {
    const numEquipos = parseInt(document.getElementById('numEquipos').value);

    const selDeporte = document.getElementById('selDeporte');
    const limiteXEquipo = parseInt(
        selDeporte.selectedOptions[0]?.dataset.num || 99
    );

    const nombres = Array.from({ length: numEquipos }, (_, i) => {
        const val = document.getElementById(`nombreEquipo${i}`).value.trim();
        return val || `Equipo ${i + 1}`;
    });

    if (!jugadoresEquipos.length) {
        mostrarMensaje('mensajeEquipos', '⚠️ No hay jugadores registrados', true);
        return;
    }
    if (jugadoresEquipos.length < numEquipos) {
        mostrarMensaje('mensajeEquipos', `⚠️ Necesita al menos ${numEquipos} jugadores`, true);
        return;
    }

    const maxJugadores = limiteXEquipo * numEquipos;
    const jugadoresUsados = jugadoresEquipos.slice(0, maxJugadores);

    if (jugadoresEquipos.length > maxJugadores) {
        mostrarMensaje('mensajeEquipos',
            `⚠️ Solo se usarán ${maxJugadores} jugadores (${limiteXEquipo} por equipo). ` +
            `${jugadoresEquipos.length - maxJugadores} quedan fuera.`, false);
    }

    // Snake draft
    const ordenados = [...jugadoresUsados].sort(
        (a, b) => puntajeNivel(b.nivel) - puntajeNivel(a.nivel)
    );
    const equipos = Array.from({ length: numEquipos }, () => []);
    let direccionIda = true, indice = 0;

    for (const jugador of ordenados) {
        if (equipos[indice].length >= limiteXEquipo) {
            mostrarMensaje('mensajeEquipos',
                `⚠️ Límite de ${limiteXEquipo} jugadores por equipo alcanzado.`, false);
            break;
        }
        equipos[indice].push(jugador);
        if (direccionIda) {
            if (indice === numEquipos - 1) direccionIda = false;
            else indice++;
        } else {
            if (indice === 0) direccionIda = true;
            else indice--;
        }
    }

    document.getElementById('resultadoEquipos').innerHTML = equipos.map((equipo, i) => {
        const puntaje = equipo.reduce((s, j) => s + puntajeNivel(j.nivel), 0);
        const filas   = equipo.map(j =>
            `  • ${j.nombre} [${j.posicion || '—'}] — ${j.nivel} (${puntajeNivel(j.nivel)} pts)`
        ).join('\n');
        return `══════════════════════════════\n` +
               `  ${nombres[i].toUpperCase()}  |  Puntaje: ${puntaje} | ${equipo.length}/${limiteXEquipo} jugadores\n` +
               `══════════════════════════════\n${filas}\n`;
    }).join('\n');

    if (jugadoresEquipos.length <= maxJugadores) {
        mostrarMensaje('mensajeEquipos',
            `✅ ${jugadoresUsados.length} jugadores distribuidos en ${numEquipos} equipos`);
    }
}