const fs = require('fs-extra')
const path = require('path')
const { parquet, finished } = require('../../lib')

const DATASETS_DIR = path.resolve(process.cwd(), 'datasets')
const DST_DIR = path.resolve(process.cwd(), 'dist')
;(async () => {
  try {
    const dirs = await fs.readdir(DATASETS_DIR)
    await Promise.all(
      dirs.map(async dir => {
        const schema = JSON.parse(
          await fs.readFile(
            path.resolve(DATASETS_DIR, dir, 'parquet.schema.json')
          )
        )
        return finished(
          parquet.fromJSON({
            schema,
            src: path.resolve(DATASETS_DIR, dir, 'data.json'),
            dst: path.resolve(DST_DIR, `${dir}.parquet`)
          })
        )
      })
    )
  } catch (error) {
    console.error(error)
  }
})()
