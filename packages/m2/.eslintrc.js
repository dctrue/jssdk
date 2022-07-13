module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['prettier', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'no-use-before-define': [0],
    'no-debugger': [0],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 'off'
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     ts: 'never',
    //     tsx: 'never'
    //   }
    // ]
  }
  // settings: {
  //   'import/resolver': {
  //     typescript: {}
  //   }
  // }
}
