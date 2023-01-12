require('dotenv').config()

const bodyParser = require('body-parser')
const { connectServer } = require('./Config/connection')

const app = require('express')();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello NodeJs👋!')
})


connectServer(() => {

    app.use(require('./Routes/users-routes'));

    app.listen(port, () => {
        console.log(`🏃Server is running on port ${port}...🏃`)
    })
});