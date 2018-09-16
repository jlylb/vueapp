module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 75,
      baseDpr: 1,
      exclude: /node_modules|folder_name/i,
    }
  },
};
