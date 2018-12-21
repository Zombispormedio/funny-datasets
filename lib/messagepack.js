const fs = require('fs-extra')
const MessagePack = require('what-the-pack')

exports.fromJSON = async ({ src, dst }) => {
  const raw = await fs.readFile(src)
  const data = JSON.parse(raw)
  const encoded = MessagePack.encode(data)
  return fs.writeFile(dst, encoded)
}
