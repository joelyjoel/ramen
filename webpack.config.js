const path = require('path')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    module: {
        rules: [
            {test:/.ts$/, use:'ts-loader'}
        ]
    },

    mode: 'development',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
}