const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = process.env.SECRET_KEY;

const usersFilePath = `${__dirname}/../data/users.json`;

const getUsersJson = () => {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(usersData);
};

const signinVerify = (req, res) => {
  const users = getUsersJson();
  console.log('login api', users[0].username, users[0].password, secretKey);
  const {username, password} = req.body;
  if (username === users[0].username && password === users[0].password) {
    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    console.log('token', token);
    // const newLine = '\nACCESS_TOKEN='+token;
    // writeToENV(newLine);
    res.json({token});
  } else {
    res.status(401).json({message: 'Invalid credentials'});
  }
};

module.exports = {
  signinVerify,
};
