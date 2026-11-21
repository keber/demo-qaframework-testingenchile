// ESLint flat config - agentic-playwright Constitution, adapted to qa-framework.
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
      'blob-report/**',
      'diagnosis/**',
      // qa-framework init bootstrap, CommonJS and inert for this no-auth project.
      // Kept on disk (must not be deleted) but not held to the Constitution.
      'scripts/**',
      'fixtures/auth.ts',
      'fixtures/base.ts',
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    },
  },
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts', 'fixtures/pom/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/require-top-level-describe': 'error',
      'playwright/expect-expect': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-raw-locators': 'warn',
      'playwright/no-nth-methods': 'warn',
    },
  },
  prettier,
);
