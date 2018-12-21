const { Writable } = require('stream')
const { ParquetWriter } = require('parquetjs')

module.exports = class ParquetWriteStream extends Writable {
  constructor (schema, dst) {
    super({ objectMode: true })
    this.dst = dst
    this.schema = schema
    this.writer = null

    this.handleError = error => {
      this.emit('error', error)
    }
  }

  createWriter () {
    return ParquetWriter.openFile(this.schema, this.dst)
  }

  appendRow (chunk, callback) {
    this.writer
      .appendRow(chunk)
      .then(callback)
      .catch(this.handleError)
  }

  _write (chunk, encoding, callback) {
    if (!this.writer) {
      this.createWriter()
        .then(writer => {
          this.writer = writer
          this.appendRow(chunk, callback)
        })
        .catch(this.handleError)
    } else {
      this.appendRow(chunk, callback)
    }
  }

  _final (callback) {
    if (this.writer) {
      this.writer
        .close()
        .then(callback)
        .catch(this.handleError)
    }
  }
}
