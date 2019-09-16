// Tell node to grab the express module
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
// Call the express() function
const app = express();
const urlEncodedParser = express.urlencoded({ extended: true});
app.use(urlEncodedParser);

// create and connect redis client to local instance.
const redisClient = redis.createClient();

// Print redis errors to the console
redisClient.on('error', (err) => {
    console.log("Error " + err);
});

redisClient.on('connect', () => {
    console.log('connected');
    redisClient.set('myKey', 'myVValue');
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/sign-up', urlEncodedParser, (req, res) => {
    console.log('sign up');
    console.log(req.body);
    
});

app.listen(3000);