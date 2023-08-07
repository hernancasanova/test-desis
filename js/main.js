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