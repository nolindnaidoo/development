module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  plugins: ['prettier', 'mocha'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
      },
    ],
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
    'react/no-unescaped-entities': 'off',
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    'react/require-default-props': 'off',
    'mocha/no-exclusive-tests': 'error',
    'require-jsdoc': [
      'error',
      {
        require: {
          ClassDeclaration: true,
          FunctionDeclaration: false,
          MethodDefinition: false,
        },
      },
    ],
    'valid-jsdoc': 'error',
  },
};
