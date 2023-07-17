const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: [true, 'Username cannot be empty & must be at least 3 characters long.'],
    unique: true,
    minLength: [3, '\'{VALUE}\' is not a valid username. Username must be at least 3 characters long.'],
  },
  passwordHash: {
    type: String,
  },
});

userSchema.plugin(uniqueValidator, {
  message: 'Username \'{VALUE}\' is taken.',
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
