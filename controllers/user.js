const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function login(req, res){

  const { user, password } = req.body;

  try {
      const user2 = await userModel.findOne({ user });
      console.log(user2)
      if (user2) {
          const isMatch = await bcrypt.compare(password, user2.hashedPassword);
          if (isMatch) {
              req.session.userId = user2._id;
              return res.json(user2);
          } 
          else {
              return res.status(400).json({ error: 'Incorrect username or password' });
          }
      } else {
          return res.status(400).json({ error: 'User not found' });
      }
  } catch (error) {
      return res.status(400).json({ error: 'BD error' });
  }

}

async function register(req, res){
  try {
    const { names, lastNames, typeID, ID,user, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingID = await userModel.findOne({ ID });
        if (existingID) {
            return res.status(400).json({ error: 'The ID is already in use.' });
        }

        const existingUsername = await userModel.findOne({ user });
        if (existingUsername) {
            return res.status(400).json({ error: 'The username is already in use.' });
        }

    const newUser = new userModel({ names, lastNames, typeID, ID,user, hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering the user', error });
    console.error('Error registering the user', error);
  }

};


module.exports = {
    login,
    register,
};