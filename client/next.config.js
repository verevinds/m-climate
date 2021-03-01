//@ts-ignore
module.exports = {
  env: {
    api: process.env.API,
    apiProduction: process.env.API_PRODUCTION,
    apiServer: process.env.API_SERVER,
    nodeEnv: process.env.NODE_ENV,
    apiServerProduction: process.env.API_SERVER_PRODUCTION,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
  webpack(config) {
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