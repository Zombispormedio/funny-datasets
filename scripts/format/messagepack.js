const fs = require('fs');
const MessagePack = require("what-the-pack");
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  const raw = await readFile("datasets/hits/data.json");
  const data = JSON.parse(raw);
  const encoded = MessagePack.encode(data);
  return writeFile("dist/hits.pack", encoded);
})();

