const Command = require('../command')
const Guildes = require('./guildes')


module.exports = class RemoveMember extends Command{

    static match(message){
        return message.content.startsWith("!supprimerMembre")
    }

    static action (message, args){

        const guilde = Guildes.hasGuilde(message,message.guild.member(message.author))

        if(args && guilde){

            let test = (async() => {
                const membersUpdateNick = []
                const membersRemoveRole = []
                args.forEach(
                    (memberStr) => {
                        const memberID = memberStr.replace("<@!","").replace(">","")
                        let regex = new RegExp('^[0-9]*$')
                        if(regex.test(memberID)) {
                            const member = message.guild.members.cache.find(m => m.id === memberID)
                            const memberGuild = Guildes.hasGuilde(message, member)
                                if (memberGuild === guilde) {
                                    let nickname = ""
                                    if (member.nickname !== null) {
                                        let nicknameHasGuild = member.nickname.includes('[')
                                        nicknameHasGuild = nicknameHasGuild && member.nickname.includes(']')
                                        if (nicknameHasGuild) {
                                            nickname = member.nickname.replace('[ '+guilde.name+' ]', '').trimEnd()
                                        } else nickname = member.nickname
                                        membersUpdateNick.push(member.setNickname(nickname))
                                    }

                                    const roleToRemove = message.guild.roles.cache.find(role => role.name === guilde.name)
                                    membersRemoveRole.push(member.roles.remove(roleToRemove))
                                    message.reply('**<@' + member.id + '>** ne fait plus partie de votre Guilde!')

                                } else message.reply('**<@' + member.id + '>** ne fait pas partie de votre Guilde!')
                           // } else message.reply('**<@' + member.id + '>** ne possède pas de guilde!')
                        }else message.reply('Le format de la requête n\'est pas correct!\n' +
                            '!ajouterMembre: @membre1 : @membre2...')

                    })
                    await Promise.all(membersUpdateNick)
                    await Promise.all(membersRemoveRole)
            })()
        }
    }

}


