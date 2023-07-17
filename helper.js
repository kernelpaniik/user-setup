const bcrypt = require('bcrypt');

// initial user data (no password hashes yet)
let data = [
  {
    name: 'First User',
    username: 'user1',
  },
  {
    name: 'Second User',
    username: 'user2',
  }
];

// generates a password hash (15 for noticeable delay)
function generatePasswordHash() {
  return bcrypt.hash('password', 15);
}

// re-builds the data array by creating a new array
// containing users with password hashes
async function buildData(users) {
  let newUsers = [];
  for (let user of users) {
    newUsers.push({
      ...user,
      passwordHash: await generatePasswordHash(),
    });
  }
  return newUsers;
}

// starts process of building data array
async function init() {
  module.exports.data = await buildData(data);
}

module.exports = {
  data,
  generatePasswordHash,
  buildData,
  init,
};