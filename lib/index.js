const ParquetWriteStream = require('./ParquetWriteStream');
const ParquetReadStream = require('./ParquetReadStream');

exports.createParquetReadStream = dst => new ParquetReadStream(dst);
exports.createParquetWriteStream = (schema, dst) => new ParquetWriteStream(schema, dst);