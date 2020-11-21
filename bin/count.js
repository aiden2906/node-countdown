#!/usr/bin/env node
const db = require('../index');
const now = new Date();
const s = [];
db.get();
const rs = db.createReadStream();
rs.on('data', function (data) {
  console.log(data);
  s.push(data);
});
rs.on('close', function () {
  db.put(`${now.getTime()}`, `${now.getTime()}`);
  console.log(s.length + 1);
});
