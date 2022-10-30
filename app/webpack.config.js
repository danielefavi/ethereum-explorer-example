const path = require('path');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  experiments: {
    topLevelAwait: true,
  }
};

