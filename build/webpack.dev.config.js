//开发用的打包配置
const Webpack = require('webpack'); //访问内置的插件
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
    mode: 'development', // mode: 'production',development或者cli传递参数webpack --mode=production
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                       loader: "style-loader" // 将 JS 字符串生成为 style 节点 // "style-loader", // b不再需要style-loader要已经分离处理
                        // loader :MiniCssExtractPlugin.loader,
                    }, {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            importLoaders: 2,
                            modules: true // 模块化css
                        }
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    },
                    {
                        loader: "postcss-loader" // 添加厂商前缀
                    }
                ]
            }
    
      
          
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    //用webpack-devserver建服务器
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8000,
        hot: true,
        hotOnly: true
    },
    
};
module.exports = merge(baseConfig,devConfig);