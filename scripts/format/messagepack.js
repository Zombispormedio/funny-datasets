const fs = require('fs-extra')
const MessagePack = require('what-the-pack')
;(async () => {
  const raw = await fs.readFile('datasets/hits/data.json')
  const data = JSON.parse(raw)
  const encoded = MessagePack.encode(data)
  return fs.writeFile('dist/hits.pack', encoded)
})()
