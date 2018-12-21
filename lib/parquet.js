const fs = require('fs')
const JSONStream = require('JSONStream')
const { ParquetSchema } = require('parquetjs')
const ParquetWriteStream = require('./ParquetWriteStream')

exports.fromJSON = ({ schema, src, dst }) =>
  fs
    .createReadStream(src)
    .pipe(JSONStream.parse('*'))
    .pipe(new ParquetWriteStream(new ParquetSchema(schema), dst))
