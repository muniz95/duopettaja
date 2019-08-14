'use strict'

var fs = require('fs');
var path = require('path');
var db = require('../db.json');
var util = require('util');

db.lessons.forEach(e => persist('lessons', e));
db.levels.forEach(e => persist('levels', e));
db.questions.forEach(e => persist('questions', e));
db.skills.forEach(e => persist('skills', e));
db.users.forEach(e => persist('users', e));

function persist(path, entry) {
  fs.writeFile(`./data/${path}/${entry.id}.json`, JSON.stringify(entry), function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  console.log('criado '+dirname)
}