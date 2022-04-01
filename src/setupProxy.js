const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://103.136.36.27:7860',
      changeOrigin: true,
    })
  );
};