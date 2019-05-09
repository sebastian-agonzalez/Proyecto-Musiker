/**
 * 
 * - Proyecto Musiker. 
 * - Sebastián A. González 
 * - 2019 - comIT
 *  
 */

//obtengo librería Express
const express = require('express');
//ejecto Express
const app = express();
//obtengo la librría nativa Path para direccionar archivos
const path = require('path');
//obtengo librería para manejo de archivos locales
const fs = require('fs');
//obtengo librería para manejar los objetos de request 
const bodyParser = require('body-parser');

//seteo los recursos estáticos para el uso de la web
app.use(express.static(path.join(__dirname, '../client')));

// Middleware de body-parser para json
app.use(bodyParser.json());

// importo funciones secundarias
const serverFunc = require('./serverfunctions');



//GET para entrega del login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/login.html'));
})

//GET para entrega del login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/login.html'));
});

//GET para entrega del home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/home.html'));
});

//GET entrega de error de registro
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/error.html'))
});

//GET entrega del registro
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/register.html'));
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

        //proceso el obj recibido y transformo al nuevo objeto en mi estructura de usuario
        let newObjectUser = serverFunc.formatUserObject(req.body);
        console.log('Test 5: ', newObjectUser);
        
        
        //agregar código que procese el objeto lo agregue a la DB de usuarios  y enviar confirmación y luego redirección?*/
        res.send('/login');

    } else {
        res.sendStatus(403);
    };
});




//POST validar login
app.post('/validateLogin', (req, res) => {
    //chequeo qué se obtuvo
    console.log(req.body);
    if (req.body.user !== undefined && req.body.pass !== undefined) {
        if (serverFunc.validateUser(req.body.user, req.body.user)) {
            res.send('/home');
        } else {
            res.sendStatus(403);
        }
    } else {
        res.status(403).end();
    }
});



//montando el servidor en línea
app.listen(8000, () => console.log('Servidor en línea - Puerto 8000'));