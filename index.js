//Database
const path = require('path');
const levelup = require('levelup');
const leveldown = require('leveldown');
const os = require('os');

//Stream console terminal
const ttys = require('ttys');
const readline = require('readline');
const ASCIINumbers = require('ascii-numbers').default;
const font = require('ascii-numbers/fonts/ANSI_Shadow');

//Play sound
const sound = require('sound-play');

//Initial database
const FOLDER = '.node-diary';
const HOME_DIR = os.homedir();
const DB_PATH = path.join(HOME_DIR, FOLDER, 'db');
const db = levelup(leveldown(DB_PATH));

//Initial config countdown
const timeoutText = [
  '████████╗██╗███╗   ███╗███████╗ ██████╗ ██╗   ██╗████████╗',
  '╚══██╔══╝██║████╗ ████║██╔════╝██╔═══██╗██║   ██║╚══██╔══╝',
  '   ██║   ██║██╔████╔██║█████╗  ██║   ██║██║   ██║   ██║',
  '   ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██║   ██║   ██║',
  '   ██║   ██║██║ ╚═╝ ██║███████╗╚██████╔╝╚██████╔╝   ██║',
  '   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝  ╚═════╝    ╚═╝',
];
const config = {
  lineLength: 50,
  minDigits: null,
  space: '',
};
const asciiNumbersWithFont = new ASCIINumbers(font, config);
const fontHeight = asciiNumbersWithFont.getFontStatistic().height;
const i = readline.createInterface(ttys.stdin, ttys.stdout);
function clearScreen(height) {
  let iterator = height;
  while (iterator > 0) {
    ttys.stdout.write('\x1B[K\x1B[1A\r');
    iterator -= 1;
  }
}
function countdown(input) {
  let time = ~~(input / 1000);
  let intervalId = setInterval(() => {
    if (time <= 0) {
      timeoutText.map((l) => i.write(l + '\n'));
      clearInterval(intervalId);
      sound.play(path.join(__dirname, './sound_end.mp3')).then((resp) => {
        i.close();
        ttys.stdin.pause();
      });
      return;
    }
    const hour = ~~(time / 3600);
    const minute = ~~((time - hour * 3600) / 60);
    const second = time - hour * 3600 - minute * 60;
    i.write(asciiNumbersWithFont.getNumber(time));
    i.write(
      `\n${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${
        second >= 10 ? second : '0' + second
      }`
    );
    time -= 1;
    setTimeout((_) => {
      clearScreen(fontHeight);
    }, 970);
  }, 1000);
}

module.exports = {
  db,
  countdown,
};
