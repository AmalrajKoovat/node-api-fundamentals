const fs = require('fs');
const path = require('path');

const usersFilePath = `${__dirname}/../data/users.json`;

console.log("path", usersFilePath)

const getUsersJson = () => {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(usersData);
};

const getUsers = (req, res) => {
  const users = getUsersJson()
  res.send(users);
};

const addUsers = (req, res) => {
  const users = getUsersJson()
  const newUser = { id: req.body.id, name: req.body.name };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const users = getUsersJson()
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.json(updatedUser);
}

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  let users = getUsersJson();
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.json(deletedUser);
};

module.exports = {
  getUsers,
  addUsers,
  updateUser,
  deleteUser
};