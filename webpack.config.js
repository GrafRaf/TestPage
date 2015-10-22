'use strict';

var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    context: path.join(__dirname, 'web/src'),
    //entry: {
    //    index: './app/index.js',
        //forgot: './app/forgot',
        //signup: './app/signup',
        //signin: './app/signin',
        //manage: './app/manage',
        //student: './app/student',
        //owner: './app/owner',
        //root: './app/root'
    //},
    entry: ['./app/index.js', 'file?name=index.html!jade-html!./templates/index.jade'],
    output: {
        path: __dirname,
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.jade/, loader: "jade-html-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.png$/, loader: "url-loader?limit=10000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.js/, exclude: (/bower_components|node_modules/), loader: "babel-loader" },
            { test: /\.jsx/, exclude: (/bower_components|node_modules/), loader: "babel-loader" },
            { test: /\.woff2$/, loader: "url?limit=10000&minetype=application/font-woff2" },
            { test: /\.woff$/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf$/, loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot$/, loader: "file" },
            { test: /\.svg$/, loader: "url?limit=10000&minetype=image/svg+xml" },
            { test: /\.stylus$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: [/bower_components/, /node_modules/],
                loader: "jshint-loader"
            },
            {
                test: /\.jsx$/,
                exclude: [/bower_components/, /node_modules/],
                loader: "jsxhint-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("shared", "shared.js"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Hammer: "hammerjs"
        }),
        new ExtractTextPlugin("[name].css"),
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles: ['bower.json', '.bower.json'],
            includes: /.*/
        })
    ]
};

