const fs = require('fs')
const JSONStream = require('JSONStream')
const { createFileEncoder } = require('avsc')

exports.fromJSON = ({ schema, src, dst }) =>
  fs
    .createReadStream(src)
    .pipe(JSONStream.parse('*'))
    .pipe(createFileEncoder(dst, schema))
