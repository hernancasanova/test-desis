<?php
require "loadSelects.php";
//para solucionar problema de CORS
header("Access-Control-Allow-Origin: *");
$regiones=returnSelectOption("regiones");
$candidatos=returnSelectOption("candidatos");
$uri=$_SERVER['REQUEST_URI'];
header('Content-type: application/json');
if($uri=='/regiones'){//Se retornan las regiones
    echo json_encode($regiones);
}else if($uri=="/candidatos"){//Se retornan los candidatos
    echo json_encode($candidatos);
}else if($uri=="/votar"){
    //Se obtienen variables
    $nombreYApellido=$_POST["fullName"];
    $alias=$_POST["alias"];
    $rut=$_POST["rut"];
    $email=$_POST["email"];
    $region=$_POST["region"];
    $comuna=$_POST["comuna"];
    $candidato=$_POST["candidato"];
    $metodos_conocimiento=$_POST["metodos_escogidos"];
    $resultado=votar($nombreYApellido,$alias,$rut,$email,$region,$comuna,$candidato,$metodos_conocimiento);
    //echo json_encode($resultado);
    echo json_encode($resultado==0?"Se ha registrado correctamente la votación":"El rut ingresado ya ha emitido su voto");    
}else{
    //Se retornan comunas de la región seleccionada
    $region=substr($uri,9);
    $comunas=returnSelectOption("comunas",$region);
    echo json_encode($comunas);
}
?>
    