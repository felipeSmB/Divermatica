<?php

require_once __DIR__ . '/init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método no permitido']);
    exit;
}

require_once __DIR__ . '/middleware/rate_limit.php';
require_once __DIR__ . '/middleware/jwt.php';
require_once __DIR__ . '/middleware/validate.php';
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

$dados = json_decode(file_get_contents('php://input'), true) ?? [];
$senha_atual = $dados['senha_atual'] ?? '';
$senha_nova = $dados['senha_nova'] ?? '';
$confirmar_senha_nova = $dados['confirmar_senha_nova'] ?? '';

$erros = [];

if (mb_strlen($senha_nova) < 8) {
    $erros[] = 'La contraseña debe tener al menos 8 caracteres';
}
if ($senha_nova !== $confirmar_senha_nova) {
    $erros[] = 'Las contraseñas no coinciden';
}

if (!empty($erros)) {
    http_response_code(422);
    echo json_encode(['erro' => $erros]);
    exit;
}

$stmt = $pdo->prepare('SELECT password_hash FROM usuarios WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$usuario = $stmt->fetch();

if (!$usuario || !password_verify($senha_atual, $usuario['password_hash'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Senha atual incorreta']);
    exit;
}

$novo_hash = password_hash($senha_nova, PASSWORD_BCRYPT, ['cost' => 12]);
$stmt = $pdo->prepare('UPDATE usuarios SET password_hash = ? WHERE id = ?');
$stmt->execute([$novo_hash, $id]);

echo json_encode(['ok' => true]);
