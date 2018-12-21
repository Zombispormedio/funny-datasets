const fs = require('fs')
const JSONStream = require('JSONStream')
const csvStringify = require('csv-stringify')

exports.fromJSON = ({ src, dst }) =>
  fs
    .createReadStream(src)
    .pipe(JSONStream.parse('*'))
    .pipe(csvStringify({ header: true }))
    .pipe(fs.createWriteStream(dst))
