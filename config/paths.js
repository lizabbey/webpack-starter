const path = require('path')

module.exports = {
	//Root
	root: path.resolve(__dirname, '../'),

	// Source files
	src: path.resolve(__dirname, '../src'),

	// Production build files
	build: path.resolve(__dirname, '../dist'),

	// Static image files that get copied to build folder
	image: path.resolve(__dirname, '../src/images'),

	// Static font files that get copied to build folder
	fonts: path.resolve(__dirname, '../src/fonts'),
}