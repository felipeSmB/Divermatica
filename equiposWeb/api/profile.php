<?php

require_once __DIR__ . '/init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método no permitido']);
    exit;
}

require_once __DIR__ . '/middleware/rate_limit.php';
require_once __DIR__ . '/middleware/jwt.php';
require_once __DIR__ . '/conexion.php';

rate_limit_verificar();

$secret = $_ENV['JWT_SECRET'] ?? '';
$payload = jwt_verificar($secret);
$id = $payload['sub'] ?? null;

if (!$id) {
    http_response_code(401);
    echo json_encode(['erro' => 'Token inválido']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, created_at, role, plano FROM usuarios WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$usuario = $stmt->fetch();

if (!$usuario) {
    http_response_code(404);
    echo json_encode(['erro' => 'Usuario no encontrado']);
    exit;
}

echo json_encode($usuario);
