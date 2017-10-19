#!/usr/bin/env node

const commander = require('commander');

const actions = require('./actions');

function printHelpMessage() {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ ./streams.js --action=io --file=users.csv');
    console.log('    $ ./streams.js --action=bundle-css --path=./assets/css');
    console.log('    $ ./streams.js --action=transform-file --file=users.csv');
    console.log('    $ ./streams.js --action=transform-file --file=users.csv --toFile');
    console.log('    $ ./streams.js --action=transform');
    console.log('    $ ./streams.js -a io -f users.csv');
    console.log('    $ ./streams.js -a transform-file -f users.csv -t');
    console.log('    $ ./streams.js --help');
    console.log('    $ ./streams.js -h');
    console.log('');
}

commander
    .version('0.0.1')
    .option('-a, --action <action>', 'Action')
    .option('-f, --file <file>', 'File path')
    .option('-p, --path <path>', 'Path')
    .option('-t, --toFile', 'toFile flag')
    .on('--help', printHelpMessage);

commander.parse(process.argv);

switch (commander.action) {
    case 'io':
        actions.inputOutput(commander.file);
        break;
    case 'transform-file':
        actions.transformFile(commander.file, commander.toFile);
        break;
    case 'transform':
        actions.transform();
        break;
    case 'bundle-css':
        actions.cssBundler(commander.path);
        break;
    default:
        console.log('Wrong input');
        printHelpMessage();
        break;
}
