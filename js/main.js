var errores=[];
limpiarError=(campo)=>{
    console.log("campo: ",campo)
    document.getElementById(campo).innerHTML = "";
}
desplegarErrores=()=>{
    console.log("errores: ",errores)
    errores.forEach(e=>{
        document.getElementById(e.campo).innerHTML = "";
        document.getElementById(e.campo).append(e.msg)
    })
}
validaNombreCompleto=()=>{
    var nombreCompleto = document.getElementById('fullName').value;
    if(nombreCompleto!=""){
        limpiarError("errorFullName");
        return true;
    }
    else{
        errores.push({campo:"errorFullName", msg:"Debe ingresar un nombre y un apellido"})
        return false;
    }
}
esAlfanumerico=(string)=>{
    return /^[a-zA-Z0-9]+$/.test(string);
}
validaAlias=()=>{
    var alias=document.getElementById("alias").value;
    alfanumerico=esAlfanumerico(alias);
    if(alfanumerico && alias.length>5){
        limpiarError("errorAlias");
        return true;
    }else{
        errores.push({campo:"errorAlias", msg:"El alias debe ser alfanumerico y contener más de 5 caracteres"})
        return false;
    }
}
validaRut=()=> {
    var rutCompleto=document.getElementById('rut').value;
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto )){
        errores.push({campo:"errorRut", msg:"El rut ingresado no es correcto"})
        return false;
    }
    var tmp 	= rutCompleto.split('-');
    var digv	= tmp[1]; 
    var rut 	= tmp[0];
    if ( digv == 'K' ) digv = 'k' ;
    if(dv(rut) == digv){
        limpiarError("errorRut");
        return true;
    }else{
        errores.push({campo:"errorRut", msg:"Debe ingresar un rut con el formato 12345678-9"})
        return false;
    }
}
dv=(T)=>{
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
}
validarEmail=()=> {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    // Expresión regular para validar un email
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
        limpiarError("errorEmail");
        return true;
    } else {
        errores.push({campo:"errorEmail", msg:"Debe ingresar un email con un formato correcto"})
        return false;
    }
}
//funcion para validar region, comuna y candidato
validaSelect=(select)=>{
    var opcionSeleccionada=document.getElementById(select).value;
    console.log("opcionSeleccionada: ",opcionSeleccionada)
    if(select=="regiones"){
        console.log("regiones")
        if(opcionSeleccionada!="" ){
            limpiarError("errorRegion");
            return true;
        }else{
            errores.push({campo:"errorRegion", msg:"Debe seleccionar una región"})
            return false;
        }
    }else if(select=="comunas"){
        console.log("comunas")
        if(opcionSeleccionada!="" ){
            limpiarError("errorComuna");
            return true;
        }else{
            errores.push({campo:"errorComuna", msg:"Debe seleccionar una comuna"})
            return false;
        }
    }else if(select=="candidatos"){
        console.log("comunas")
        if(opcionSeleccionada!="" ){
            limpiarError("errorCandidato");
            return true;
        }else{
            errores.push({campo:"errorCandidato", msg:"Debe seleccionar un candidato"})
            return false;
        }
    }
}
//Valida y retorna métodos de concomimiento seleccionados
metodosConocimientos=()=>{
    var metodos_escogidos=[];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked) { 
            metodos_escogidos.push(checkbox.value) 
        } 
    });
    console.log("metodo_escogidos: ",metodos_escogidos.length)
    if(metodos_escogidos.length<2){
        errores.push({campo:"errorMetodosConocimiento", msg:"Debe seleccionar al menos dos opciones"})
    }
    limpiarError("errorMetodosConocimiento");
    return metodos_escogidos;
}
//Función para validar el formulario y mostrar los errores correspondientes o enviar el formulario si está todo OK
validateForm=()=>{
    errores=[];
    var validaMetodosConocimientos=metodosConocimientos().length;
    var validacionNombreCompleto=validaNombreCompleto();
    var validacionRutChileno=validaRut();
    var validacionAlias=validaAlias();
    var validacionRegiones=validaSelect("regiones");
    var validacionComunas=validaSelect("comunas");
    var validacionCandidatos=validaSelect("candidatos");
    if(!(validarEmail() && validaMetodosConocimientos>1 && validacionNombreCompleto && validacionRutChileno && validacionAlias && validacionRegiones && validacionComunas &&  validacionCandidatos)){
        desplegarErrores();
    }else{//se procede a realizar la votación al cumplirse todas las validaciones solicitadas
        errores.forEach(e=>{
            document.getElementById(e.campo).innerHTML = "";
        })
        sendForm();
    }
}
sendForm=()=>{
    console.log("form.elements.length: ",form.elements.length)
    var metodos_escogidos=metodosConocimientos();
    console.log("metodos_Escogidos: ",metodos_escogidos)
    $.ajax({url: "http://localhost:8001/votar",type:'POST',
    data:{
        fullName:document.getElementById("fullName").value,
        alias:document.getElementById("alias").value,
        rut:document.getElementById("rut").value,
        email:document.getElementById("email").value,
        region:document.getElementById("regiones").value,
        comuna:document.getElementById("comunas").value,
        candidato:document.getElementById("candidatos").value,
        metodos_escogidos:metodos_escogidos
    } ,success: function(result){
        alert(result);
    }});
}
getRegiones=()=>{
    $.ajax({url: "http://localhost:8001/regiones", success: function(result){
        var selectElement = $("#regiones");
        for (var i = 0; i < result.length; i++) {
            var optionText = result[i].region;
            var optionValue = result[i].id;
            selectElement.append($("<option>", {
            value: optionValue,
            text: optionText
            }));
        }
    }});
}

//Se obtienen las comunas por la región que se está pasando por parámetro
getComunas=(region)=>{
    $.ajax({url: "http://localhost:8001/comunas/"+region, 
    success: function(result){
        var selectElement = $("#comunas");
        for (var i = 0; i < result.length; i++) {
            var optionText = result[i].comuna;
            var optionValue = result[i].id;
            selectElement.append($("<option>", {
            value: optionValue,
            text: optionText
            }));
        }
    }});
}
getCandidatos=()=>{
    $.ajax({url: "http://localhost:8001/candidatos", success: function(result){
        var selectElement = $("#candidatos");
        for (var i = 0; i < result.length; i++) {
            var optionText = result[i].nombre;
            var optionValue = result[i].id;
            selectElement.append($("<option>", {
            value: optionValue,
            text: optionText
            }));
        }
    }});
}
$( document ).ready(function() {
    //Se obtienen las regiones para completar el selector
    getRegiones();
    $('#regiones').on('change', function() {
        //Se limpia el selector de comunas dependiendo de la región seleccionada
        $('#comunas')
            .empty()
            .append('<option selected="selected" value="">Seleccione</option>')
        ;
        getComunas(this.value);
    });
    //se obtienen los candidatos
    getCandidatos();
});