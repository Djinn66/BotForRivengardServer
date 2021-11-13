const Command = require('../command')

module.exports = class Help extends Command{

    static match(message){
        return message.content === "!tierList"
    }

    static action (message){
        console.log("tierList")
        message.channel.send('https://media.discordapp.net/attachments/817427423766380548/818169249276362762/image0.jpg?width=371&height=670')
    }
}


