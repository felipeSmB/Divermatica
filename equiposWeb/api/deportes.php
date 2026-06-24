<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require_once 'conexion.php';

$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    case 'GET':
        $stmt = $pdo->query('SELECT * FROM deportes ORDER BY nombre');
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $stmt  = $pdo->prepare(
            'INSERT INTO deportes (nombre, num_jugadores) VALUES (:nombre, :num)'
        );
        $stmt->execute([
            ':nombre' => $datos['nombre'],
            ':num'    => $datos['num_jugadores'] ?? 7,
        ]);
        echo json_encode(['ok' => true, 'id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $stmt  = $pdo->prepare(
            'UPDATE deportes SET nombre=:nombre, num_jugadores=:num WHERE id=:id'
        );
        $stmt->execute([
            ':nombre' => $datos['nombre'],
            ':num'    => $datos['num_jugadores'],
            ':id'     => $datos['id'],
        ]);
        echo json_encode(['ok' => true]);
        break;

    case 'DELETE':
        $id   = $_GET['id'] ?? null;
        if (!$id) { echo json_encode(['error' => 'ID requerido']); break; }
        $stmt = $pdo->prepare('DELETE FROM deportes WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['ok' => true]);
        break;
}
?>