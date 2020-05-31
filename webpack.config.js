const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function source(path, sufix = '.js') {
  return glob.sync(`${path}/*${sufix}`)
    .reduce((obj, fullpath) => {
      let regex = new RegExp(`${sufix}$`);
      let file = fullpath.replace(regex, '').split('/');
      file = file[file.length - 1];
      console.log(file, fullpath);
      obj[file] = fullpath;
      return obj;
    }, {});
}



module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  mode: 'production',

  entry: source('./src/js'),

  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: __dirname,
              hmr: false
            },
          },
          'css-loader',
        ],
      },

    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}