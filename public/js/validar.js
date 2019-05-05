var exito = false;
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

    $("#botonEnviar").click(function(){
        var campoVacio="";
        var mensajeError="";
       // verificacion de campos no vacios
       if($("#nombre").val()==""){
        campoVacio = campoVacio+"Nombre<br>";
         }  
  
       if($("#correo").val()==""){
        campoVacio = campoVacio+"Correo<br>";
       }
      
       if($("#pass").val()==""){
        campoVacio = campoVacio+"Contraseña<br>";
       }
       /*if($("#pass2").val()==""){
        campoVacio = campoVacio+"Confirmación password<br>";
       }*/
       
       if($("#select-plan").val()==""){
        campoVacio = campoVacio+"Plan <br>";
       }
       //validamos el formato del email
       if(isEmail($("#correo").val())==false ){
     mensajeError = mensajeError+"<p>Tu dirección de correo no es valida</p>";
       }
      
/* if($("#pass").val() != $("#Confirmpass").val()){
        mensajeError = mensajeError+"<p>Las contraseñas no coinciden</p>";
       }
       */
      
       if(campoVacio!=""){
           mensajeError = "<p>Los siguientes campos estan vacios: </p>"+campoVacio+mensajeError;
       }
       if(mensajeError!=""){
           $("#mensajeErrorCampos").html(mensajeError);
       }
       else{
             /*La idea es enviar esta variable al archivo externo, no estoy seguro si en el archivo 
            externo de controlador se pueda usar jQuery, en todo caso si puede arreglarme esa duda le agradeceria 
            un comentario en el codigo	
             */
    

       
                $("#botonEnviar").click(function(){
                    var parametros = `nombre=${$("#nombre").val()}
                    &correo=${$("#correo").val()}
                    &pass=${$("#pass").val()}
                  &form-tipo-plan=${$("#form-tipo-plan").val()}`;
                    console.log("Informacion a enviar: " + parametros);
                    
                    $.ajax({
                    url:"/usuarios/signup",
                    method:"POST",
                    data: parametros, //Cadena en formato URLEncoded
                    dataType: 'json', //Formato de la respuesta: text, html, xml, json...
                    success: function(respuesta){ //En el parametro respuesta viene todo lo que el servidor envia
                    
                        $("#mensajeExito").html("<p>Enhorabuena, te has registrado con exito...enviando datos</p>");

                        $("#mensajeErrorCampos").css("display","none");
                        console.log(respuesta);
                    },
                    error: function(error){ //En caso de fallar por algun error HTTP
                    console.log(error);
                    }
                    });
                    });
       
    
       
            }
    })





 
  
  