const fs = require('fs')
const { Transform } = require('stream')
const snappy = require('snappy')

const compress = () =>
  new Transform({
    transform (chunk, enconding, callback) {
      snappy.compress(chunk, callback)
    }
  })

exports.compress = ({ src, dst }) =>
  fs
    .createReadStream(src)
    .pipe(compress())
    .pipe(fs.createWriteStream(dst))
