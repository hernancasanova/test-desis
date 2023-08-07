<?php
require "loadSelects.php";
header("Access-Control-Allow-Origin: *");
$regiones=returnSelectOption("regiones");
$candidatos=returnSelectOption("candidatos");
$uri=$_SERVER['REQUEST_URI'];
header('Content-type: application/json');
if($uri=='/regiones'){
    echo json_encode($regiones);
}else if($uri=="/candidatos"){
    echo json_encode($candidatos);
}else{
    $region=substr($uri,9);
    $comunas=returnSelectOption("comunas",$region);
    echo json_encode($comunas);
}
?>
    