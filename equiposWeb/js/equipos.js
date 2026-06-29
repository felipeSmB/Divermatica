let jugadoresEquipos = [];

const CAMPO_CONTAINER_ID = 'campoJugadores';

/* =========================
   INICIALIZAÇÃO
========================= */

async function iniciarModuloEquipos() {
    try {
        const resJ = await apiFetch(`${API_URL}/jugadores.php`);
        const resD = await apiFetch(`${API_URL}/deportes.php`);

        if (!resJ || !resJ.ok || !resD || !resD.ok) {
            mostrarMensaje('mensajeEquipos', '❌ Error al cargar datos', true);
            return;
        }

        jugadoresEquipos = await resJ.json();
        renderizarListaJugadores();

        const deportes = await resD.json();
        const sel = document.getElementById('selDeporte');

        sel.innerHTML = deportes.length
            ? deportes.map(d =>
                `<option value="${d.id}" data-num="${d.num_jugadores}">
                    ${escapeHtml(d.nombre)}
                 </option>`
            ).join('')
            : '<option value="">Sin deportes disponibles</option>';

        document.getElementById('numEquipos')
            .addEventListener('input', actualizarNombresEquipos);

        actualizarNombresEquipos();

    } catch (e) {
        mostrarMensaje('mensajeEquipos', '❌ Error al cargar datos', true);
    }
}

/* =========================
   NOMES EQUIPAS
========================= */

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
                style="padding:8px;border:1px solid #CFD8DC;border-radius:6px;font-size:13px;width:130px;">
        </div>
    `).join('');
}

/* =========================
   LISTA JOGADORES
========================= */

function renderizarListaJugadores() {
    const lista = document.getElementById('listaJugadoresEquipos');
    const total = document.getElementById('totalJugadores');

    lista.innerHTML = jugadoresEquipos.map(j =>
        `<li>• ${j.nombre} — <em>${j.posicion || '—'}</em> — ${badgeNivel(j.nivel)}</li>`
    ).join('');

    total.textContent = 'Total: ' + jugadoresEquipos.length + ' jugadores';
}

/* =========================
   GERAR EQUIPAS
========================= */

function generarEquipos() {
    const numEquipos = parseInt(document.getElementById('numEquipos').value, 10);
    const selDeporte = document.getElementById('selDeporte');

    if (!selDeporte.selectedOptions.length) {
        mostrarMensaje('mensajeEquipos', '⚠️ Seleccione un deporte', true);
        return;
    }

    const limiteXEquipo = parseInt(selDeporte.selectedOptions[0]?.dataset.num || '0', 10);

    if (!limiteXEquipo) {
        mostrarMensaje('mensajeEquipos', '⚠️ Deporte inválido', true);
        return;
    }

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

    const ordenados = [...jugadoresUsados].sort(
        (a, b) => puntajeNivel(b.nivel) - puntajeNivel(a.nivel)
    );

    const equipos = Array.from({ length: numEquipos }, () => []);

    let direccionIda = true;
    let indice = 0;

    for (const jugador of ordenados) {

        let tentativas = 0;

        while (equipos[indice].length >= limiteXEquipo && tentativas < numEquipos) {
            if (direccionIda) {
                indice = (indice + 1) % numEquipos;
                if (indice === numEquipos - 1) direccionIda = false;
            } else {
                indice = (indice - 1 + numEquipos) % numEquipos;
                if (indice === 0) direccionIda = true;
            }
            tentativas++;
        }

        if (equipos[indice].length >= limiteXEquipo) break;

        equipos[indice].push(jugador);

        if (direccionIda) {
            indice = (indice + 1) % numEquipos;
        } else {
            indice = (indice - 1 + numEquipos) % numEquipos;
        }
    }

    renderizarEquiposCards(equipos, nombres);
    renderizarCampo(equipos, nombres);

    mostrarMensaje(
        'mensajeEquipos',
        `✅ ${jugadoresUsados.length} jugadores distribuidos en ${numEquipos} equipos`
    );
}

/* =========================
   CARDS EQUIPAS
========================= */

function renderizarEquiposCards(equipos, nomes) {
    const container = document.getElementById('resultadoEquipos');
    container.innerHTML = '';

    equipos.forEach((equipo, i) => {

        const puntaje = equipo.reduce((s, j) => s + puntajeNivel(j.nivel), 0);

        const jogadoresHTML = equipo.map(j => {
            const nivelClass =
                j.nivel === 'Muy Bueno'
                    ? 'nivel-muybueno-card'
                    : j.nivel === 'Bueno'
                        ? 'nivel-bueno-card'
                        : 'nivel-medio-card';

            return `
                <div class="card-jugador ${nivelClass}">
                    <strong>${j.nombre}</strong>
                    <span>${j.posicion || '—'}</span>
                    <span style="float:right">${badgeNivel(j.nivel)}</span>
                </div>
            `;
        }).join('');

        const card = document.createElement('div');
        card.className = 'equipo-card';

        card.innerHTML = `
            <div class="equipo-card-titulo">⚽ ${nomes[i]}</div>
            <div class="equipo-card-puntaje">
                Puntaje: ${puntaje} | ${equipo.length} jugadores
            </div>
            ${jogadoresHTML}
        `;

        container.appendChild(card);
    });
}

/* =========================
   CAMPO
========================= */

function limpiarCampo() {
    const container = document.getElementById(CAMPO_CONTAINER_ID);
    if (container) container.innerHTML = '';
}

function obtenerColorEquipo(index) {
    const cores = [
        '#1e88e5',
        '#e53935',
        '#43a047',
        '#fdd835',
        '#8e24aa',
        '#fb8c00'
    ];
    return cores[index % cores.length];
}

function dibujarJugadorEnCampo(jugador, x, y, color) {
    const container = document.getElementById(CAMPO_CONTAINER_ID);

    const el = document.createElement('div');
    el.className = 'player-token';

    const iniciales = jugador.nombre
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    el.style.left = x + '%';
    el.style.top = y + '%';

    el.innerHTML = `
        <div class="tok-circle" style="background:${color}">
            ${iniciales}
        </div>
        <div class="tok-name">${jugador.nombre}</div>
    `;

    container.appendChild(el);
}

function renderizarCampo(equipos, nombres) {

    limpiarCampo();

    const posiciones = [
        { x: 50, y: 85 },
        { x: 25, y: 70 },
        { x: 75, y: 70 },
        { x: 15, y: 55 },
        { x: 50, y: 55 },
        { x: 85, y: 55 },
        { x: 25, y: 40 },
        { x: 75, y: 40 },
        { x: 50, y: 25 }
    ];

    equipos.forEach((equipo, i) => {

        const color = obtenerColorEquipo(i);

        equipo.forEach((jugador, index) => {

            const pos = posiciones[index % posiciones.length];

            dibujarJugadorEnCampo(jugador, pos.x, pos.y, color);
        });
    });
}

/* =========================
   CAMPO OVERLAY
========================= */

function criarOverlayCampo() {
    if (document.getElementById('campoOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'campoOverlay';
    overlay.className = 'campo-overlay';

    overlay.innerHTML = `
        <button class="fechar-campo" onclick="fecharCampo()">✕</button>
        <div class="campo-svg-wrapper" id="campoSvgWrapper"></div>
    `;

    overlay.addEventListener('click', e => {
        if (e.target === overlay) fecharCampo();
    });

    document.body.appendChild(overlay);
}

function abrirCampo() {
    criarOverlayCampo();

    const sel = document.getElementById('selDeporte');
    const nome = sel.selectedOptions[0]?.text?.toLowerCase().trim() || '';

    const chave = DEPORTE_MAP[nome] || 'fut7';

    document.getElementById('campoSvgWrapper').innerHTML =
        CAMPOS_SVG[chave] || CAMPOS_SVG['fut7'];

    requestAnimationFrame(() => {
        document.getElementById('campoOverlay').classList.add('ativo');
    });
}

function fecharCampo() {
    const overlay = document.getElementById('campoOverlay');
    if (overlay) overlay.classList.remove('ativo');
}