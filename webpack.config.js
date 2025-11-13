const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const packageJson = require("./package.json");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/index.tsx",
    mode: isProd ? "production" : "development",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        // Важный момент: устанавливаем publicPath для GitHub Pages
        publicPath: isProd ? `${packageJson.homepage}/` : "/",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            esModule: true,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                exportLocalsConvention: "camelCaseOnly",
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /\.module\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new DefinePlugin({
            "process.env.PUBLIC_URL": JSON.stringify(
                isProd ? packageJson.homepage : ""
            ),
        }),
    ],

    devServer: {
        port: 4000,
        open: true,
        hot: true,
        historyApiFallback: true, // чтобы React Router работал на GH Pages
    },
};
