const { finished } = require('stream')
const { promisify } = require('util')
const ParquetWriteStream = require('./ParquetWriteStream')
const ParquetReadStream = require('./ParquetReadStream')
const MessagePackEncodeStream = require('./MessagePackEncodeStream')
const MessagePackDecodeStream = require('./MessagePackDecodeStream')

exports.csv = require('./csv')
exports.avro = require('./avro')
exports.parquet = require('./parquet')
exports.messagepack = require('./messagepack')
exports.snappy = require('./snappy')
exports.finished = promisify(finished)
exports.createParquetReadStream = dst => new ParquetReadStream(dst)
exports.createParquetWriteStream = (schema, dst) =>
  new ParquetWriteStream(schema, dst)
exports.messagePack = {
  encode: () => new MessagePackEncodeStream(),
  decode: () => new MessagePackDecodeStream()
}
