const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const through = require('through2');
const request = require('request');
const ss = require('stream-stream');
const Converter = require('csvtojson').Converter;

const readDirAsync = promisify(fs.readdir);

function inputOutput(filePath) {
    const reader = fs.createReadStream(filePath);

    reader.pipe(process.stdout);
    reader.on('end', () => { console.log('\nFinish') });
}

function transform() {
    const stream = through(function (buffer, encoding, next) {
        const data = buffer.toString().toUpperCase();

        this.push(data);
        next();
    });

    process.stdin.pipe(stream).pipe(process.stdout);
}

function transformFile(filePath, toFile) {
    const converter = new Converter({ toArrayString: true });
    const reader = fs.createReadStream(filePath);

    if (toFile) {
        const outputFilePath = filePath.slice(0, -3) + 'json';
        const writer = fs.createWriteStream(outputFilePath);

        reader.pipe(converter).pipe(writer);
    } else {
        reader.pipe(converter).pipe(process.stdout);
    }
    reader.on('end', () => { console.log('\nFinish') });
}

function cssBundler(dirPath) {
    const cssRegExp = /(\.css)$/i;
    const URLRegExp = /^(https?:\/\/)/i;
    const bundleFileName = 'bundle.css';
    const outputFilePath = path.join(dirPath, bundleFileName);
    const cssURL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

    const writer = fs.createWriteStream(outputFilePath);

    let reader;

    readDirAsync(dirPath)
        .then(files => {
            const stream = ss();
            const cssFiles = files
                .filter(file => file !== bundleFileName && cssRegExp.test(file))
                .map(file => path.join(dirPath, file));

            cssFiles.push(cssURL);

            cssFiles.forEach(file => {
                reader = URLRegExp.test(file) ? request.get(file) : fs.createReadStream(file);
                stream.write(reader);
            });

            stream.end();
            stream.pipe(writer);
            stream.on('end', () => { console.log('\nFinish') });
        })
        .catch(error => { console.log(error) });
}

module.exports = {
    cssBundler,
    transform,
    transformFile,
    inputOutput
};