const MongoClient = require('mongodb').MongoClient

const {createCollections} = require('../config/collections')

const connectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/"

const db_name = process.env.MONGO_DB_NAME || 'garage'


let dbConnection;
let dbClient;

const connectDb = function (callback) {
    MongoClient.connect(connectionString)
        .then((client) => {
            console.log("database is connected");
            dbClient = client
            dbConnection = client.db(db_name)
            createCollections(dbConnection)
            return callback()
        })
        .catch((err) => {
            console.log("Problem connecting...");
            console.log(err);
            console.log("Problem connecting...2");
        })
}

const startSession = function(){
    return dbClient.startSession()
}

const getDb = function() {
    return dbConnection
}
const getDbClient = function() {
    return dbClient
}

module.exports = {
    connectDb,
    getDb,
    getDbClient,
    startSession
}