const _ = require('lodash');
const fs = require('fs');
const EventEmitter = require('events');
const { promisify } = require('util');

const readDirAsync = promisify(fs.readdir);
const readStatAsync = promisify(fs.stat);

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.intervalsId = {};
    }

    static get event_types() {
        return {
            CHANGED: 'dirChanged'
        }
    };

    watch(path, delay) {
        let state;

        this.intervalsId[path] = setInterval(() => {
            readDirAsync(path).then(files => {
                Promise.all(files.map(file => readStatAsync(path + file)))
                    .then(newState => {
                        if (state && !_.isEqual(state, newState)) {
                            this.emit(DirWatcher.event_types.CHANGED);
                        }
                        state = newState;
                    });
            });
        }, delay);
    }

    unwatch(path) {
        clearInterval(this.intervalsId[path]);
        this.intervalsId[path] = null;
    }
}

module.exports = DirWatcher;