import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import stylexPlugin from '@stylexjs/eslint-plugin'

export default tseslint.config(
    {
        ignores: ['dist', 'eslint.config.mjs', 'vite.config.ts'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        // 1. Реєструємо плагін StyleX
        plugins: {
            '@stylexjs': stylexPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Базові налаштування
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',

            // 2. Вимикаємо "unsafe" правила для комфортної роботи зі StyleX
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',

            // 3. Додаємо правила StyleX
            '@stylexjs/valid-styles': 'error',
            '@stylexjs/valid-shorthands': 'warn',
            '@stylexjs/sort-keys': 'warn',

            // Налаштування Prettier
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    tabWidth: 4,
                    semi: false,
                    singleQuote: true,
                    trailingComma: 'es5',
                },
            ],
        },
    }
)
