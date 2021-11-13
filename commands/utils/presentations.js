const Command = require('../command')

module.exports = class Presentation extends Command{

    static match(message){
        return message.content.startsWith("!presentation")
    }

    static action (message){
        message.channel.send("Bonjour, je suis RivenBot, j'ai été développé afin de vous faciliter la vie " +
            "sur le serveur Rivengard FR.\nN'hésitez pas à me demander ce que je peux faire en tappant !help.")
        message.delete()
    }


 }

