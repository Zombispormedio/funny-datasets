const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const snappy = require("snappy");
const compress = () =>
  new Transform({
    transform(chunk, enconding, callback) {
      snappy.compress(chunk, callback);
    }
  });

["hits.parquet", "hits.avro", "hits.pack", "hits.csv"].forEach(filename => {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  fs.createReadStream(`dist/${filename}`)
    .pipe(compress())
    .pipe(fs.createWriteStream(`dist/${base}.snappy${ext}`));
});
