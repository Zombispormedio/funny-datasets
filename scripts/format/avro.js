const fs = require('fs')
const JSONStream = require('JSONStream')
const { createFileEncoder } = require('avsc')
const schema = require('../../datasets/hits/avro.schema.json')

fs
  .createReadStream('datasets/hits/data.json')
  .pipe(JSONStream.parse('*'))
  .pipe(createFileEncoder('dist/hits.avro', schema))
