//公共代码
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: ['./src/index.js'], //入口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/', // cdn路径,在编译时不知道最终输出文件的publicPath 的情况下，
        // publicPath 可以留空，并且在入口起点文件运行时动态设置。在入口起点设置 __webpack_public_path__。__webpack_public_path__ = myRuntimePublicPath
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: "babel-loader", // es6转化se5语法
                    },
                    {
                        loader:path.resolve(__dirname,'../loaders/replaceLoader.js'),
                        options:{
                            name:'zhang'
                        }
                    }
                ]
                
                
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
};