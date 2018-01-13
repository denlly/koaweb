var DevWebpack = require('./src/config/webpack.dev');
var ProdWebpack = require('./src/config/webpack.prod');
switch (process.env.NODE_ENV) {
    case 'dev':
        module.exports = DevWebpack;
        break;
    case 'prod':
        module.exports = ProdWebpack;
        break;
    default:
        module.exports = DevWebpack;
}