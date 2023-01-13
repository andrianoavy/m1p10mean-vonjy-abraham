require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')();

const { connectDb } = require('./Config/connection')

const port = process.env.PORT || 3000;

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello NodeJs👋!')
})



connectDb(() => {
    //Atao eto ny require Routes
    app.use(require('./routes/sales-routes'))
    app.use(require('./routes/auth-routes'))

    app.listen(port, () => {
        console.log(`🏃Server is running on port ${port}...🏃`)
    })
}
); 