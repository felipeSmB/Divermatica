<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder preflight del navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require_once 'conexion.php';

$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {


    case 'GET':
        $buscar = $_GET['buscar'] ?? '';
        if ($buscar !== '') {
            $stmt = $pdo->prepare(
                'SELECT * FROM jugadores WHERE nombre LIKE ? ORDER BY nombre'
            );
            $stmt->execute(['%' . $buscar . '%']);
        } else {
            $stmt = $pdo->query('SELECT * FROM jugadores ORDER BY nombre');
        }
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $stmt  = $pdo->prepare(
            'INSERT INTO jugadores (nombre, telefono, mail, posicion, nivel)
             VALUES (:nombre, :telefono, :mail, :posicion, :nivel)'
        );
        $stmt->execute([
            ':nombre'   => $datos['nombre'],
            ':telefono' => $datos['telefono'] ?? '',
            ':mail'     => $datos['mail']     ?? '',
            ':posicion' => $datos['posicion'] ?? '',
            ':nivel'    => $datos['nivel'],
        ]);
        echo json_encode([
            'ok' => true,
            'id' => $pdo->lastInsertId()
        ]);
        break;
		
		
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $stmt  = $pdo->prepare(
            'UPDATE jugadores
             SET nombre=:nombre, telefono=:telefono, mail=:mail,
                 posicion=:posicion, nivel=:nivel
             WHERE id=:id'
        );
        $stmt->execute([
            ':nombre'   => $datos['nombre'],
            ':telefono' => $datos['telefono'] ?? '',
            ':mail'     => $datos['mail']     ?? '',
            ':posicion' => $datos['posicion'] ?? '',
            ':nivel'    => $datos['nivel'],
            ':id'       => $datos['id'],
        ]);
        echo json_encode(['ok' => true]);
        break;

    
    case 'DELETE':
        $id   = $_GET['id'] ?? null;
        if (!$id) { echo json_encode(['error' => 'ID requerido']); break; }
        $stmt = $pdo->prepare('DELETE FROM jugadores WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['ok' => true]);
        break;
}
?>