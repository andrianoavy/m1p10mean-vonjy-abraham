const express = require("express");

const app = express();


/**
 * Décommenter et lancer `npm install cors -s` pour régler cors
 */
// const cors = require("cors");
// var corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


module.exports = app