const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://eviolspirid.amocrm.ru',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api/v4/leads' },
      },
    },
  },
});