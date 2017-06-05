'use strict';

/** Requires */

const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const p = require( './package.json' );

/** Constants */

const NODE_ENV = process.env.NODE_ENV || 'development';
const assetsPath = path.join( __dirname, 'src/files/' );
const stylesPath = path.join( __dirname, 'src/styles/' );
const outputPath = path.join( __dirname, 'dist' );
const templatePath = path.join( __dirname, 'src/views/index.pug' );

module.exports = {

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,

    entry: {
        main: path.join( __dirname, 'src/scripts/main.ts' )
    },
    output: {
        path: outputPath,
        filename: 'js/[name].min.js',
        publicPath: '/'
    },

    resolve: {
        modules: [
            path.resolve( './src/scripts' ),
            'node_modules'
        ],
        extensions: [ '.js', '.ts' ],
        alias: {
            assets: assetsPath,
            styles: stylesPath
        }
    }
    ,
    plugins: [

        new webpack.DefinePlugin( {
            NODE_ENV: JSON.stringify( NODE_ENV ),
            VERSION: JSON.stringify( p.version )
        } ),

        new HtmlWebpackPlugin( {
            title: 'Редактор симулятора поликлиники',
            template: templatePath
        } ),

        new ExtractTextPlugin( {
            filename: 'css/[name].css'
        } ),

        new webpack.ProvidePlugin( {
            $: 'jquery/dist/jquery.js',
            'jQuery': 'jquery/dist/jquery.js'
        } ),

        new webpack.optimize.CommonsChunkPlugin( {
                name: 'vendor',
                minChunks: function( module ) { return /node_modules/.test( module.resource ); }
            }
        ),

        new webpack.optimize.CommonsChunkPlugin( {
            name: 'common'
        } )
    ],

    module: {
        rules: [

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeAttributeQuotes: false,
                            caseSensitive: true,
                            customAttrSurround: [ [ /#/, /(?:)/ ], [ /\*/, /(?:)/ ], [ /\[?\(?/, /(?:)/ ] ],
                            customAttrAssign: [ /\)?\]?=/ ]
                        }
                    }
                ]
            },

            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    exports: false
                }
            },

            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2|wav|mp4|webm|ogv|ico)(\?.*$|$)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                }
            },

            {
                test: /\.less$/,
                use: [
                    'raw-loader',
                    'less-loader'
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                    'angular2-template-loader'
                ]
            }
        ]
    }
};

if( NODE_ENV == 'production' ) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false,
                drop_console: true
            },
            mangle: {
                keep_fnames: true
            }
        } )
    );

    /** Images */
    // Minimize images and svg's
    module.exports.plugins.push(
        new ImageminPlugin( {
            test: /\.(jpe?g|png|gif|svg)$/
        } )
    );
}
