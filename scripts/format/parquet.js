const fs = require('fs');
const parquet = require("parquetjs");
const JSONStream = require('JSONStream')
const Chain = require('stream-chain');

const schema = new parquet.ParquetSchema({
  title: { type: "UTF8" },
  artist: { type: "UTF8" },
  feat: { type: "UTF8" },
  releaseDate: { type: "UTF8" },
  album: { type: "UTF8" },
  url: { type: "UTF8" },
});
