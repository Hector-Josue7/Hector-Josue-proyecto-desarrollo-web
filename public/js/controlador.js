var db;

(function(){
    if (!('indexedDB' in window)){
        console.err("El navegador no soporta indexedDB");
        return;
    }

    //open crea la base de datos si no existe, en caso contrario la abre para utilizarla
    var solicitud = window.indexedDB.open("PruebaFormularios", 1);//Parametros: nombre, version. La version debe ser entero
    
    solicitud.onsuccess = function(evento){
        db = solicitud.result;
        console.log("Se abrio o se creo la BD");
        actualizarTabla();
    }

    solicitud.onerror = function(evento){
        console.error(evento);
    }

    //Evento que se ejecuta cuando se crea  o actualiza la base datos
    solicitud.onupgradeneeded = function(evento){
        console.log('Se creo o actualizo la BD');
        
        db = evento.target.result;//Obtener referencia de la BD creada
        //Crear contenedores de objetos (ObjectStores)
        var objectStoreUsuarios = db.createObjectStore("usuarios", {keyPath: "codigo", autoIncrement: true});
        objectStoreUsuarios.transaction.oncomplete = function(evento){
            console.log("El object store de usuarios se creo con exito");
        }
        objectStoreUsuarios.transaction.onerror = function(evento){
            console.log("Error al crear el object store de usuarios");
        }
    }

})();
