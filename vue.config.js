const path = require('path')

module.exports = {
  // chainWebpack: (config) => {
  //   const svgRule = config.module.rule('svg');

  //   svgRule.uses.clear();

  //   svgRule
  //     .use('vue-loader-v16')
  //     .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
  //     .end()
  //     .use('vue-svg-loader')
  //     .loader('vue-svg-loader');
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/styles/variables.scss";',
      },
    },
  },
  pwa: {
    name: 'studiooo',
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
};
