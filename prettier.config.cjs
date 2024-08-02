/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
};

module.exports = config;
