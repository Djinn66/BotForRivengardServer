const Command = require('../command')
const {prefix} = require('./../../config.json')


//console.log(commands)
module.exports = class Help extends Command{

    static match(message){
        //console.log(commands)
        return message.content === "!help"
    }

    static action (message){
        const {commands} = message.client
        let messageContent =  "Les commandes que je comprends sont les suivantes :\n"
        commands.forEach(({name,description})=> messageContent += `- **${prefix}${name}** : ${description} ${name !== commands.last.name ? "\n" : ""}` )

        message.reply(messageContent)
    }
}


