module.exports.addNewUserToDatabase = addNewUserToDatabase;
module.exports.validateUserAndPassAtDatabase = validateUserAndPassAtDatabase;
module.exports.addNewPostToDatabase = addNewPostToDatabase;
module.exports.getPost = getPost;
module.exports.searchKeywordAtDatabase = searchKeywordAtDatabase;

//pido librería mongodb
const mongodb = require('mongodb');
//establezco mongoclient
const MongoClient = mongodb.MongoClient;
//ruta server mongo
const mongoURL = 'mongodb://localhost:27017';
//nombre de la DB
const dbName = 'Musiker';



/**
 * función que agrega nuevos usuarios a la base de datos
 * 
 * @param {objeto} data          valores ingresados por el usuario
 * @param {function} cbOK        función que da el ok
 * @param {function} cbError     función para procesar en caso de errores
 */
function addNewUserToDatabase(data, cbOK, cbError) {

    //conecto a la base
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexión
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {
            //referencia a la base
            const db = client.db(dbName);
            //referencia a la colección
            const collection = db.collection('UserProfile');

            //inserto nuevo usuario en el registro
            collection.insertOne(data, (err, result) => {

                if (err) {
                    //invoco error en caso 
                    cbError(err);

                } else {
                    //invoco callback de exito si salió todo bien
                    cbOK();

                }
            });
        }
    });
};





/**
 * función que consulta si usuario y contraseña ingresados corresponden a un usuario registrado
 * 
 * @param {string} user         usuario ingresado por el usuario
 * @param {string} pass         contraseña ingresada por el usuario
 * @param {function} cbOK       función para procesar el resultado OK de la validación
 * @param {function} cbError    función para procesar errores
 */
function validateUserAndPassAtDatabase(user, pass, cbOK, cbError) {

    //conexión a la DB
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexión
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {
            //referencia a la base
            const db = client.db(dbName);
            //referencia a la colección
            const collection = db.collection('UserProfile');

            //chequeo si user y pass coinciden con algunos de los registros en base de datos
            collection.find({ user: user, password: pass }).toArray((err, data) => {
                //chequeo que solamente un par user-pass haya sido encontrado
                if (data.length == 1) {
                    //invoco callback de éxito
                    cbOK();

                } else {
                    //si no invoco callback de error
                    cbError();

                }
                //cierro conexion
                client.close();

            });
        };
    });
};




/**
 * función que agrega un post realizado a la base de datos
 * 
 * @param {object} data          valores ingresados para el post
 * @param {func} cbOK            función que procesa el resultado OK del proceso
 * @param {func} cbError         función que procesa errores
 * 
 */

function addNewPostToDatabase(data, cbOK, cbError) {
    //conecto a base de datos
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexión
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {

            console.log('conectó database post')
            //referencia a la base
            const db = client.db(dbName);
            //referencia a la colección
            const collection = db.collection('FeedPosts');


            //inserto nuevo usuario en el registro
            collection.insertOne(data, (err, result) => {

                if (err) {
                    //invoco error en caso 
                    cbError(err);
                    console.log('ruta error')
                } else {
                    //invoco callback de exito si salió todo bien
                    cbOK();
                    console.log('ruta ok')
                }
            });
        }
    });
};


/**
 * función para consultar los posts en la DB
 * 
 * @param {function} cbOK          función que procesa el resultado OK de la consulta
 * @param {function} cbError       función que procesa errores
 */
function getPost(cbOK, cbError) {
    //conecto a la DB
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexion
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {
            //referencia a la DB
            const db = client.db(dbName);
            //referencia a la colección
            const collection = db.collection("FeedPosts");
            //obtengo todos los posts existentes
            collection.find().toArray((err, list) => {
                //error de consulta
                if (err) {

                    cbError("Error al consultar lista de posts. " + err);

                } else {

                    list = list.reverse();
                    cbOK(list);

                }
            });
        }
        //cierro conexion
        client.close();
    });
}






/**
 * 
 * función que  busca en DB los posts que contengan alguna keyword ingresada en el buscador
 * 
 * @param {string} data       palabra ingresada por el usuario
 * @param {function} cbOK     función que procesa el resultado OK de la consulta 
 * @param {function} cbError  función que procesa errores
 */
function searchKeywordAtDatabase(data, cbOK, cbError) {

    //conecto a la DB
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexion
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {
            //referencia a la DB
            const db = client.db(dbName);
            //referencia a la colección 
            const collection = db.collection("FeedPosts");
            //consulta  la Db sobre los posts que contengan la palabra ingresada x usuario
            collection.find({
                $or: [

                    { titulo: new RegExp(data, "i") },

                    { descripcion: new RegExp(data, "i") },

                    { disponibilidadHoraria: new RegExp(data, "i") },

                    { instrumento: new RegExp(data, "i") },

                    { ciudad: new RegExp(data, "i") }

                ]
            }).toArray((err, list) => {
                //error de consulta
                if (err) {

                    cbError("Error al consultar lista de posts. " + err);

                } else {

                    list = list.reverse();
                    cbOK(list);
                }
            });
        }
        //cierre conexion
        client.close();
    });
}