'use strict';
var fs = require('fs');
require('node-sap-promise');

/**
 * Simple file system based store
 * @param {string} filename
 * @param {string} [encoding]
 * @param {number} [fileMode]
 * @constructor
 */
function FileStore(filename, encoding, fileMode) {
    if (typeof filename !== 'string') {
        throw new TypeError('Missing mandatory filename parameter');
    }
    this.filename = filename;
    if (typeof encoding === 'number') {
        fileMode = encoding;
        encoding = undefined;
    }
    this.encoding = encoding || 'utf-8';
    this.fileMode = fileMode || 420;  // default file mode 644
}

module.exports = FileStore;

FileStore.prototype.read = function () {
    return Promise.invoke(fs.readFile, this.filename, { encoding: this.encoding })
        .then(function (content) {
            return JSON.parse(content);
        });
};

FileStore.prototype.write = function (store) {
    var content;
    try {
        content = JSON.stringify(store, null, '  ');
        return Promise.invoke(fs.writeFile, this.filename, content, { mode: this.fileMode });
    }
    catch (err) {
        return Promise.reject(err);
    }
};
