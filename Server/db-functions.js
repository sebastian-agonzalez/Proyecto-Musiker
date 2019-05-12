module.exports.addNewUserToDatabase = addNewUserToDatabase;
module.exports.validateUserAndPassAtDatabase = validateUserAndPassAtDatabase;
module.exports.addNewPostToDatabase = addNewPostToDatabase;
module.exports.getPost = getPost;

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
 * @param {objeto} data 
 * @param {function} cbOK 
 * @param {function} cbError 
 */
function addNewUserToDatabase(data, cbOK, cbError) {
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
 * @param {string} user
 * @param {string} pass  
 * @param {function} cbOK 
 * @param {function} cbError 
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
 * 
 * @param {object} data 
 * @param {func} cbOK 
 * @param {func} cbError 
 */

function addNewPostToDatabase(data, cbOK, cbError) {

    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        //error de conexión
        if (err) {

            cbError("No se pudo conectar a la DB. " + err);

        } else {
            //referencia a la base
            const db = client.db(dbName);
            //referencia a la colección
            const collection = db.collection('FeedPosts');

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
 * función para consultar los posts en la DB
 * 
 * @param {function} cbOK 
 * @param {function} cbError 
 */
function getPost(cbOK, cbError) {



    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {

        if (err) {

            cbError("No se pudo conectar a la DB. " + err);
        } else {

            const db = client.db(dbName);

            const collection = db.collection("FeedPosts");

            collection.find().toArray((err, list) => {
                if (err) {
                    cbError("Error al consultar lista de posts. " + err);
                } else {
                    list = list.reverse();
                    cbOK(list);
                }
            });
        }

        client.close();
    });
}
