<?php
function ValidateContactForm() {
	$input = array();
	$errors = array();
	$input['full_name'] = filter_input(INPUT_POST, 'full_name', FILTER_SANITIZE_STRING) ?? '';
	if (empty($input['full_name'])) {
		$errors[] = 'Informe seu nome.';
	}
	$input['email'] = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
	if (!$input['email']) {
		$errors[] = 'Informe um e-mail válido.';
	}

	$input['phone'] = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
	if (!preg_match('#^\(\d{2}\) (9|)[4-9]\d{3}-\d{4}$#', $input['phone'])) {
		$errors[] = 'Informe o número de telefone no formato correto.';
	}

	// Campo para pegar possíveis Boots, caso esse campo seja preenchido não processamos o formulário e redirecionamos.
	$input['honey'] = filter_input(INPUT_POST, 'subject_honey', FILTER_SANITIZE_STRING);

	$input['message'] = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
	if (empty($input['message'])) {
		$errors[] = 'Você deve deixar uma mensagem.';
	}
	return array($errors, $input);
}

function showErrors($errors = array()) {
	print 'Oops! Encontramos alguns erros. Corrija-os para prosseguir.';
	print '<hr>';
	print '<ol><li>';
	print implode('</li><li>', $errors);
	print '</li></ol>';
	//print '<hr>';
}

function proccessForm($input) {
	// Verifica se o campo oculto foi preenchido
	if (!empty($input['honey'])) {
		print '<script>window.location.href = "http://localhost";</script>';
	} else {
		// chama a tela message-body
		$messageBody = file_get_contents(__DIR__.'/../view/message-body.html');
		$search = array('{USER}', '{EMAIL}', '{PHONE}', '{MESSAGE}');
		$replace = array($input['full_name'], $input['email'], $input['phone'], $input['message']);
		$messageBody = str_replace($search, $replace, $messageBody);
		print nl2br($messageBody);

		/*
		* Vamos notificar por email o administrador do site.
		*/
		$sendEmailTo = 'instaladoraberti@hotmail.com';
		$subject = 'Contato do Site: Instaladora Berti';
		// chama a tela email-body
		$emailBody = file_get_contents(__DIR__.'/../view/email-body.html');
		$search = array('{USER}', '{EMAIL}', '{PHONE}', '{MESSAGE}', '{TIME}');
		$replace = array($input['full_name'], $input['email'], $input['phone'], $input['message'], date('d/m/Y à\s H:m:s'));
		$emailBody = str_replace($search, $replace, $emailBody);

		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <'.EMAIL_ADMIN.'>' . "\r\n";

		if (!mail($sendEmailTo,$subject,$emailBody,$headers)) {
			//print 'Houve um erro no envio do email.';
		}
	}
}
