/*
$("#btn-enviar").click(function(){
    var parametros = `nombre=${$("#nombre").val()}
                    &apellido=${$("#apellido").val()}
                    &edad=${$("#edad").val()}
                    &password=${$("#password").val()}
                    &fecha=${$("#fecha").val()}
                    &pais=${$("#pais").val()}`;
    console.log(parametros);
    $.ajax({
        url:"/guardar",
        method:"GET",
        data: parametros,
        dataType:"json", //json
        success: function(respuesta){ //200 OK
            console.log(respuesta);
        },
        error:function(error){
            console.error(error);
        }
    });
});




*/

function validacion() {
    if (condicion que debe cumplir el primer campo del formulario) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de...');
      return false;
    }
    else if (condicion que debe cumplir el segundo campo del formulario) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de...');
      return false;
    }
    ...
    else if (condicion que debe cumplir el último campo del formulario) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de...');
      return false;
    }
  
    // Si el script ha llegado a este punto, todas las condiciones
    // se han cumplido, por lo que se devuelve el valor true
    return true;
  }

  function validacion(){
    var   nombre = document.getElementById("nombre").value;
    
    var correo = document.getElementById("correo").value;
  
  
  
  if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)
  && apellido == null || apellido.length == 0 || /^\s+$/.test(apellido) ) {
    return false;
  }
  else if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(correo))){
      return false;
  }
  var ano = document.getElementById("ano").value;
  var mes = document.getElementById("mes").value;
  var dia = document.getElementById("dia").value;
  
  var fecha = new Date(ano, mes, dia);
   
  if( !isNaN(valor) ) {
    return false;
  }
  var indice = document.getElementById("plan").selectedIndex;
  if( indice == null || indice == 0 ) {
    return false;
  }
  }