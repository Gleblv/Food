<?php
$_POST = json_decode(file_get_contents("php://input"), true); // переводим данные из формата json
echo var_dump($_POST); // Позволяет увидеть данные которые приходят с клиента