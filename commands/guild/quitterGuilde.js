const Command = require('../command')
const Guildes = require('./guildes')

module.exports = class QuitterGuilde extends Command{
    static match(message){
        return message.content.startsWith("!quitterGuilde")
    }

    static action (message){
        (async() => {
            const deleteGuild = await this.deleteMemberGuild(message, message.guild.member(message.author))
        })()
    }

    static deleteMemberGuild (message, member){
        return new Promise(resolve => {
            if(member !== message.guild.owner)
            {
                let auteurGuilde = Guildes.hasGuilde(message, member)
                let nomGuilde = auteurGuilde.name
                console.log(nomGuilde)
                if (typeof auteurGuilde !== 'undefined'){
                    member.roles.remove(auteurGuilde)
                        .then(
                            userWithRoleRemoved => {
                                console.log(userWithRoleRemoved.nickname)
                                console.log(nomGuilde)
                                return userWithRoleRemoved.setNickname(
                                    (userWithRoleRemoved.nickname === null ? '' : userWithRoleRemoved.nickname
                                            .replace( '[ '+nomGuilde+' ]','')
                                            .trimEnd()
                                    )
                                )
                            })
                        .then( userWithoutGuild => {
                            message.reply('La guilde '+nomGuilde+' a été retiré à <@'+userWithoutGuild.id+'>.')

                            return console.log('promesse OK')
                        }).catch(console.error())
                }else{
                    resolve()
                    message.reply('<@'+member.id+'> n\'a pas de guilde!')
                }

            } else {
                resolve()
                message.reply('Désolé je n\'ai pas le droit de modifier la guilde de <@'+member.id+'>, ce doit être un administrateur.')
            }
        })

    }
}


