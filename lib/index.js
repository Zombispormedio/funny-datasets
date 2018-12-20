const ParquetWriteStream = require('./ParquetWriteStream');

exports.createParquetWriteStream = (schema, dst) => new ParquetWriteStream(schema, dst);