const express = require('express');
const app = express();

app.use(express.json());

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const signinRouter = require('./routes/signin');
const protectedRouter = require('./routes/protected');

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/signin', signinRouter);
app.use('/protected', protectedRouter);

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
