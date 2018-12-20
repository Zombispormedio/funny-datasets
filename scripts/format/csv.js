const fs = require('fs');
const JSONStream = require('JSONStream')
const csvStringify = require('csv-stringify');

fs.createReadStream('datasets/hits/data.json')
.pipe(JSONStream.parse("*"))
.pipe(csvStringify({ header: true }))
.pipe(fs.createWriteStream("dist/hits.csv")); 