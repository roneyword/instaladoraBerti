<?php
// Importar as classes 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Carregar o autoloader do composer
require 'vendor/autoload.php';
// Instância da classe
$mail = new PHPMailer(true);
try
{
    // Configurações do servidor
    $mail->isSMTP();        //Devine o uso de SMTP no envio
    $mail->SMTPAuth = true; //Habilita a autenticação SMTP
    $mail->Username   = 'contato@listsites.ga';
    $mail->Password   = 'tel77820933';
    // Criptografia do envio SSL também é aceito
    $mail->SMTPSecure = 'tls';
    // Informações específicadas pelo Google
    $mail->Host = 'listsites.ga';
    $mail->Port = 25;

    $mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true ) );

    // Define o remetente
    $mail->setFrom('contato@listsites.ga', 'Maxmiler Freitas');
    // Define o destinatário
    $mail->addAddress('milerfreitas@gmail.com', 'Destinatário');
    // Conteúdo da mensagem
    $mail->isHTML(true);  // Seta o formato do e-mail para aceitar conteúdo HTML
    $mail->Subject = 'Mensagem de teste';
    //$mail->Body    = 'Este é o corpo da mensagem <b>Olá em negrito!</b>';
    $mail->Body    = $html;
    //$mail->AltBody = 'Este é o corpo da mensagem para clientes de e-mail que não reconhecem HTML';
    // Enviar
    $mail->send();
    print 'A mensagem foi enviada!';
}
catch (Exception $e)
{
    print 'Message could not be sent. Mailer Error: {'.$mail->ErrorInfo.'}';
}