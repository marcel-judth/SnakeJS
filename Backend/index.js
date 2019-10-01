var express = require('express');
const bodyParser = require('body-parser');
var userRouter = require('./Controller/UserRouter');
var app = express();
var port = process.env.Port || 4000;

app.use('/users', userRouter);

app.listen(port, () => {console.log(`SnakeJS API is up and running on Port: ${port}`)});