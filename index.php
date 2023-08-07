<?php
   //conectamos con el servidor
   //$conectar=@mysql_connect('localhost','root','');
   $mysqli = new mysqli('db', 'hernan', 'testdesis', 'sistema_votacion');
   //$mysqli = mysqli_connect('db', 'hernan', 'testdesis', 'sistema_votacion','3306');
   //$mysqli->set_charset("utf8");
   //verificamos la conexion
   if(!$mysqli){
   	  echo"no se pudo conectar con el servidor";
   }else{
      echo"Se pudo conectar con el servidor";
   	   // $base=mysql_select_db('usuarios');
   	   // if(!$base){
   	   // 	   echo"no se encontro la base de datos";
   	   // }
   }
   //$nombre=$_POST['nombre'];
   //$correo=$_POST['correo'];
   //$mensaje=$_POST['mensaje'];
   //var_dump($_POST);
   //hacemos la sentencia de sql
   $sqlRegiones="SELECT id, region FROM regiones";
   $sqlComunas="SELECT id, comuna FROM comunas";
   $sqlCandidatos="SELECT id, nombre FROM candidatos";
   $regiones=array();
   $comunas=array();
   $candidatos=array();
   //ejecutamos la sentencia de sql
   //$result=mysqli_query($mysqli,$sql);
   print_r("<br/>");
   //regiones
   $queryRegiones = mysqli_query($mysqli, $sqlRegiones);
   while ($row = mysqli_fetch_assoc($queryRegiones)) {     
		array_push($regiones,$row);
      //print_r($row);   
   }
   //comunas
   $queryComunas = mysqli_query($mysqli, $sqlComunas);
   while ($row = mysqli_fetch_assoc($queryComunas)) {     
		array_push($comunas,$row);
      //print_r($row);   
   }
   //candidatos
   $queryCandidatos = mysqli_query($mysqli, $sqlCandidatos);
   while ($row = mysqli_fetch_assoc($queryCandidatos)) {     
		array_push($candidatos,$row);
      //print_r($row);   
   }
   var_dump($regiones);
   var_dump($comunas);
   var_dump($candidatos);
   //$row = mysqli_fetch_array($result, MYSQLI_BOTH);
  // $row = mysqli_fetch_assoc($result);
   //var_dump($row);
   //echo$row[0];
   //$ejecutar=mysql_query($sql);
   //verificamos la ejecución
   /*if(!$ejecutar){
   	  echo"hubo algun error";
   }else{
      echo $ejecutar;
   	  //echo"datos guardados correctamente<br><a href='index.html'>Volver</a>";
   }*/
?>