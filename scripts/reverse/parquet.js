const fs = require("fs");
const JSONStream = require("JSONStream");
const { createParquetReadStream } = require("../../lib");

createParquetReadStream("dist/hits.parquet")
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream("dist/hit.from.parquet.json"));
