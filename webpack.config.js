// import system dependencies
const path = require('path');

////////////////////////////////////////////////////////////////////////////////////////////////////

const configuration = {
    devtool: 'source-map',
    entry: {
        main: './src/main.jsx',
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build/js'),
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '*'],
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = configuration;
