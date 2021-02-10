<?php
require(__DIR__.'/../functions.php');
require(__DIR__.'/../model/ModelContact.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	list($errors, $input) = ValidateContactForm();
	if ($errors) {
		showErrors($errors);
	} else {
		proccessForm($input);
	}
} else {
	http_response_code(403);
	die('<h2>Error 403 - Acesso nao autorizado!</h2>');
}
