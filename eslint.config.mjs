import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { rules } from 'eslint-config-prettier';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export default [
	{ files: ['*/.{js,mjs,cjs,jsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules: {
			semi: 'error',
		},
	},
];
