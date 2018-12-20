const ParquetWriteStream = require('./ParquetWriteStream');
const ParquetReadStream = require('./ParquetReadStream');
const MessagePackEncodeStream = require('./MessagePackEncodeStream');
const MessagePackDecodeStream = require('./MessagePackDecodeStream');

exports.createParquetReadStream = dst => new ParquetReadStream(dst);
exports.createParquetWriteStream = (schema, dst) => new ParquetWriteStream(schema, dst);
exports.messagePack = {
    encode: () =>  new MessagePackEncodeStream(),
    decode: () =>  new MessagePackDecodeStream()
}
