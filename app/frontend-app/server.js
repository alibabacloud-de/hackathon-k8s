var express = require('express');
const process = require('process');
var app = express();
var proxy = require('express-http-proxy');
var appServerUrl = process.env.SERVER_URL
app.use("/", express.static(__dirname))
app.use('/server', proxy(appServerUrl,{
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    // you can update headers
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    return proxyReqOpts;
  }
}));

app.listen(3000);
console.log("Listening on port 3000")
