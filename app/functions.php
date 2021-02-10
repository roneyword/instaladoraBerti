<?php
date_default_timezone_set('America/Sao_Paulo');
$protocol = (isset($_SERVER['HTTPS'])) ? 'https://' : 'http://';
define('BASE_URL', $protocol.$_SERVER['HTTP_HOST']);
define('EMAIL_ADMIN', 'webmaster@instaladoraberti.com.br');

function flashMessage($text = 'Default message', $type = 'primary') {
	$message = '<div class="alert alert-' .$type.'">' . $text . '<a href="#" class="close" data-dismiss="alert">&times;</a></div>';
	print $message;
}
