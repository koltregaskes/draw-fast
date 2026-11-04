import { fixupConfigRules } from '@eslint/compat'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'

// ESLint 9+ dropped .eslintrc support; this is the flat-config
// equivalent of the old { "extends": "next/core-web-vitals" }.
//
// ESLint 10 removed the legacy context methods (context.getFilename and
// friends) that eslint-plugin-react, eslint-plugin-import and
// eslint-plugin-jsx-a11y still call, and its scope manager API no longer
// matches eslint-config-next's Babel parser. fixupConfigRules shims the
// rules; the typescript-eslint parser (ESLint 10 ready) parses JS files.
// Drop both workarounds once eslint-config-next supports ESLint 10.
export default defineConfig([
	...fixupConfigRules(nextVitals),
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: { parser: tseslint.parser },
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
