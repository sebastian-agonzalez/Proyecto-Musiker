/**
 * 
 * - Proyecto Musiker. 
 * - Sebastián A. González 
 * - 2019 - comIT
 * 
 * 
 */

//obtengo librería Express
const express = require('express');

//ejecto Express
const app = require();

//obtengo la librría nativa Path para direccionar archivos
const Path = require('path');

//seteo los recursos estáticos para el uso de la web
app.use(express.static(path.join(__dirname, '../Client')));
app.use(express.static(path.join(__dirname, "../Resources")));
app.use(express.static(path.join(__dirname, "../Style")));

//GET para entrega de la web 
/*

esto iría con un IF para entregar la página del login o home dependiendo la situación no?
*/



//montando el servidor en línea
app.listen(8000, () => console.log('Servidor en línea - Puerto 8000'));
