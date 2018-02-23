const path = require("path");
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
	entry: ["./src/index.js", "./src/style.scss"],
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "stage-0"]
					}
				}
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: "css-loader", options: { minimize: true }},
            {loader: "sass-loader"}
          ]
        })
      }
		]
  },
  plugins: [
    new ExtractTextPlugin("./styles.css"),
    new PurgecssPlugin({
      paths: glob.sync(`*.html`),
      extractors: [
        {
          extractor: class {
            static extract(content) {
              return content.match(/[A-z0-9-:\/]+/g) || []
            }
          },
          extensions: ['html']
        }
      ]
    })
  ]
}