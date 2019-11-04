var express = require('express');
const bodyParser = require('body-parser');
var userRouter = require('./Controller/UserRouter');
var scoreRouter = require('./Controller/ScoreRouter');
var app = express();
var port = process.env.Port || 4000;

app.use('/users', userRouter);
app.use('/scores', scoreRouter);


app.listen(port, () => { console.log(`SnakeJS API is up and running on Port: ${port}`) });