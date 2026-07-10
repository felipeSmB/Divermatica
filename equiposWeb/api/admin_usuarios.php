<?php
/**
 * API para gestión de usuarios administrativos
 * GET - listar usuarios
 * GET ?id=N - obtener usuario específico
 * DELETE ?id=N - eliminar usuario
 * PUT - actualizar role
 */

require_once __DIR__ . '/init.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    http_response_code(200); 
    exit; 
}

require_once __DIR__ . '/admin_verificar.php';
require_once __DIR__ . '/conexion.php';
require_once __DIR__ . '/middleware/rate_limit.php';

$planoColExists = false;
try {
    $colCheck = $pdo->query("SHOW COLUMNS FROM usuarios LIKE 'plano'");
    $planoColExists = (bool)$colCheck->fetch();
} catch (Exception $e) {}

rate_limit_verificar();

// GET - listar o un usuario específico
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        // Obtener usuario específico
        $id = (int)$_GET['id'];
        $stmt = $pdo->prepare($planoColExists
            ? 'SELECT id, username, created_at, role, bloqueado, plano FROM usuarios WHERE id = ?'
            : 'SELECT id, username, created_at, role, bloqueado FROM usuarios WHERE id = ?');
        $stmt->execute([$id]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['erro' => 'Usuario no encontrado']);
            exit;
        }
        
        echo json_encode($usuario);
    } else {
        // Listar todos los usuarios
        $stmt = $pdo->prepare($planoColExists
            ? 'SELECT id, username, created_at, role, bloqueado, plano FROM usuarios ORDER BY created_at DESC'
            : 'SELECT id, username, created_at, role, bloqueado FROM usuarios ORDER BY created_at DESC');
        $stmt->execute();
        $usuarios = $stmt->fetchAll();
        echo json_encode(['usuarios' => $usuarios]);
    }
    exit;
}

// DELETE - eliminar usuario
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'ID requerido']);
        exit;
    }
    
    $id = (int)$_GET['id'];
    
    // No permitir eliminar al propio usuario logado
    if ($payload['sub'] == $id) {
        http_response_code(400);
        echo json_encode(['erro' => 'No puedes eliminar tu propia cuenta']);
        exit;
    }
    
    // Verificar si es el último admin
    $stmtCheck = $pdo->prepare('SELECT COUNT(*) as admin_count FROM usuarios WHERE role = "admin"');
    $stmtCheck->execute();
    $result = $stmtCheck->fetch();
    
    if ($result['admin_count'] <= 1) {
        http_response_code(400);
        echo json_encode(['erro' => 'No se puede eliminar el último administrador']);
        exit;
    }
    
    // Verificar que el usuario a eliminar es realmente un admin
    $stmtVerify = $pdo->prepare('SELECT role FROM usuarios WHERE id = ?');
    $stmtVerify->execute([$id]);
    $user = $stmtVerify->fetch();
    
    if ($user && $user['role'] === 'admin' && $result['admin_count'] === 1) {
        http_response_code(400);
        echo json_encode(['erro' => 'No se puede eliminar el último administrador']);
        exit;
    }
    
    // Eliminar usuario
    $stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = ?');
    $stmt->execute([$id]);
    
    echo json_encode(['ok' => true]);
    exit;
}

// PUT - actualizar role o bloqueo
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $datos = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($datos['id'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'ID requerido']);
        exit;
    }
    
    $id = (int)$datos['id'];

    if ($payload['sub'] == $id) {
        http_response_code(400);
        echo json_encode(['erro' => 'No puedes modificar tu propia cuenta']);
        exit;
    }

    $updates = [];
    $params = [];

    if (isset($datos['role'])) {
        $role = $datos['role'];
        if (!in_array($role, ['admin', 'user'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Role inválido. Debe ser "admin" o "user"']);
            exit;
        }
        $updates[] = 'role = ?';
        $params[] = $role;
    }

    if (isset($datos['bloqueado'])) {
        $bloqueado = (int)$datos['bloqueado'];
        if (!in_array($bloqueado, [0, 1], true)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Bloqueado inválido. Debe ser 0 o 1']);
            exit;
        }
        $updates[] = 'bloqueado = ?';
        $params[] = $bloqueado;
    }

    if (isset($datos['plano'])) {
        if (!$planoColExists) {
            http_response_code(400);
            echo json_encode(['erro' => 'Plano não disponível nesta base de dados']);
            exit;
        }
        $plano = $datos['plano'];
        if (!in_array($plano, ['demo', 'pro'], true)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Plano inválido. Debe ser demo ou pro']);
            exit;
        }
        $updates[] = 'plano = ?';
        $params[] = $plano;
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['erro' => 'Se requiere role, bloqueado o plano']);
        exit;
    }

    $params[] = $id;
    $stmt = $pdo->prepare('UPDATE usuarios SET ' . implode(', ', $updates) . ' WHERE id = ?');
    $stmt->execute($params);
    
    echo json_encode(['ok' => true]);
    exit;
}

// Método no permitido
http_response_code(405);
echo json_encode(['erro' => 'Método no permitido']);
?>
