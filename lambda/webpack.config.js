const path = require('path');
const webpack = require('webpack');

const serverlessWebpack = require('serverless-webpack');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

// { from: require.resolve('workbox-sw'), to: 'dist/browser/workbox-sw.prod.js' },
// new WorkboxPlugin({
//     globDirectory: 'dist/',
//     globPatterns: ['**/*.{js,gz,png,svg,jpg,ico,html,json,map,ttf,woff,woff2}'],
//     globIgnores: ['**/service-worker.js'],
//     swSrc: 'src/service-worker.js',
//     swDest: 'dist/browser/service-worker.js'
// }),

module.exports = {
    entry: serverlessWebpack.lib.entries,
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },
    // Make sure we include all node_modules etc
    externals: [/(node_modules|main\..*\.js)/, ],
    output: {
        libraryTarget: "commonjs",
        // Puts the output at the root of the dist folder
        path: path.join(__dirname, 'dist', 'lambda'),
        filename: '[name].js'
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify('production') }),
        new CopyWebpackPlugin([
            { context: path.join(process.cwd(), "src"), from: { glob: "assets/**/*", dot: true } },
            { context: path.join(process.cwd(), "src"), from: { glob: "favicon.ico", dot: true } },
            { context: path.join(process.cwd(), "src"), from: { glob: "manifest.json", dot: true } },
            { from: "dist/browser/**/*" },
            { from: "dist/server/**/*" }
        ]),
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'), {}
        )
    ]
}