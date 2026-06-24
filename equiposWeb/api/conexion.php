<?php
$host     = 'localhost';
$db       = 'equipos';
$usuario  = 'root';
$password = '';
$charset  = 'utf8mb4';

$pdo = new PDO(
    "mysql:host=$host;dbname=$db;charset=$charset",
    $usuario,
    $password,
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
);
?>