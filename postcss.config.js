module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      exclude: '/node_modules/i',
      rootValue: 40,
      selectorBlackList: [
        'html',
        'mt-',
        'iconfont',
        'mint-cell-wrapper',
        'picker-item',
        'layout-container',
      ],
      propBlackList: ['/border/', 'background-image', 'background-size'],
    },
  },
};
