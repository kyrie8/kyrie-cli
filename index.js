#! /usr/bin/env node

// npm link 绑定 bin

const program = require('commander');
const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

//查看版本号
program.version(require('./package.json').version);

//帮助和可选信息
helpOptions();

//创建指令
createCommands();

program.parse(process.argv);
