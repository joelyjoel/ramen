const path = require('path')

module.exports = [
    {
        entry: {
            main: './src/demo.ts',
            demoserver: './src/demo.server.ts',
            "local.demo": './src/demos/local.demo.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
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

        externals: {
            'socket.io': 'commonjs socket.io',
            express: 'commonjs express',
            http: 'commonjs http',
        },

        node: {
            __dirname: false,
        }
    },
]