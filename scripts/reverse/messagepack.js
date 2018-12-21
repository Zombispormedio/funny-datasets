const fs = require('fs')
const MessagePack = require('what-the-pack')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
;(async () => {
  const raw = await readFile('dist/hits.pack')
  const decoded = MessagePack.decode(raw)
  return writeFile('dist/hits.from.messagepack.json', JSON.stringify(decoded))
})()
