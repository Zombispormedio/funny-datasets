const fs = require('fs-extra')
const path = require('path')
const { avro, finished } = require('../../lib')

const DATASETS_DIR = path.resolve(process.cwd(), 'datasets')
const DST_DIR = path.resolve(process.cwd(), 'dist')
;(async () => {
  try {
    const dirs = await fs.readdir(DATASETS_DIR)
    await Promise.all(
      dirs.map(async dir => {
        const schema = JSON.parse(
          await fs.readFile(path.resolve(DATASETS_DIR, dir, 'avro.schema.json'))
        )
        return finished(
          avro.fromJSON({
            schema,
            src: path.resolve(DATASETS_DIR, dir, 'data.json'),
            dst: path.resolve(DST_DIR, `${dir}.avro`)
          })
        )
      })
    )
  } catch (error) {
    console.error(error)
  }
})()
