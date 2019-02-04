const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const distDir = path.resolve(__dirname, 'dist')
const srcDist = path.resolve(__dirname, 'src')
const config = {
    entry: srcDist + '/index.js',
    output: {
        path: distDir + '/src',
        filename: '/static/js/bundle.js',
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("images"),
      ]
}

module.export = config;