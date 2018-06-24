var fs = require('fs');
var path = require('path');
var utils = global.utils || {};
utils.directory = {
    getFiles: function (options, done) {
        var results = [];
        var dir = options.dir || "";
        if (!dir) {
            return done('directory path is required!');
        }

        const filter = (file) => {
            if (options.pattern) {
                var matched = file.match(options.pattern);
                return matched;
            }
            return true;
        };

        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            list = list.filter(filter);
            var pending = list.length;
            if (!pending) return done(null, results);

            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        if (options.recursive) {
                            var fileOptions = Object.assign(options, { dir: file });
                            utils.directory.getFiles(fileOptions, function (err, res) {
                                results = results.concat(res);
                                if (!--pending) done(null, results);
                            });
                        } else {
                            if (!--pending) done(null, results);
                        }
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    }
};
global.utils = utils;