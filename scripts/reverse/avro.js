const fs = require('fs')
const JSONStream = require('JSONStream')
const { createFileDecoder } = require('avsc')

createFileDecoder('dist/hits.avro')
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream('dist/hits.from.avro.json'))
