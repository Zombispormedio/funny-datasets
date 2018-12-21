const fs = require('fs-extra')
const path = require('path')
const { messagepack } = require('../../lib')

const DATASETS_DIR = path.resolve(process.cwd(), 'datasets')
const DST_DIR = path.resolve(process.cwd(), 'dist')
;(async () => {
  try {
    const dirs = await fs.readdir(DATASETS_DIR)
    await Promise.all(
      dirs.map(dir =>
        messagepack.fromJSON({
          src: path.resolve(DATASETS_DIR, dir, 'data.json'),
          dst: path.resolve(DST_DIR, `${dir}.pack`)
        })
      )
    )
  } catch (error) {
    console.error(error)
  }
})()
