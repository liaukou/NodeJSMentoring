const fs = require('fs');
const csv = require('csvtojson');
const { promisify } = require('util');

const { eventEmitter } = require('./eventEmitter');

const { DIR_WATCHER_CHANGED_EVENT } = require('./constants/events');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

class Importer {
    constructor() {
    }

    import(path) {
        eventEmitter.on(DIR_WATCHER_CHANGED_EVENT, (fileName) => {
            readFileAsync(path)
                .then((data) => {
                    console.log(data)
                });
            // csv()
            //     .fromFile(path)
            //     .on('json',(jsonObj) => {
            //         console.log(jsonObj)
            //     })
            //     .on('done',(error) => {
            //         console.log('end')
            //     })
        });
    }

    importSync(path) {
        eventEmitter.on(DIR_WATCHER_CHANGED_EVENT, (fileName) => {
            console.log('dirChanged');
        });
    }
}

module.exports = Importer;