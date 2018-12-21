const fs = require('fs-extra')
const path = require('path')
const { csv, finished } = require('../../lib')

const DATASETS_DIR = path.resolve(process.cwd(), 'datasets')
const DST_DIR = path.resolve(process.cwd(), 'dist')
;(async () => {
  try {
    const dirs = await fs.readdir(DATASETS_DIR)
    await Promise.all(
      dirs.map(dir =>
        finished(
          csv.fromJSON({
            src: path.resolve(DATASETS_DIR, dir, 'data.json'),
            dst: path.resolve(DST_DIR, `${dir}.csv`)
          })
        )
      )
    )
  } catch (error) {
    console.error(error)
  }
})()
