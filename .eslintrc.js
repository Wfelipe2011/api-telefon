module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:import/errors',
		'plugin:import/warnings',
	],

	rules: {
		'max-len': ['error', { code: 250 }],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		semi: ['error', 'always'],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
