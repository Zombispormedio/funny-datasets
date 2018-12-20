const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const snappy = require("snappy");
const uncompress = () =>
  new Transform({
    transform(chunk, enconding, callback) {
      snappy.uncompress(chunk, callback);
    }
  });

["hits.parquet", "hits.avro", "hits.pack", "hits.csv"].forEach(filename => {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  fs.createReadStream(`dist/${base}.snappy${ext}`)
    .pipe(uncompress())
    .pipe(fs.createWriteStream(`dist/${base}.uncompressed${ext}`));
});
