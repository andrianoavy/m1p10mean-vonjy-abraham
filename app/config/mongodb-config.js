const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017';

const dbName = process.env.DB_NAME || 'garage';

let mongodb;

function connect(callback){
    MongoClient.connect(connectionString)
        .then( (client ) => {
            mongodb = client.db(dbName)
            callback()
        })
        .catch( function(err){
            console.error(err)
        });

}

function get(){
    return mongodb
}

function close(){
    mongodb.close()
}



module.exports = {
    connect,
    get,
    close
}