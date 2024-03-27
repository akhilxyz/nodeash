const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
        library: "hyperpayv2",
        libraryTarget: "umd",
        globalObject: "this",
    },
    module: {
        rules: [
            {
                test: /\.ts(x*)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "config/tsconfig.umd.json",
                    },
                },
            },
        ],
    },
    resolve: {
        fallback: {
            assert: false,
            buffer: false,
            stream: false,
            crypto: false,
            url: false,// Disable the built-in 'crypto' module to use the polyfill
            // Other modules can be polyfilled in a similar manner
        },
        extensions: [".ts", ".js",],
    },
};