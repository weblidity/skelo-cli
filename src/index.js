const { Command } = require('commander');
const loadCommands = require('./utils/loadCommands');

function main() {
    const program = new Command();

    program
        .name('skelo')
        .description('Skelo CLI tool')
        .version('0.0.1');

    loadCommands(program);

    program.parse(process.argv);
}

main();
