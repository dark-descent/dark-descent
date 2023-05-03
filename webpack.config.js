const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const isDev = process.argv.includes("--dev");

module.exports = {
	name: "app",
	stats: "minimal",
	entry: path.resolve(__dirname, "./src/index.ts"),
	devtool: isDev ? "inline-source-map" : undefined,
	output: {
		clean: true,
		filename: "js/[name].bundle.js",
		chunkFilename: "js/[contenthash].chunk.js",
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
				use: {
					loader: "url-loader",
					options: {
						fallback: "file-loader",
						limit: 40000,
						name: "img/[name].[ext]",
					},
				},
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/[name].bundle.css`,
			chunkFilename: `css/[contenthash].chunk.css`,
			ignoreOrder: false
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./public"),
					to: path.resolve(__dirname, "./dist"),
					globOptions: {
						ignore: ["**/index.html"]
					}
				}
			]
		}),
		new HtmlPlugin({
			template: path.resolve(__dirname, "./public/index.html")
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		plugins: [
			new TsconfigPathsPlugin({})
		],
		fallback: {
			path: require.resolve("path-browserify"),
		}
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	experiments: {
		topLevelAwait: true,
	},
	devServer: {
		hot: false,
		liveReload: true,
		static: {
			directory: path.join(__dirname, "./public"),
		},
		compress: true,
		port: 9000,
	},
};