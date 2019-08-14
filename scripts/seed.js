'use strict'

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var files = {
  'lessons': [],
  'levels': [],
  'questions': [],
  'skills': [],
  'users': []
};

glob.sync('./data/**/*.json').forEach(function (file) {
  files[file.split('/')[2]].push(require(path.resolve(file)));
});

// console.log(files);
fs.writeFile(`./db.json`, JSON.stringify(files), console.log);