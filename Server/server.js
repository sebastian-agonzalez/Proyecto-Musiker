/**
 * 
 * - Proyecto Musiker. 
 * - Sebastián A. González 
 * - 2019 - comIT
 *  
 */

//obtengo librería Express
const express = require('express');
//ejecuto Express
const app = express();
//obtengo la librría nativa Path para direccionar archivos
const path = require('path');
//obtengo librería para manejo de archivos locales
const fs = require('fs');
//obtengo librería para manejar los objetos de request 
const bodyParser = require('body-parser');
//obtengo librería para manejo de sesiones
const expressSession = require('express-session');
//obtengo libtrería handlbars
const expressHbs = require('express-handlebars');


//seteo los recursos estáticos para el uso de la web
app.use(express.static(path.join(__dirname, '../client')));

// Middleware de body-parser para json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuracion de SESIONES
app.use(expressSession({
    secret: 'lorena ipsum',
    resave: false,
    saveUninitialized: false
}));

//configuro Handlebars
app.engine('handlebars', expressHbs({
    defaultLayout: 'main',
    layoutsDir: 'C:/Users/Sebastián/Desktop/comIT/proyecto Musiker/Client/Views/Layouts'
}))

app.set('view engine', 'handlebars');
app.set('views', 'C:/Users/Sebastián/Desktop/comIT/proyecto Musiker/Client/Views');


// importo funciones secundarias
const serverFunc = require('./serverfunctions');
//importo las funciones relacionadas a las database
const dbFunc = require('./db-functions');





//GET para entrega del login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/login.html'));
})

//GET para entrega del login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/login.html'));
});

//GET entrega de error de registro
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/error.html'))
});
//GET entrega del registro
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/register.html'));
});

//get prueba handle
app.get('/pruebahome', (req, res) => {
    res.render('home', {
        username: 'Lalo'
    })

});

//GET para desloguearse
app.get('/logout', (req, res) => {

    //destruyo la sesión y redirijo al login
    req.session.destroy();
    res.redirect('/');
});



//GET para entrega del home
app.get('/home', (req, res) => {


    console.log(req.session.userId);
    //chequeo que el usuario esté loggeado
    if (req.session.userId !== undefined) {

        //llamo a la función de consulta a la database
        dbFunc.getPost(
            //envío lista de posts del feed común cuando entra al home
            postsList => {
                res.render('home', {
                    username: req.session.userId,
                    posts: postsList
                });

            },
            //mensaje de error
            errorMessage => {

                res.render('error', {
                    errorMessage: errorMessage
                });

            }
        );

    } else {

        res.redirect("/");

    }

});






//POST para validación del registro
app.post('/dosignup', (req, res) => {
    // chequeo qué se obtuvo
    currentDate = new Date();
    console.log('test 1: ', req.body); console.log('test 2: ', currentDate);

    //chequeo si hay alguna propiedad que sea indefinida o un string vacío
    // var. auxiliar para guardar propiedades del objeto
    let auxCheck = Object.values(req.body);
    console.log('test 3: ', auxCheck);
    //var. auxiliar para guardar resultado del chequeo de strings vacíos
    let auxCheckResult1 = auxCheck.find(item => item === "");

    //var. auxiliar para guardar resultados de chequeo de propiedades undefined
    let auxCheckResult2;

    for (i = 0; i < auxCheck.length; i++) {
        if (auxCheck[i] === undefined) {
            auxCheckResult2 = true;
            return;
        } else {
            auxCheckResult2 = false;
        }
    };
    console.log('test 4: ' + auxCheckResult1, auxCheckResult2);


    if (auxCheckResult1 != "" && !auxCheckResult2) {

        //formateo el objeto recibido con la estructura de nuestra database
        let newObjectUser = serverFunc.formatUserObject(req.body);
        console.log('Test 5: ', newObjectUser);



        //agrego el objeto de usuario a la DB
        dbFunc.addNewUserToDatabase(newObjectUser,
            //
            () => {

                res.send('/login');
                console.log('test 6: registro OK');


            },
            //mensaje de error
            (errmsg) => {

                console.log(errmsg);

            }
        );

    } else {
        res.send('/error')


    };
});




//POST validar login
app.post('/validateLogin', (req, res) => {

    console.log(req.body);

    //chequeo que usuario y contraseña existan
    if (req.body.user !== undefined && req.body.pass !== undefined) {

        //función que busca coincidencia de user y pass en database con cuentas existentes
        dbFunc.validateUserAndPassAtDatabase(req.body.user, req.body.pass,

            //redirijo al home si validó
            () => {

                req.session.userId = req.body.user;
                res.send('/home');
                console.log('login OK');

            },

            //redirijo nuevamente al login si no hubo coincidencia
            () => {

                req.session.destroy();
                res.send('/login');
                console.log('login REJECTED');
                //TO DO: responda status 200 y haga el redirect, y si no, responda un 403 (unauthorized) 
                //y mande en responseText el mensaje del problema
                // devolvé el mensaje, y desde la página en lugar de hacer un href =.... y generar ese efecto de "recarga", 
                //mostrá el error y listo. El location.href hacelo cuando el retorno sea 200.

            });
    } else {
        res.send('/error');
    }
});



//
app.post('/newPost', (req, res) => {

    console.log(req.session.userId);

    currentDate = new Date();
    console.log('test 2: ', currentDate);

    //chequeo que el usuario esté logeado
    if (req.session.userId !== undefined) {

        //chequeo si hay alguna propiedad que sea indefinida o un string vacío
        // var. auxiliar para guardar propiedades del objeto
        let auxCheck = Object.values(req.body);
        console.log('test 3: ', auxCheck);
        //var. auxiliar para guardar resultado del chequeo de strings vacíos
        let auxCheckResult1 = auxCheck.find(item => item === "");

        //var. auxiliar para guardar resultados de chequeo de propiedades undefined
        let auxCheckResult2;

        for (i = 0; i < auxCheck.length; i++) {
            if (auxCheck[i] === undefined) {
                auxCheckResult2 = true;
                return;
            } else {
                auxCheckResult2 = false;
            }
        };
        console.log('test 4: ' + auxCheckResult1, auxCheckResult2);



        if (auxCheckResult1 != "" && !auxCheckResult2) {

            //formateo el objeto recibido con la estructura de nuestra database
            let newObjectPost = serverFunc.formatPostObject(req.body, req.session);
            console.log('Test 5: ', newObjectPost);

            //agrego el objeto de Post a la DB
            dbFunc.addNewPostToDatabase(newObjectPost,
                //si está todo ok redireccionar a loguearse
                () => {

                    res.redirect('/home');
                    console.log('test 6: registro de post OK');

                },
                //mje de error
                (errmsg) => {

                    console.log(errmsg);

                }
            );

            //} else {
            //    res.sendStatus(403);
        };
    } else {
        res.redirect('/');
    }
});


//GET Search - búsqueda de publicaciones
app.get('/search', (req, res) => {


    console.log(req.query.keywords);


    let keywordsString = req.query.keywords;

    //let keywordsArr = keywordsString.split(/(\s+)/).filter(e => e.trim().length > 0);
    console.log(keywordsString);


    //chequeo que el usuario esté logeado
    if (req.session.userId !== undefined) {
        //invoco fnción que realiza la búsqueda en la database
        dbFunc.searchKeywordAtDatabase(keywordsString,
            //envío página con los resultados
            resultsList => {
                res.render('searchresults', {
                    username: req.session.userId,
                    posts: resultsList
                })
            },
            //mje de error
            errorMessage => {

                res.render('error', {
                    errorMessage: errorMessage
                });

            }
        );

    } else {

        res.redirect("/");

    }
});




//montando el servidor en línea
app.listen(8000, () => console.log('Servidor en línea - Puerto 8000'));

