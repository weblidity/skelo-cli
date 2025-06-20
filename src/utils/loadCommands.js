const fs = require('fs');
const path = require('path');

function loadCommands(program) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (typeof command.register === 'function') {
            command.register(program);
        }
    }
}

module.exports = loadCommands;