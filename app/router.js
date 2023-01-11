const app = require('./config/server');
const controller = require('./controllers/example-controller');

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';

function start(callback){

    // `/user`
    app.get('/user', controller.get)
        .post('/user',controller.post);



    app.listen(port , () => {
        callback()
        });
}


module.exports = {start}