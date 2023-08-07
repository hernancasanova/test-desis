validateForm=()=>{
    if(false){
        console.log("pasé por aquí")
        for(var i=0; i<form.elements.length; i++) { 
            var elemento = form.elements[i]; 
            if(elemento.name == "fullName") { 
                if(!elemento.checked) { 
                    return false; 
                } 
            }
            else if(elemento.type == "checkbox") { 
                if(!elemento.checked) { 
                    return false; 
                } 
            }
        }
    }else{
        sendForm();
    }
}
sendForm=()=>{
    console.log("form.elements.length: ",form.elements.length)
    var metodos_escogidos=[];
    //form = document.getElementById("form");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked) { 
            metodos_escogidos.push(checkbox.value) 
        } 
    });
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
        //console.log("result: ");
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
    // document.getElementById("form").addEventListener("submit", function(event){
    //     validateForm();
    //     //event.preventDefault()
    // });
    getRegiones();
    $('#regiones').on('change', function() {
        //Se limpia el selector de comunas dependiendo de la región seleccionada
        $('#comunas')
            .empty()
            .append('<option selected="selected" value="">Seleccione</option>')
        ;
        getComunas(this.value);
    });
    getCandidatos();
});