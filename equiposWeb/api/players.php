<?php

require_once __DIR__ . '/init.php';

require_once __DIR__ . '/middleware/rate_limit.php';
require_once __DIR__ . '/middleware/jwt.php';
require_once __DIR__ . '/middleware/validate.php';
require_once __DIR__ . '/conexion.php';

rate_limit_verificar();

$secret  = $_ENV['JWT_SECRET'] ?? '';
$payload = jwt_verificar($secret);
$usuario_id = (int) $payload['sub'];
$metodo = $_SERVER['REQUEST_METHOD'];

define('JUGADORES_LIMITE_DEMO', 22);

function obtener_plano_usuario(PDO $pdo, int $usuario_id): string {
    try {
        $col = $pdo->query("SHOW COLUMNS FROM usuarios LIKE 'plano'");
        if (!$col->fetch()) return 'demo';
    } catch (Exception $e) {
        return 'demo';
    }
    $stmt = $pdo->prepare('SELECT plano FROM usuarios WHERE id = ?');
    $stmt->execute([$usuario_id]);
    return $stmt->fetch()['plano'] ?? 'demo';
}

$plano = obtener_plano_usuario($pdo, $usuario_id);

switch ($metodo) {

    case 'GET':
        $buscar     = sanitizar_string($_GET['buscar'] ?? '');
        $deporte_id = filter_var($_GET['deporte_id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);

        $query  = 'SELECT j.*, d.nombre AS deporte_nombre
                    FROM jugadores j
                    LEFT JOIN deportes d ON d.id = j.deporte_id
                    WHERE j.usuario_id = ?';
        $params = [$usuario_id];

        if ($buscar !== '') {
            $query   .= ' AND j.nombre LIKE ?';
            $params[] = '%' . $buscar . '%';
        }
        if ($deporte_id) {
            $query   .= ' AND j.deporte_id = ?';
            $params[] = $deporte_id;
        }

        $query .= ' ORDER BY j.nombre';

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        if ($plano === 'demo') {
            $stmtCount = $pdo->prepare('SELECT COUNT(*) AS total FROM jugadores WHERE usuario_id = ?');
            $stmtCount->execute([$usuario_id]);
            if ((int) $stmtCount->fetch()['total'] >= JUGADORES_LIMITE_DEMO) {
                http_response_code(403);
                echo json_encode(['erro' => 'Límite del plan demo alcanzado (' . JUGADORES_LIMITE_DEMO . ' jugadores). Actualiza a Pro para jugadores ilimitados.']);
                exit;
            }
        }
        $stmtCount = $pdo->prepare('SELECT COUNT(*) AS total FROM jugadores WHERE usuario_id = ?');
            $stmtCount->execute([$usuario_id]);
            if ((int) $stmtCount->fetch()['total'] >= JUGADORES_LIMITE_DEMO) {
                http_response_code(403);
                echo json_encode(['erro' => 'Límite del plan demo alcanzado (' . JUGADORES_LIMITE_DEMO . ' jugadores). Actualiza a Pro para jugadores ilimitados.']);
                exit;
            }


        $raw   = json_decode(file_get_contents('php://input'), true) ?? [];
        $dados = validar_jogador($raw, $pdo);
        $stmt  = $pdo->prepare(
            'INSERT INTO jugadores (nombre, telefono, mail, posicion, nivel, deporte_id, usuario_id)
             VALUES (:nombre, :telefono, :mail, :posicion, :nivel, :deporte_id, :usuario_id)'
        );
        $stmt->execute([
            ':nombre'     => $dados['nombre'],
            ':telefono'   => $dados['telefono'],
            ':mail'       => $dados['mail'],
            ':posicion'   => $dados['posicion'],
            ':nivel'      => $dados['nivel'],
            ':deporte_id' => $dados['deporte_id'],
            ':usuario_id' => $usuario_id,

        ]);
        http_response_code(201);
        echo json_encode(['ok' => true, 'id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $raw   = json_decode(file_get_contents('php://input'), true) ?? [];
        $dados = validar_jogador($raw, $pdo);
        $id    = filter_var($raw['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido']);
            exit;
        }

        $stmtCheck = $pdo->prepare('SELECT id FROM jugadores WHERE id = ? AND usuario_id = ?');
        $stmtCheck->execute([$id, $usuario_id]);
        if (!$stmtCheck->fetch()) {
            http_response_code(404);
            echo json_encode(['erro' => 'Jugador no encontrado']);
            exit;
        }

        $stmt = $pdo->prepare(
            'UPDATE jugadores
             SET nombre=:nombre, telefono=:telefono, mail=:mail,
                 posicion=:posicion, nivel=:nivel, deporte_id=:deporte_id
             WHERE id=:id AND usuario_id=:usuario_id'
        );
        $stmt->execute([
            ':nombre'     => $dados['nombre'],
            ':telefono'   => $dados['telefono'],
            ':mail'       => $dados['mail'],
            ':posicion'   => $dados['posicion'],
            ':nivel'      => $dados['nivel'],
            ':deporte_id' => $dados['deporte_id'],
            ':id'         => $id,
            ':usuario_id' => $usuario_id,
        ]);
        echo json_encode(['ok' => true]);
        break;

    case 'DELETE':
        $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido']);
            exit;
        }
        $stmt = $pdo->prepare('DELETE FROM jugadores WHERE id = ? AND usuario_id = ?');
        $stmt->execute([$id, $usuario_id]);
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['erro' => 'Jugador no encontrado']);
            exit;
        }
        echo json_encode(['ok' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
}