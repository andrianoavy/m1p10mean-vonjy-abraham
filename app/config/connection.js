const MongoClient = require('mongodb').MongoClient

const connectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/"

const db_name = process.env.MONGO_DB_NAME || 'testdb'


let dbConnection;

const connectServer = function (callback) {
    MongoClient.connect(connectionString)
        .then((client) => {
            console.log("database is connected");
            dbConnection = client.db(db_name)
            return callback()
        })
        .catch((err) => {console.log("Problem connecting..."); console.log(err);})
}

const getDb = function () {
    return dbConnection
}

module.exports = {
    connectServer,
    getDb
}