<?php
/**
 * API para captar leads interesados en el plan PRO.
 * POST { email, telefono } -> envía un email al dueño de la aplicación.
 *
 * No requiere autenticación (se usa desde la pantalla "PRO" tanto en
 * cuentas demo como pro), pero está protegido por rate limiting igual
 * que el resto de endpoints públicos (ver registro.php).
 */

require_once __DIR__ . '/init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método no permitido']);
    exit;
}

require_once __DIR__ . '/middleware/rate_limit.php';
require_once __DIR__ . '/middleware/validate.php';

api_enviar_cabeceras();
rate_limit_verificar();

$dados    = json_decode(file_get_contents('php://input'), true);
$email    = sanitizar_string($dados['email'] ?? '');
$telefono = sanitizar_string($dados['telefono'] ?? '');

$erros = [];

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = 'Introduce un email válido';
}
if ($telefono === '' || mb_strlen($telefono) < 6 || mb_strlen($telefono) > 20) {
    $erros[] = 'Introduce un número de teléfono válido';
}

if (!empty($erros)) {
    http_response_code(422);
    echo json_encode(['erro' => $erros]);
    exit;
}

$destinatario = trim($_ENV['PRO_CONTACT_EMAIL'] ?? '');

if ($destinatario === '' || !filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
    // El propietario aún no ha configurado PRO_CONTACT_EMAIL en el .env
    error_log('[DIVERSPORT] PRO_CONTACT_EMAIL no está configurado (o es inválido) en .env');
    http_response_code(500);
    echo json_encode(['erro' => 'El servicio no está disponible en este momento. Inténtalo más tarde.']);
    exit;
}

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'desconocido';

$asunto = mb_encode_mimeheader('Nueva solicitud de Matchora PRO', 'UTF-8');

$cuerpo = "Se ha recibido una nueva solicitud de información sobre el plan PRO de Matchora.\r\n\r\n"
    . "Email del usuario: {$email}\r\n"
    . "Teléfono del usuario: {$telefono}\r\n"
    . "Fecha: " . date('d/m/Y H:i:s') . "\r\n"
    . "IP: {$ip}\r\n";

$remitente = $_ENV['MAIL_FROM'] ?? ('no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'matchora.app'));

$cabeceras  = "From: Matchora <{$remitente}>\r\n";
$cabeceras .= "Reply-To: {$email}\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";
$cabeceras .= "Content-Transfer-Encoding: 8bit\r\n";
$cabeceras .= 'X-Mailer: PHP/' . phpversion();

$enviado = @mail($destinatario, $asunto, $cuerpo, $cabeceras);

// Registrar el lead en admin_logs (best-effort: si falla, no debe romper la respuesta al usuario)
try {
    require_once __DIR__ . '/conexion.php';
    $stmtLog = $pdo->prepare('INSERT INTO admin_logs (tipo, username, ip, detalhes) VALUES (?, ?, ?, ?)');
    $stmtLog->execute(['pro_interes', $email, $ip, 'Solicitud de información PRO. Teléfono: ' . $telefono]);
} catch (Exception $e) {
    // Silenciar errores de logging, igual que en registro.php
}

if (!$enviado) {
    error_log('[DIVERSPORT] Fallo al enviar email de solicitud PRO (mail() devolvió false)');
    http_response_code(502);
    echo json_encode(['erro' => 'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.']);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);