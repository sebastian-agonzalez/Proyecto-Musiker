//pido librería mongodb
const mongodb = require('mongodb');
//establezco mongoclient
const MongoClient = mongodb.MongoClient;
//ruta server mongo
const mongoURL = 'mongodb//:localhost:27017';
//nombre de la DB
const dbName = 'Musiker';


function addNewUserToDatabase

MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {

    if (err) {
        //error en la conexión
        // TO DO
    } else {

        const db = client.db(dbName);

        const collection = db.collection('UserProfile');

        collection.insertOne()
    }

})