const url = require('url');
const querystring = require('querystring');

const queryMiddleware = function () {
    return (req, res, next) => {
        const reqUrl = req.url;
        req.parsedQuery = querystring.parse(url.parse(reqUrl).query);
        next();
    }
};

module.exports = queryMiddleware;