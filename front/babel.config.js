module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['next/babel', '@babel/preset-env'],
    plugins: [
      '@babel/plugin-transform-runtime',
      ['import', { style: true }, 'syntax-dynamic-import'],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          displayName: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './src/components',
            '@modules': './src/modules',
            '@reducers': './src/reducers',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@styles': './src/styles',
            '@util': './src/util',
            '@pages': './src/pages',
          },
        },
      ],
    ],
  };
};
