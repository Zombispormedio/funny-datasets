const { Readable } = require("stream");
const { ParquetReader } = require("parquetjs");

module.exports = class ParquetReadStream extends Readable {
  constructor(src) {
    super({ objectMode: true });
    this.src = src;
    this.reader = null;
  }

  async _read() {
    try {
      if (!this.reader) {
        this.reader = await ParquetReader.openFile(this.src);
        this.cursor = this.reader.getCursor();
      }
      const record = await this.cursor.next();
      this.push(record);
      if (!record) {
        await this.reader.close();
      }
    } catch (error) {
      this.emit("error", error);
    }
  }
};
