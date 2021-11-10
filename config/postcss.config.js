module.exports = {
	plugins: [
		{
			'postcss-preset-env': {
				browsers: 'last 2 versions',
			},
		},
		'postcss-object-fit-images',
		{
			'pixrem': {
				atrules: true
			},
		},		
		'cssnano'
	],
}