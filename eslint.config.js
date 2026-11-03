// ESLint's flat config, in the shape ESLint 9 expects.
//
// The repository had the packages but no config, so `npm run check` — which the Pages workflow runs before every deploy —
// failed before it linted anything. The rules here are the type-aware-free recommended sets plus the React hooks rules the
// codebase already follows by hand: enough to catch a floating promise in a build script or a stale dependency array in an
// effect, without demanding a rewrite of files nobody was asked to touch.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
	{
		ignores: ['dist/**', 'node_modules/**', 'public/content/**', 'public/download/**', 'public/pdf/**', 'public/imported/**']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx,mts}'],
		plugins: { 'react-hooks': reactHooks },
		rules: {
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }]
		}
	},
	{
		files: ['scripts/**/*.mts'],
		languageOptions: {
			globals: { process: 'readonly', console: 'readonly', URL: 'readonly', TextEncoder: 'readonly', TextDecoder: 'readonly' }
		}
	}
);
