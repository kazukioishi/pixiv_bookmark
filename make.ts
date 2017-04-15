/// <reference path="./typings/index.d.ts"/>
var fs = require('fs');
var execSync: any = require('child_process').execSync;
execSync('tsc', { stdio: [0, 1, 2] })
//script will be compiled to pixiv_bookmark.user.js
var header: string = fs.readFileSync('./header.js', 'utf8');
var script: string = fs.readFileSync('./out/pixiv_bookmark.user.js', 'utf8');
var out: string = header + '\n' + script
fs.writeFileSync('./out/pixiv_bookmark.js', out)
console.info('👍Build OK')