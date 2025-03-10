<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("./router/router.php");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
handleRequest($uri, $routes);

// error_log('Sou um log');
// echo "Olá mundo";

// exemplo de insert
// $stmt = $myPDO->prepare("INSERT INTO CATEGORIES (name, tax) VALUES (:name, :tax)");
// $stmt->execute("name" => $name, "tax" => $tax);

// exemplo de fetch
// $statement1 = $myPDO->query("SELECT * FROM mytable");
// $data = $statement1->fetch();

// echo "<br>";
// print_r($data);

// // exemplo de fetch2
// $statement2 = $myPDO->query("SELECT * FROM mytable");
// $data2 = $statement2->fetchALL();

// echo "<br>";
// print_r($data2);