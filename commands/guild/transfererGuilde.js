const Command = require('./../command')
const Guildes = require('./guildes')

module.exports = class TransfererGuilde extends Command{

    static match(message){
        return message.content.startsWith("!transfererGuilde")
    }

    static action (message, args){
        if (!args[0]) {
            return message.reply(`Vous devez désigner un nouveau Chef de Guilde!`)
        } else{
            let nouveauChefID=args[0]
                .trim()
                .replace("<@!","")
                .replace(">","")
            let nouveauChefDeGuilde = message.guild.members.cache.find(member => member.id === nouveauChefID)
            if(nouveauChefDeGuilde){
                let sameGuilde = Guildes.hasGuilde(message,nouveauChefDeGuilde)===Guildes.hasGuilde(message,message.guild.member(message.author))
                if(sameGuilde){
                    let roleChef = message.guild.roles.cache.find(role => role.name === 'Chef de Guildes')
                    nouveauChefDeGuilde.roles.add(roleChef).then(() => {
                        message.reply(`L'utilisateur <@${nouveauChefDeGuilde.id}> est le nouveau Chef de **[ ${Guildes.hasGuilde(message, nouveauChefDeGuilde).name} ]**!`)
                    })
                    message.guild.member(message.author).roles.remove(roleChef).then(console.log)
                }else message.reply(`Le nouveau **Chef** doit appartenir à la guilde!`)
            }else message.reply('Le Chef de guilde n\'est pas sur le serveur!')
        }
    }
}
