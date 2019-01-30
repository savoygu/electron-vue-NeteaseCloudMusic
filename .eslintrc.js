module.exports = {
  root: true,
  parser: 'babel-eslint',
  // parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb-base'
    // 'plugin:vue/recommended'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html'
    // 'vue'
  ],
  rules: {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-restricted-syntax': 0,
    'no-unused-expressions': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    'no-restricted-globals': 0,
    'no-mixed-operators': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'linebreak-style': 0
  }
};
