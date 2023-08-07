<?php
function returnSelectOption($select,$region=null){
    //sqls para obtener regiones, comunas o candidatos
    $sqlRegiones="SELECT id, region FROM regiones";    
    $sqlComunas="SELECT c.id, c.comuna FROM comunas c WHERE c.provincia_id IN (SELECT p.id FROM provincias p WHERE region_id = ".$region.");";
    $sqlCandidatos="SELECT id, nombre FROM candidatos";
    $regiones=array();
    $comunas=array();
    $candidatos=array();
    $mysqli = new mysqli('db', 'hernan', 'testdesis', 'sistema_votacion');
    // Se verifica la conexión a la base de datos
    // if(!$mysqli){
    //       echo"no se pudo conectar con el servidor";
    // }else{
    //    echo"Se pudo conectar con el servidor";
    // }
    //obtención de regiones desde la base de datos
    if($select=="regiones"){
        $queryRegiones = mysqli_query($mysqli, $sqlRegiones);
        while ($row = mysqli_fetch_assoc($queryRegiones)) {     
            array_push($regiones,$row);  
        }
        return $regiones;
    }
    //Obtención de comunas
    else if($select=="comunas"){
        $queryComunas = mysqli_query($mysqli, $sqlComunas);
        while ($row = mysqli_fetch_assoc($queryComunas)) {     
            array_push($comunas,$row);
        }
        return $comunas;
    //Obtención de candidatos
    }else{
        $queryCandidatos = mysqli_query($mysqli, $sqlCandidatos);
        while ($row = mysqli_fetch_assoc($queryCandidatos)) {     
            array_push($candidatos,$row);
        }
        return $candidatos;
    }
}
function votar($nombreYApellido,$alias,$rut,$email,$region,$comuna,$candidato,$metodos_conocimiento){
    $sqlVerificaRutDuplicado="SELECT rut FROM votaciones WHERE rut='".$rut."'"; 
    $sqlVoto="INSERT INTO votaciones (rut,nombreYapellido,alias,email,region_id,comuna_id,candidato_id) VALUES (".$rut.",'".$nombreYApellido."','".$alias."','".$email."',".$region.",".$comuna.",".$candidato.")";
    //$sqlV="INSERT INTO votaciones (rut,nombreYapellido,alias,email,region_id,comuna_id,candidato_id) VALUES (".$rut.",'".$nombreYApellido."','".$alias."','".$email."',".$region.",".$comuna.",".$candidato.")";
    $mysqli = new mysqli('db', 'hernan', 'testdesis', 'sistema_votacion');
    $queryVerificaRutDuplicado = mysqli_query($mysqli, $sqlVerificaRutDuplicado);
    //Si se detecta que el rut ya se encuentra registrado se devuelve el número de veces ya encontrado
    if(mysqli_num_rows($queryVerificaRutDuplicado)>0)return mysqli_num_rows($queryVerificaRutDuplicado);
    $queryVoto = mysqli_query($mysqli, $sqlVoto);
    //Si no se encuentra registrado el rut en la tabla de votaciones se devuelve cero para que el index.php traduzca este valor al mensaje correspondiente
    return 0;
}
?>