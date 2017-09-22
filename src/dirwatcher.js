const fs = require('fs');

const { eventEmitter } = require('./eventEmitter');

const { DIR_WATCHER_CHANGED_EVENT } = require('./constants/events');

class DirWatcher {
    watch(path, delay) {
        let timerId;
        fs.watch(path, (eventType, fileName) => {
            if (!timerId) {
                eventEmitter.emit(DIR_WATCHER_CHANGED_EVENT, fileName);
            }
            timerId = setTimeout(function() {
                clearTimeout(timerId);
                timerId = null;
            }, delay);
        });
    }
}

module.exports = DirWatcher;