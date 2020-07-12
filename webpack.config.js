const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports ={
	entry:{main: './src/scripts/index.js'},
	output:{
		path: path.resolve(__dirname,"dist"),
		filename:'[name].[chunkhash].js'
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{loader:"babel-loader"},
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				use:[(isDev ? 'style-loader' :MiniCssExtractPlugin.loader), 
				{
					loader:'css-loader',
					options:{
						importLoaders:2
					}
				},
				 'postcss-loader']
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader?name=./vendor/[name].[ext]'
			},
			{
				test: /\.(png|jpg|gif|ico|svg)$/,
				use: [
					'file-loader?name=./images/[name].[ext]&esModule=false', // указали папку, куда складывать изображения
					{
									loader: 'image-webpack-loader',
									options: {

									}
					},
				]
			},
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename: 'style.[chunkhash].css'
	}),
	new OptimizeCssAssetsPlugin({
		assetNameRegExp: /\.css$/g,
		cssProcessor: require('cssnano'),
		cssProcessorPluginOptions:{
			preset:['default']
		},
		canPrint: true
	}),
	new HtmlWebpackPlugin({
		inject: false,
		template: './src/index.html',
		filename: 'index.html'
	}),
	new WebpackMd5Hash(),
	new webpack.DefinePlugin({
		'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	})
	]
};