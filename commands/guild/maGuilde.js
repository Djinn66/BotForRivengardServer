const Command = require('../command')
const Guildes = require('./guildes')

module.exports = class MaGuilde extends Command{

    static match(message){
        return message.content.startsWith("!maGuilde")
    }

    static action (message){
        const [guilde,...rest] = message.content.split(":")
        if(rest.length === 0){
            this.changeGuilde(message,message.guild.member(message.author),guilde.trimStart().trimEnd())
        }
    }

    static changeGuilde(message, member, guilde){


        let guildes = Guildes.getGuildes(message)
        let memberGuilde = guildes.find( g => g.name===guilde)

        if(typeof memberGuilde !== 'undefined'){
            if(member !== message.guild.owner)
            {
                let auteurGuilde = Guildes.hasGuilde(message, member)

                if(typeof member.roles.cache.find(role => role.name === guilde) === 'undefined'){
                    if (typeof auteurGuilde !== 'undefined'){
                        console.log(auteurGuilde.name)
                        console.log(member.user.username)
                        console.log(member.roles.cache.has(auteurGuilde.id))
                        console.log('avant le remove')
                        member.roles.remove(auteurGuilde)
                            .then(
                            userWithRoleRemoved => {
                                console.log('avant le rename')
                                return userWithRoleRemoved.setNickname(
                                    (userWithRoleRemoved.nickname === null ? '' : userWithRoleRemoved.nickname.replace( auteurGuilde.name,memberGuilde.name))
                                )
                            })
                            .then(
                                userWithGuildeRemoved => {
                                    console.log('avant le add')
                                    return userWithGuildeRemoved.roles.add(message.guild.roles.cache.find(role => role.name === guilde))
                                })
                            .then( userWithNewGuild => {
                                message.reply('La guilde a été modifié ! L\'accès au channel de '+guilde+' a été attribué à <@'+userWithNewGuild.id+'>. Bonne journée.')
                                return console.log('promesse OK')
                            }).catch(console.error())
                    }else{
                        member.roles.add(message.guild.roles.cache.find(role => role.name === guilde))
                            .then( memberWithNewRole =>{
                                let nickname = (memberWithNewRole.nickname === null ? memberWithNewRole.user.username : memberWithNewRole.nickname)
                                if((nickname.length + (' [ '+memberGuilde.name+' ]').length) < 32){
                                    return memberWithNewRole.setNickname(
                                        nickname + ' [ '+memberGuilde.name+' ]' )
                                }else {
                                    message.reply('Le pseudo est trop long, vous devez le modifier manuellement!')
                                    return memberWithNewRole
                                }
                            }).then( memberWithNewGuilde =>{
                                message.reply('La guilde a été attribuée à <@'+memberWithNewGuilde.id+'>. Il a maintenant accès au channel de '+guilde+'. Bonne journée.')
                            })
                    }
                }else {
                    message.reply('La guilde  '+guilde+' est déjà attribuée à <@'+member.id+'>.')

                }
            } else {
                message.reply('Désolé je n\'ai pas le droit de modifier la guilde de <@'+member.id+'>, ce doit être un administrateur.')

            }

        }else message.reply('La guilde n\'existe pas.\nCommencez par la créer avec la commande : !addGuilde:<Nom de la Guilde>!')


    }
}


