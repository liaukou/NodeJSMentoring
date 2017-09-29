const _ = require('lodash');
const { splitByComma, splitByNewLine } = require('./helpers');

function csvToJson(data) {
    const content = splitByNewLine(data);
    const header = splitByComma(_.head(content));

    return _.tail(content)
        .reduce((res ,line) => line ? [...res, _.zipObject(header, splitByComma(line))] : res, []);
}

module.exports = csvToJson;
