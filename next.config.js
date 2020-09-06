const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withCSS({
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = {
				fs: 'empty',
      };
    }
    config.module.rules.push({
			test: /.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
			use: { loader: 'url-loader', options: { limit: 100000, name: '[name].[ext]' } },
		});

		return config;
	},
}), withFonts, withImages]);
