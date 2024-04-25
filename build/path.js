const path = require('path')

module.exports = {
  local: {
    outputPath: path.join(__dirname, '../local_dist'),
  },
  dev: {
    outputPath: path.join(__dirname, '../dist'),
  },
  prod: {
    outputPath: path.join(__dirname, '../prod_dist'),
  },
}
