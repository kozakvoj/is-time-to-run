var fs = require("fs");
var moment = require('moment');

const FILE_NAME = ".isTimeToRun";

function IsTimeToRun(opts) {
    this.path = opts.path || '';
    this.period = opts.period || 60;
    this.unit = opts.unit || 'minutes';
}

IsTimeToRun.prototype.isTime = function (callback) {
    let path = this.path;

    readTime(path, (err, data) => {
        if (err && err.errno === -4058) {
            return updateTime(path, () => callback(null, true));
        }

        if (new moment() > new moment(data).add(this.period, this.unit)) {
            return updateTime(path, () => callback(null, true));
        }

        callback(null, false);
    })
};

IsTimeToRun.prototype.lastRun = readTime;

function updateTime(path, callback) {
    fs.writeFile(path + FILE_NAME, new moment().format(), (err) => {
        if (err) throw 'Error IO';
        callback();
    });
}

function readTime(path, callback) {
    fs.readFile(path + FILE_NAME, (err, data) => {
        if (err && err.errno !== -4058) throw 'Error IO';

        return data ? callback(err, data.toString()) : callback(err, null);
    });
}

module.exports = IsTimeToRun;