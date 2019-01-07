const path = require('path');

module.exports = {
  mode: 'production',
  entry: './example.js',
  output: {
    filename: 'example.js',
    path: path.resolve(__dirname, 'dist')
  },
  stats: {
    optimizationBailout: true,
    // reasons: true,
  },
  optimization: {
    minimizer: [],
  }
};