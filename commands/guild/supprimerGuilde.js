const Command = require('../command')
//const QuitterGuilde = require('./quitterGuilde')
const Guildes = require('./guildes')


module.exports = class SupprimerGuilde extends Command{
    static match(message){
        return message.content.startsWith("!supprimerGuilde")
    }

    static action (message,args){
        let guilde
        // let [command,guilde,...rest] = message.content.split(":")
        // guilde = guilde.trimStart().trimEnd()
        let isAdmin = message.guild.member(message.author)===message.guild.owner
        if(args[0] && isAdmin){
            guilde = message.guild.roles.cache.find(role => role.name === args[0].trimStart().trimEnd())
        } else guilde = Guildes.hasGuilde(message,message.guild.member(message.author))
        if(guilde){
            let hasGuild = message.guild.member(message.author).roles.cache.find(role => role.name === guilde.name)
            if(hasGuild || isAdmin){
                let role = message.guild.roles.cache.find(role => role.name === guilde.name)
                let channel = message.guild.channels.cache.find(role => role.name === guilde.name)
                console.log(role.name,',',channel.name)
                 let test = (async() => {

                     const membersToKick = []
                     const cannauxChildren = []
                     role.members.forEach(
                         (member) => {
                             membersToKick.push(
                                 member.setNickname(
                                     (member.nickname === null ? '' : member.nickname
                                             .replace( '[ '+guilde.name+' ]','')
                                             .trimEnd()
                                     )
                             ))
                         })
                     channel.children.forEach(canal => cannauxChildren.push(console.log(canal.delete())))
                     await Promise.all(membersToKick)
                     console.log("avant children")
                     await Promise.all(cannauxChildren)
                     console.log("avant suppression")
                     await Promise.all([
                         (async()=>console.log(await channel.delete().name))(),
                         (async()=>console.log(await role.delete().name))()
                     ])
                     message.reply('La guilde ' + guilde.name + ' a été supprimée avec succès.')

                 })()
             } else message.reply('Vous devez être le chef de la guilde pour supprimer une Guilde.')


        }else message.reply('Vous n\'avez pas de guilde.')
    }
}


