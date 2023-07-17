require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./user');
const helper = require('./helper');

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB.');

  // Initialize db...
  await helper.initDb();

  // Incorrectly shows data.... why? (***)
  console.log(helper.userData); 

  console.log('Disconnecting from MongoDB...');
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB.');
}

main();