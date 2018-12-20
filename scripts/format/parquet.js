const fs = require("fs");
const JSONStream = require("JSONStream");
const { ParquetSchema } = require("parquetjs");
const { createParquetWriteStream } = require("../../lib");

const schema = new ParquetSchema({
  title: { type: "UTF8" },
  artist: { type: "UTF8" },
  feat: { type: "UTF8", optional: true },
  releaseDate: { type: "UTF8" },
  album: { type: "UTF8", optional: true },
  url: { type: "UTF8" }
});

fs.createReadStream("datasets/hits/data.json")
  .pipe(JSONStream.parse("*"))
  .pipe(createParquetWriteStream(schema, "dist/hits.parquet"));
