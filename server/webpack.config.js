const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        server: path.join(__dirname, 'server.ts'),
        start: path.join(__dirname, 'start.ts'),
    },
    resolve: { extensions: ['.js', '.ts'] },
    target: 'node',
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.join(__dirname, '..', 'dist', 'server'),
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
        // https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, '..', 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, '..', 'src'), {}
        )
    ]
};