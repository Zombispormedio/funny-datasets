const fs = require('fs');
const JSONStream = require('JSONStream')
const csvStringifyLib = require('csv-stringify');

fs.createReadStream('datasets/hits/data.json')
.pipe(JSONStream.parse("*"))
.pipe(csvStringifyLib({ header: true }))
.pipe(fs.createWriteStream("dist/hits.csv")); 