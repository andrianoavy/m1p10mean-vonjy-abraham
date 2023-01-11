//point d'entrée server
const db = require('./app/config/mongodb-config')
const router = require('./app/router')
    

db.connect(
    () => {
        console.log("Connected to Database");
        // db.get().createCollection("test", {} ).then(
        //     (collection) => {
        //         console.log("Collection user créé");
        //     }
        // )
        router.start( () => {
            console.log(`Server is running.`);
        })
    }
)


// db.get().createCollection('test')