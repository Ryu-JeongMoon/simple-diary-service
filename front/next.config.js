import { withBundleAnalyzer } from '@next/bundle-analyzer';

withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        // 다른 쓸데없는 언어 없애주기
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=fonts/[name].[ext]!static',
      },
    ],
  },
  options: {
    presets: ['@babel/preset-react'],
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@babel/plugin-proposal-decorators').default,
    {
      legacy: true,
    },
  ],
});
