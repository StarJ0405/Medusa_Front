const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080/",
      // 9000
      changeOrigin: true,
    })
  );

  app.use(
    "/file",
    createProxyMiddleware({
      target: "http://localhost:8080/",
      // 9000
      changeOrigin: true,
    })
  );
  app.use(
    "/v1/papago",
    createProxyMiddleware({
      target: "https://openapi.naver.com/",
      changeOrigin: true,
    })
  );
};