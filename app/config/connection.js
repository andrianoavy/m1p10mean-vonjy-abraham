const MongoClient = require('mongodb').MongoClient

const {createCollections} = require('../config/collections')

const connectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/"

const db_name = process.env.MONGO_DB_NAME || 'garage'


let dbConnection;

<<<<<<< HEAD
const connectDb = function (callback) {
=======
const connectServer = function(callback) {
>>>>>>> config-vonjy
    MongoClient.connect(connectionString)
        .then((client) => {
            console.log("database is connected");
            dbConnection = client.db(db_name)
            createCollections(dbConnection)
            return callback()
        })
        .catch((err) => {
            console.log("Problem connecting...");
            console.log(err);
        })
}

const getDb = function() {
    return dbConnection
}

module.exports = {
    connectDb,
    getDb
}