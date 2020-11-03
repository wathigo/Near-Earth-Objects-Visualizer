const { createProxyMiddleware } = require('http-proxy-middleware');

// restream parsed body before proxying
var restream = function (proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
};
module.exports = function (app) {
    app.use(
        createProxyMiddleware(`/`, {
            target: "http://localhost:3000/",
            secure: false,
            changeOrigin: true,
            onProxyReq: restream
        })
    );
}