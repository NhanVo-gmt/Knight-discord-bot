const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    for (const commandCategory of commandCategories)
    {
        const commandFile = getAllFiles(commandCategory);
        
        for (const command of commandFile)  {
            const commandObject = require(command);

            if (exceptions.includes(commandObject.name))
            {
                continue;
            }

            localCommands.push(commandObject);
        }
    }

    return localCommands;
}