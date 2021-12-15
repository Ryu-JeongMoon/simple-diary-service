var tsOption = {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  bracketSameLine: true,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'auto',
  importOrder: [
    '^re(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@(?:components|containers|pages)(.*)$',
    '^@(?:assets|constants|hooks|styles|types|util)(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = {
  overrides: [
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'babel-ts',
        ...tsOption,
      },
    },
    {
      files: '*.{js,jsx}',
      options: {
        parser: 'babel',
        ...tsOption,
        printWidth: 80,
      },
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
        semi: true,
        useTabs: true,
        tabWidth: 2,
      },
    },
  ],
};
