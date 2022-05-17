module.exports = {
	// https://github.com/vercel/next.js/issues/21079
	images: {
		loader: 'custom',
	},
	target: 'serverless',
	productionBrowserSourceMaps: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}
