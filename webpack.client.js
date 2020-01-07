const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const pathsToClean = ['public']
const cleanOptions = {
    watch: true
}

const AssetsPlugin = require('assets-webpack-plugin')

const assetsPluginInstance = new AssetsPlugin({
    includeManifest: 'manifest',
    prettyPrint: true
})

const VENDOR_LIBRARIES = [
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
    'react-redux',
    'react-router-config',
    'redux'
]

const dev = process.env.NODE_ENV === 'development'
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: dev ? 'inline-source-map' : 'source-map',
    entry: {
        vendor: VENDOR_LIBRARIES,
        app: './src/client/client.js'
    },
    output: {
        // filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules',
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName:
                                    dev === 'production'
                                        ? '[hash:base64]'
                                        : '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: true,
                                    stage: 3,
                                    features: { 'custom-properties': false }
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName:
                                    dev === 'production'
                                        ? '[hash:base64]'
                                        : '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: true,
                                    stage: 3,
                                    features: { 'custom-properties': false }
                                })
                            ]
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
                    name: 'images/[hash].[ext]',
                    limit: 10000,
                    esModule: false
                }
            }
        ]
    },

    optimization: dev
        ? {}
        : {
              minimize: true,
              minimizer: [
                  new TerserPlugin({
                      extractComments: true,
                      cache: true,
                      parallel: true,
                      sourceMap: true, // Must be set to true if using source-maps in production
                      terserOptions: {
                          extractComments: 'all',
                          compress: {
                              drop_console: true
                          }
                      }
                  }),
                  new OptimizeCSSAssetsPlugin({})
              ],
              splitChunks: {
                  name: 'vendor',
                  chunks: 'initial'
              }
          },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(`${dev ? 'development' : 'production'}`)
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CleanWebpackPlugin(),
        assetsPluginInstance
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            client: path.resolve(__dirname, 'src/client'),
            server: path.resolve(__dirname, 'src/server')
        }
    }
}
