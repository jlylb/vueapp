module.exports = {
  presets: ['@vue/app'],
  ignore: ['./src/assets/mui/js/mui.min.js', './src/assets/mui/js/mui.js'],
  plugins: [
    [
      'import',
      {
        libraryName: 'muse-ui',
        libraryDirectory: 'lib',
        camel2DashComponentName: false,
      },
    ],
  ],
};
