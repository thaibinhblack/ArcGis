const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')

module.exports = {
  outputDir: process.env.CLIENT_NAME === 'client' ? 'dist/client' : 'dist/server',
  configureWebpack: config => {
    if (process.env.CLIENT_NAME === 'client') {
      return {
        entry: {
          client: './src/client/main.js'
        },
        plugins: [
          new SkeletonWebpackPlugin({
            webpackConfig: {
              entry: {
                client: path.join(__dirname, './src/client/entry-skeleton.js')
              },
              output: {
                libraryTarget: 'commonjs2'
              }
            }
          })
        ]
      }
    } else {
      return {
        entry: {
          server: './src/server/main.js'
        }
      }
    }
  }
}
