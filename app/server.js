require('dotenv').config()

const bodyParser = require('body-parser')
const { connectDb } = require('./Config/connection')

const app = require('express')();

const port = process.env.PORT || 3000;

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