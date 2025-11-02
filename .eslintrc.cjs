module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "eslint:recommended"],
  rules: {
    // Relax rules that create a lot of noise during incremental refactor
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/no-unescaped-entities': 'off',
    'no-case-declarations': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': ['warn'],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
