require('dotenv').config()

const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

const { connectDb } = require('./config/connection');


const port = process.env.PORT || 3000;

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',express.static(path.join(__dirname, 'public')))

app.get('/*',function(req,res,next){
    if (req.originalUrl.startsWith('/api')) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public',"index.html"));
    }
})

connectDb(() => {
    //Atao eto ny require Routes
    app.use(require('./routes/entrees-routes'))
    app.use(require('./routes/auth-routes'))
    app.use(require('./routes/voitures-routes'))
    app.use(require('./routes/factures-routes'))
    app.use(require('./routes/paiement-routes'))

    app.listen(port, () => {
        console.log(`🏃Server is running on port ${port}...🏃`)
    })
});

