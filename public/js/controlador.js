
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
     bd.createObjectStore("usuarios", {keyPath: "clave"});
     
 }

} 


function agregarUsuario(){

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    
    
    var transaccion = bd.transaction(["usuarios"], "readwrite");
    var almacen = transaccion.objectStore("usuarios");
    var agregar = almacen.add({ nombre: nombre,
                                 apellido: apellido,  
                                 correo: correo});
      agregar.addEventListener("success", mostrar, false);                          
     document.getElementById("nombre").value=""
     document.getElementById("apellido").value=""
     document.getElementById("correo").value=""                           
    
    
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