const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    typeID: { type: String, required: true },
    ID: { type: String, required: true, unique: true },
    user: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);