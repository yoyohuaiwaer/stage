/**
 * Created by admin on 2017/11/16.
 */
// 路径
// require('./src/json/imgdatas')
var path = require('path')
var ROOT_PATH = path.resolve(__dirname)
var SRC_PATH = path.resolve(ROOT_PATH, 'src')
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
var srcDir = path.resolve(process.cwd(), 'src')
var nodeModPath = path.resolve(__dirname, './node_modules')
    // 插件
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // less独立打包
var ImageminPlugin = require('imagemin-webpack-plugin').default; // 图片压缩

module.exports = {
    entry: [SRC_PATH + '/App.jsx'], // 入口文件
    output: {
        path: BUILD_PATH, // 和入口文件对应的路径
        filename: 'js/[name].js'
            // publicPath: './src/' 
    },
    devtool: 'source-map', // 调试的时候需要的工具 会出现未打包之前的文件
    module: { // 依赖的模块
        rules: [{
                test: /\.less$/, // less
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true // 压缩css
                            }
                        },
                        {
                            loader: 'postcss-loader', // 浏览器兼容性
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: '/\.json$/',
                use: [{
                    loader: 'json-loader'
                        /*  options:{
                             
                         } */
                }]
            },
            {
                // 图片加载器
                test: /\.(png|jpg|gif|jpeg)$/, // .(png|jpe?g|gif|svg)(\?.*)?$
                use: [{
                        loader: 'file-loader',
                        options: {
                            limit: '8192',
                            outputPath: 'images/',
                            name: '[name].[ext]?[hash]',
                            useRelativePath: true

                        }
                    },
                    /* {
                        loader: 'url-loader',
                        options: {
                            limit: '8192',
                            name: '[name].[ext]'
                        }
                    }, */

                    'image-webpack-loader', // 压缩图片
                ]
            },
            {
                // 图片加载器
                test: /\.(woff|svg|eot|ttf)\??$/, // .(png|jpe?g|gif|svg)(\?.*)?$
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: '8192',
                        outputPath: 'css/fonts/',
                        name: '[name].[ext]?[hash]',
                        useRelativePath: true

                    }
                }]
            },

            {
                test: /\.jsx$/,
                use: [
                    { loader: 'babel-loader' }
                    // { loader: 'json-loader' }
                ],
                exclude: /node_modules/
            }

        ]
    },
    // 添加的插件
    plugins: [
        // new HtmlwebpackPlugin(),

        new HtmlwebpackPlugin({
            title: 'lottery index',
            filename: 'html/index.html',
            template: 'src/html/index.html',
            inject: true,
            hash: true,
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true // 删除空白符与换行符
            }
        }),
        /*  new webpack.optimize.UglifyJsPlugin({ // 压缩代码
             compress: {
                 warnings: false
             },
             except: ['$super', '$', 'exports', 'require'] // 排除关键字
         }), */
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '95-100'
            }
        })

    ],

    devServer: {
        contentBase: './dist/html', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转 
        inline: true, // 实时刷新 ,
        hot: true // 热替换
            // port:设置默认监听端口，如果省略，默认为”8080“ 
    }
}