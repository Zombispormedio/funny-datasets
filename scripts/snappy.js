const fs = require('fs-extra')
const path = require('path')
const { snappy, finished } = require('../lib')

const DST_DIR = path.resolve(process.cwd(), 'dist')
;(async () => {
  try {
    const files = await fs.readdir(DST_DIR)

    await Promise.all(
      files.map(filename => {
        const ext = path.extname(filename)
        const base = path.basename(filename, ext)
        return finished(
          snappy.compress({
            src: path.resolve(DST_DIR, filename),
            dst: path.resolve(DST_DIR, `${base}.snappy${ext}`)
          })
        )
      })
    )
  } catch (error) {
    console.error(error)
  }
})()
