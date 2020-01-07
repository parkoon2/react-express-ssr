const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dev = process.env.NODE_ENV === 'development'
console.log(`
====================
process.env.NODE_ENV
NODE_ENV: ${process.env.NODE_ENV}
IS_DEVELOPMENT: ${dev}
====================
`)

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: dev ? 'inline-source-map' : 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            onlyLocals: true,
                            modules: {
                                localIdentName: dev
                                    ? '[name]__[local]___[hash:base64:5]'
                                    : '[hash:base64]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    emitFile: false,
                    name: 'images/[hash].[ext]',
                    limit: 10000,
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'public/style.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: dev ? JSON.stringify('development') : JSON.stringify('production'),
                PORT: dev ? 3000 : 80
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            client: path.resolve(__dirname, 'src/client'),
            server: path.resolve(__dirname, 'src/server')
        }
    }
}
