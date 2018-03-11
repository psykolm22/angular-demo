const path = require('path');
const webpack = require('webpack');

const { join } = require('path');
const { ContextReplacementPlugin } = require('webpack');

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
    entry: {
        server: join(__dirname, 'server.ts'),
        start: join(__dirname, 'start.ts'),
    },
    resolve: { extensions: ['.js', '.ts'] },
    target: 'node',
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: join(__dirname, '..', 'dist', 'server'),
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
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for 'WARNING Critical dependency: the request of a dependency is an expression'
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            join(__dirname, '..', 'src'), // location of your src
            {} // a map of your routes
        ),
        new ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            join(__dirname, '..', 'src'), {}
        )
    ]
};