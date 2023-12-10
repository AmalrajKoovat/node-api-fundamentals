let users = [
    { id: 1, name: 'amal' },
    { id: 2, name: 'raj' },
  ];
  
  const getUsers = (req, res) => {
    console.log("getUsers")
    res.send(users);
    console.log("getUsers end")
  };

  module.exports = {
    getUsers
  };