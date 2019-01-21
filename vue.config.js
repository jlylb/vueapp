const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));

    config.module
      .rule('svg')
      .exclude.add([path.resolve(__dirname, './src/icons')])
      .end();

    config.module
      .rule('svgicon')
      .test(/\.svg$/)
      .include.add([path.resolve(__dirname, './src/icons')])
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  assetsDir: 'static',
  transpileDependencies: [],
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'vue app',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // guide: 'src/guide.js',
  },
  baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
  configureWebpack: {
    plugins: [],
    externals: {
      // vue: 'Vue',
      // 'vue-socket.io': 'VueSocketIO',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/var.scss";',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://phpsite.cc',
        changeOrigin: true,
      },
      '/image': {
        target: 'http://phpsite.cc',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/image': '/upload',
        },
      },
    },
  },
};
