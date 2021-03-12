// @ts-ignore
module.exports = {
  env: {
    api: process.env.API,
    apiProduction: process.env.API_PRODUCTION,
    url: process.env.URL,
    apiServer: process.env.API_SERVER,
    apiServerProduction: process.env.API_SERVER_PRODUCTION,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
}