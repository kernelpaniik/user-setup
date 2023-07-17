const helper = require('./helper');

async function main() {
  await helper.init();
  console.log(helper.data);
}

main();