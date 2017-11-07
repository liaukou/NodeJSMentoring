const cookieMiddleware = function () {
    return (req, res, next) => {
        const parsedCookies = {};
        const cookies = req.headers.cookie;

        if (!cookies) {
            next()
        }

        cookies.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            parsedCookies[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        req.parsedCookies = parsedCookies;
        next();
    }
};

module.exports = cookieMiddleware;