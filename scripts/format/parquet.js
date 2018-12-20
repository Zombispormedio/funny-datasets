const fs = require("fs");
const JSONStream = require("JSONStream");
const { ParquetSchema } = require("parquetjs");
const { createParquetWriteStream } = require("../../lib");
const schemaFromJson = require("../../datasets/hits/parquet.schema.json");

const schema = new ParquetSchema(schemaFromJson);

fs.createReadStream("datasets/hits/data.json")
  .pipe(JSONStream.parse("*"))
  .pipe(createParquetWriteStream(schema, "dist/hits.parquet"));
