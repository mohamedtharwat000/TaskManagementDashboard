import eslint from '@eslint/js';
import tslint from 'typescript-eslint';
import reactLint from 'eslint-plugin-react';
import jsxLint from 'eslint-plugin-jsx-a11y';
import reactHooksLint from 'eslint-plugin-react-hooks';
import prettierPluginLint from 'eslint-plugin-prettier';
import prettierConfigLint from 'eslint-config-prettier';

export default tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  jsxLint.flatConfigs.recommended,
  {
    ...reactLint.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'reactHooksLint',
    plugins: { 'react-hooks': reactHooksLint },
    rules: {
      ...reactHooksLint.configs.recommended.rules,
    },
  },
  {
    name: 'prettierLint',
    plugins: { prettier: prettierPluginLint },
    rules: { ...prettierConfigLint.rules },
  },
);
