// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// module.exports = mongoose.model('User', userSchema);
// example Mongoose User schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['teacher', 'student'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema);
