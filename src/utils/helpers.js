const _ = require('lodash');

const splitByComma = str => _.split(str, ',');
const splitByNewLine = str => _.split(str, /[\n\r]+/ig);

module.exports = {
    splitByComma,
    splitByNewLine
};