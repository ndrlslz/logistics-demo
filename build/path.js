const path = require('path')

module.exports = {
  local: {
    outputPath: path.join(__dirname, '../local_dist'),
  },
  dev: {
    outputPath: path.join(__dirname, '../dev_dist'),
  },
  prod: {
    outputPath: path.join(__dirname, '../prod_dist'),
  },
}
