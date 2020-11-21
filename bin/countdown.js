#!/usr/bin/env node
const { countdown } = require('../index');
const { program } = require('commander');
program.version('0.0.1');
function myParseInt(value, dummyPrevious) {
  return parseInt(value);
}
program
  .option('-h, --hour <number>', 'set hour', myParseInt)
  .option('-m, --minute <number>', 'set minute', myParseInt)
  .option('-s, --second <number>', 'set second', myParseInt)
  .option('-r, --random', 'set random time');

program.parse(process.argv);
let time = 0;
if (program.hour) {
  time += program.hour * 3600 * 1000;
}
if (program.minute) {
  time += program.minute * 60 * 1000;
}
if (program.second) {
  time += program.second * 1000;
}
if (program.random) {
  const hour = ~~(Math.random() * 10);
  const minute = ~~(Math.random() * 60);
  const second = ~~(Math.random() * 60);
  time = (hour * 3600 + minute * 60 + second) * 1000;
}

if (time) {
  countdown(time);
} else {
  console.log('Please enter time !!!');
}
