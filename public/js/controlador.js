
//VALIDACION DEL FORMULARIO REGISTRO
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
         if($("#apellido").val()==""){
        campoVacio = campoVacio+"Apellido<br>";
       }  
       if($("#correo").val()==""){
        campoVacio = campoVacio+"Correo<br>";
       }
      
       if($("#pass").val()==""){
        campoVacio = campoVacio+"Contraseña<br>";
       }
       if($("#Confirmpass").val()==""){
        campoVacio = campoVacio+"Confirmación password<br>";
       }
    
       //validamos el formato del email
       if(isEmail($("#correo").val())==false ){
     mensajeError = mensajeError+"<p>Tu dirección de correo no es valida</p>";
       }
      

       if($("#pass").val() != $("#Confirmpass").val()){
        mensajeError = mensajeError+"<p>Las contraseñas no coinciden</p>";
       }
      
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
            exito = true; 
            $("#mensajeExito").html("<p>Enhorabuena, te has registrado con exito...enviando datos</p>");

                $("#mensajeErrorCampos").css("display","none");
       }
    })
// FIN VALIDACION DEL FORMULARIO REGISTRO

//PROBANDO UTILIZAR INDEXED_DB PARA EL FORMULARIO DE REGISTRO CON LOS CAMPOS NOMBRE, APELLIDO Y CORREO
var bd;
function iniciar(){

    botonEnviar =document.getElementById("botonEnviar");
    
 botonEnviar.addEventListener("click", agregarUsuario, false);
 var solicitud = indexedDB.open("baseUsuariosRegistrados");
 solicitud.onsuccess= function(e){
     bd=e.target.result;
 }
 solicitud.onupgradeneeded= function (e) {
     bd=e.target.result;
    var store= bd.createObjectStore("usuarios", {keyPath: 'clave', autoIncrement: true});
     
    store.put({key: 11, value: 33}); // OK
store.put({value: 66}); // throws, since 'key' is not present
 }

} 


function agregarUsuario(){
if(exito){
   
 
   
    
    
    var transaccion = bd.transaction(["usuarios"], "readwrite");
    var almacen = transaccion.objectStore("usuarios");
    var agregar = almacen.add({ nombre: document.getElementById("nombre").value,
                                 apellido:document.getElementById("apellido").value,  
                                 correo:document.getElementById("correo").value});
      agregar.addEventListener("success", mostrar, false);                          
     document.getElementById("nombre").value=""
     document.getElementById("apellido").value=""
     document.getElementById("correo").value=""  

  }
 }


       function mostrar(){
        zonadatos.innerHTML="";
        var transaccion = bd.transaction(["usuarios"], "readonly");
        var almacen = transaccion.objectStore("usuarios");
        var cursor = almacen.openCursor();
        cursor.addEventListener("success", mostrarDatos, false);
    }
    function mostrarDatos(e){
        var cursor=e.target.result;
      
   }
   window.addEventListener("load",iniciar, false);
// FIN DEL CODIGO INDEXED_DB PARA EL FOMULARIO REGISTRO