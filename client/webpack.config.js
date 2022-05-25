const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Destination/source for the manifest file
      new InjectManifest({swSrc: './src-sw.js', swDest: './src-sw.js'}),
      new HtmlWebpackPlugin({ template: './index.html'}),
      new WebpackPwaManifest({
        // short_name for naming it as an app
        fingerprint: false, inject: true, short_name: "TextEditor", name: "Text Editor",
          description: "For Editing your text", background_color: '#00008b', theme_color: "#ff69b4",
            start_url: '/', publicPath: '/',
        icons: [{ src: path.resolve('src/images/logo.png'), sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", 'icons'),
      }]
      })
    ],

    module: {
      rules: [
  { 
    use: ['style-loader', 'css-loader'],
      test: /\.css$/i,
  },
    { 
      test: /\.m?js$/,
        use: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"],
          plugins: 
          [
            "@babel/plugin-proposal-object-rest-spread", 
              "@babel/transform-runtime"
          ],
        }
      }
    },
  ],
    },
  };
};
