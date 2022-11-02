module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-side-effects-in-computed-properties':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-destructuring': 'off',
    'vue/html-closing-bracket-newline': [2, { multiline: 'never' }],
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'off',
    'no-lonely-if': "off"
  },
};
