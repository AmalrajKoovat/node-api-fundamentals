var express = require('express');
var app = express();

app.use(express.json());

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');

app.use('/', mainRouter);
app.use('/user', userRouter);

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})