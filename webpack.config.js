const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },{
                test: /\.(gif|svg|jpg|png|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader",
            }],
        },
        plugins: [
            CSSExtract,
            new WorkboxPlugin.GenerateSW({
                runtimeCaching: [
                  {
                      urlPattern: /images/,
                      handler: 'cacheFirst'
                  },
                  {
                      urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
                      handler: 'cacheFirst'
                  },
                  {
                      urlPattern: /.*/,
                      handler: 'cacheFirst'
                  }
              ]
              })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            host:'0.0.0.0',
            disableHostCheck: true,
        }
    };
};