const middlewares = require('../middlewares');
var bdconexion = require('../bd/bdconfig');

/* 
/signin
/registrarse
/falloUsuarioPass
*/

module.exports = function (app, passport) {
    app.get("/", middlewares.paginaInicio, function (req, res) {
        res.render('index');
    });

    app.get("/signin", middlewares.loginRegistro, function (req, res) {
        res.render('signin', { message: req.flash('message') });

    });

    app.get("/registrarse", middlewares.loginRegistro, function (req, res) {
        res.render('registrarse', { message: req.flash('mensaje-login') });
    });

    app.post("/signin", passport.authenticate('local', {
        successRedirect: '/exitoso',
        failureRedirect: '/falloUsuarioPass',
        failureFlash: true
    }), function (req, res, info) {
        //res.render('prueba', { title: 'Pug', mensaje: 'Inicio de sesión exitoso'});
    });

    app.post("/registrarse", passport.authenticate('local-registro', {
        successRedirect: '/registroexitoso',
        failureRedirect: '/falloregistro',
        failureFlash: true
    }), function (req, res, info) {
        //res.render('prueba', { title: 'Pug', mensaje: 'Inicio de sesión exitoso'});
    });

    app.get("/falloUsuarioPass", function (req, res) {
        req.flash('message', "Nombre de usuario o contraseña incorrectos");
        res.redirect("/signin");
    });

    app.get("/falloregistro", function (req, res) {
        req.flash('mensaje-login', 'Ese correo electrónico ya está registrado');
        res.redirect("/registrarse");
    });

    app.get("/registroexitoso", function (req, res) {
        req.flash('mensaje-login', '¡Bienvenido(a) a la familia DevCloud');
        res.redirect("/perfil");
    });

    app.get("/exitoso", function (req, res) {
        req.flash('message', '¡Inicio de sesión exitoso!');
        res.redirect("/dashboard");
    });
    app.get("/iniciarsesion", function (req, res) {
        req.flash('message', 'Necesitas iniciar sesión para acceder a esta página');
        res.redirect("/signin");
    });
    app.get('/dashboard', middlewares.isAuthenticated, function (req, res, netx) {
        var nombreUsuario = req.session.user.Nombre;
        res.render('dashboard', { nombreUsuario: nombreUsuario, message: req.flash('message') });
    });
    app.get('/perfil', middlewares.isAuthenticated, function (req, res, netx) {
        //console.log("Get perfil");
        var nombreUsuario = req.session.user.nombre;
        var apellidoUsuario = req.session.user.apellido;
        var aliasUsuario = req.session.user.alias;
        res.render('perfil', {
            nombreUsuario: nombreUsuario,
            apellidoUsuario: apellidoUsuario,
            aliasUsuario: aliasUsuario,
            message: req.flash('mensaje-login')
        });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/signin');
    });

    app.get("/datosperfil", middlewares.isAuthenticated, function (req, res, next) {
        bdconexion.query(`select a.nombre, a.apellido, a.correo, a.alias,
                        b.tipo, b.proyectosPlan
                        from usuarios a
                        inner join plan b
                        on(a.idPlan = b.idPlan)
                        where a.Id = ?;`,
            [req.session.user.Id],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            });
    });

    app.post("/datosperfil", function (req, res) {
        bdconexion.query(`update usuarios set correo = ?, alias = ? where Id = ?;`,
            [req.body.correo, req.body.alias, req.session.user.Id],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });

    app.post("/actualizarplan", function (req, res) {
        bdconexion.query(`update usuarios set idPlan = ? where Id = ?`,
            [req.body.plan, req.session.user.Id],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });

    app.get("/obtenerproyectos", middlewares.isAuthenticated, function (req, res) {
        bdconexion.query(`select idProyecto, nombreProyecto, descripcionProyecto from proyectos where idUsuario = ?`,
            [req.session.user.Id],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });

    app.post("/actualizarproyectos", function (req, res) {
        bdconexion.query(`update proyectos set nombreProyecto = ?, descripcionProyecto = ? where idProyecto = ?`,
            [req.body.nuevoNombre, req.body.nuevaDesc, req.body.idProyecto],
            function (error, data, fields) {
                if (error) res.send(error);
                console.log(data);
                res.send(data);
                res.end();
            })
    });

    app.post("/crearproyectos", function (req, res) {
        bdconexion.query(`insert into proyectos (nombreProyecto, descripcionProyecto, idUsuario) values (?, ?, ?)`,
            [req.body.nombreProyecto, req.body.descProyecto, req.session.user.Id],
            function (error, data, fields) {
                if (error) res.send(error);
                console.log(data);
                res.send(data);
                res.end();
            })
    });

    app.post("/eliminarproyecto", function (req, res) {
        bdconexion.query(`delete from proyectos where idProyecto = ?`,
            [req.body.idProyecto],
            function (error, data, fields) {
                if (error) res.send(error);
                console.log(data);
                res.send(data);
                res.end();
            })
    });


    app.get("/proyecto/:id", middlewares.isAuthenticated, function(req, res){
        req.session.idProyecto = req.params.id;
        res.redirect("/proyecto");
        //res.render("proyecto", {idProyecto: req.params.id});
    });

    app.get("/proyecto", middlewares.isAuthenticated, function(req, res){
        res.render("proyecto");
    });

    app.get("/obteneridproyecto", middlewares.isAuthenticated, function(req, res){
        res.send(req.session.idProyecto);
    });

    app.get("/obtenercarpetas", middlewares.isAuthenticated, function(req, res){
        //console.log(req.query.idProyecto);
        bdconexion.query(`select idCarpeta, nombreCarpeta from carpetas where idProyecto = ?`,
        [req.session.idProyecto],
        function (error, data, fields) {
            if (error) res.send(error);
            res.send(data);
            res.end();
        })
    });
    app.post("/crearcarpeta", function(req, res){
        bdconexion.query(`insert into carpetas (nombreCarpeta, idProyecto) values (?,?)`,
        [req.body.nombreCarpeta, req.session.idProyecto],
        function (error, data, fields) {
            if (error) res.send(error);
            res.send(data);
            res.end();
        })
    });

    app.post("/actualizarcarpeta", function (req, res) {
        bdconexion.query(`update carpetas set nombreCarpeta = ? where idCarpeta = ?`,
            [req.body.nombreCarpeta, req.body.idCarpeta],
            function (error, data, fields) {
                if (error) res.send(error);
                console.log(data);
                res.send(data);
                res.end();
            })
    });

    app.post("/eliminarcarpeta", function (req, res) {
        bdconexion.query(`delete from carpetas where idCarpeta = ?`,
            [req.body.idCarpeta],
            function (error, data, fields) {
                if (error) res.send(error);
                console.log(data);
                res.send(data);
                res.end();
            })
    });

    app.get("/obtenerarchivos", middlewares.isAuthenticated, function (req, res) {
        bdconexion.query(`select idArchivo, nombreArchivo, tipoArchivo, contenidoArchivo from archivos where idProyecto = ?`,
            [req.session.idProyecto],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });

    app.post("/creararchivo", function(req, res){
        console.log(req.body.contenidoArchivo);
        bdconexion.query(`insert into archivos (nombreArchivo, tipoArchivo, contenidoArchivo, idCarpeta, idProyecto) values (?,?,?,?,?)`,
        [req.body.nombreArchivo, req.body.tipoArchivo, req.body.contenidoArchivo, req.body.idCarpeta, req.session.idProyecto],
        function (error, data, fields) {
            if (error) res.send(error);
            res.send(data);
            res.end();
        })
    });

    app.post("/actualizararchivo", function (req, res) {
        bdconexion.query(`update archivos set nombreArchivo = ?, contenidoArchivo = ? where idArchivo = ?`,
            [req.body.nuevoNombreArchivo, req.body.nuevoContenido, req.body.idArchivo],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });

    app.post("/eliminararchivo", function (req, res) {
        bdconexion.query(`delete from archivos where idArchivo = ?`,
            [req.body.idArchivo],
            function (error, data, fields) {
                if (error) res.send(error);
                res.send(data);
                res.end();
            })
    });




}
