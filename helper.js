const bcrypt = require('bcrypt');
const User = require('./user');

let userData = [
  {
    name: 'First User',
    username: 'user1',
  },
  {
    name: 'Second User',
    username: 'user2',
  }
];

async function generatePasswordHash(user, password, saltRounds) {
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return { ...user, passwordHash}
  } catch (error) {
    return { ...user, passwordHash: null }
  }
}

function buildUsers(users) {
  const hashTasks = users.map((user) => generatePasswordHash(user, 'bestPassword', 10));
  return Promise.all(hashTasks);
}

/*
  1. Adds password hashes to each user and overrides previous userData.
  2. Saves the users to the collection, and stores the results in userData.
*/
async function initDb() {
  await User.deleteMany({});
  
  // generate password hashes for users
  userData = await buildUsers(userData);

  // saves users to db
  userData = await User.insertMany(userData);
  
  // correctly shows the saved results (***)
  console.log(userData);
}

module.exports = {
  userData,
  generatePasswordHash,
  buildUsers,
  initDb,
};