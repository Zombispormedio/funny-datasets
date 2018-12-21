const { Transform } = require('stream')
const MessagePack = require('what-the-pack')

module.exports = class MessagePackEncodeStream extends Transform {
  constructor () {
    super({ objectMode: true })
  }
  _transform (chunk, enconding, callback) {
    callback(null, MessagePack.decode(chunk))
  }
}
