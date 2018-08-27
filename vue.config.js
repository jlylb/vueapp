const webpack = require('webpack')
const path = require('path')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
// const  PostCompilePlugin = require('webpack-post-compile-plugin')

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
          .set('@', path.resolve(__dirname, './src'))
          .set('mui', path.resolve(__dirname, './src/assets/mui/js/mui.js'))
          .set('cube-ui', 'cube-ui/lib')

          config.module
          .rule('svg')
          .exclude.add([path.resolve(__dirname, './src/icons')])
          .end()

          config.module
          .rule('svgicon')
          .test(/\.svg$/)
          .include
          .add([path.resolve(__dirname, './src/icons')])
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
      
      },
      assetsDir: 'static',
      configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            mui: "mui",
            "window.mui": "mui"
          }),
          // new PostCompilePlugin(),
          new TransformModulesPlugin(),
          
        ]
        ,externals: {
            "mui": "mui"
        }
      }
}