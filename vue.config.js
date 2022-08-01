//const csvLoader = require('csv-loader');
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('csv-loader')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .end();
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? `/${process.env.VUE_APP_DEPLOY_PATH}/`
      : "/",
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    }
  }
};
