const { Writable } = require("stream");
const { ParquetWriter } = require("parquetjs");

module.exports = class ParquetWriteStream extends Writable {
    constructor(schema, dst) {
      super({ objectMode: true });
      this.dst = dst;
      this.schema = schema;
      this.writer = null;
    }
  
    createWriter() {
      return ParquetWriter.openFile(this.schema, this.dst);
    }
  
    appendRow(chunk, callback) {
      this.writer.appendRow(chunk).then(callback);
    }
  
    _write(chunk, encoding, callback) {
      if (!this.writer) {
        this.createWriter().then(writer => {
          this.writer = writer;
          this.appendRow(chunk, callback);
        });
      } else {
        this.appendRow(chunk, callback);
      }
    }
  
    _final(callback) {
      if (this.writer) {
        this.writer.close().then(callback);
      }
    }
  }