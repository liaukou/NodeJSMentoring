const fs = require('fs');
const {promisify} = require('util');

const DirWatcher = require('./dirwatcher');
const csvToJson = require('./utils/csvToJson');

const readFileAsync = promisify(fs.readFile);

class Importer {
    constructor(path, delay) {
        this.dirWatcher = new DirWatcher();
        this.dirWatcher.watch(path, delay);
    }

    importCsv() {
        this.dirWatcher.on(DirWatcher.event_types.CHANGED, () => {
            console.log(DirWatcher.event_types.CHANGED);
        });
    }

    import(path) {
        return readFileAsync(path, 'utf8')
            .then(data => csvToJson(data));
    }

    importSync(path) {
        return csvToJson(fs.readFileSync(path));
    }
}

module.exports = Importer;