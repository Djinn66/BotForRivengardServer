const Command = require('../command')
const Guildes = require('./guildes')


module.exports = class AddMember extends Command{

    static match(message){
        return message.content.startsWith("!ajouterMembre")
    }

    static action (message, args){
        const guilde = Guildes.hasGuilde(message,message.guild.member(message.author))

        if(args && guilde){

            let test = (async() => {
                const membersUpdateNick = []
                const membersAddRole = []
                args.forEach(
                    (memberStr) => {
                        const memberID = memberStr.replace("<@!","").replace(">","")
                        let regex = new RegExp('^[0-9]*$')
                        if(regex.test(memberID)) {
                            const member = message.guild.members.cache.find(m => m.id === memberID)
                            const memberGuild = Guildes.hasGuilde(message, member)
                            if (memberGuild !== guilde) {
                                if (!memberGuild) {
                                    let nickname = ""
                                    if (member.nickname !== null) {
                                        let nicknameHasGuild = member.nickname.includes('[')
                                        nicknameHasGuild = nicknameHasGuild && member.nickname.includes(']')

                                        if (nicknameHasGuild) {
                                            nickname = member.nickname.replace(member.nickname.slice(member.nickname.indexOf('['), member.nickname.indexOf(']') + 1), '').trimEnd()
                                        } else nickname = member.nickname
                                    } else nickname = member.user.username

                                    nickname += ' [ ' + guilde.name + ' ]'
                                    if (nickname.length < 32) {
                                        membersUpdateNick.push(
                                            member.setNickname(nickname)
                                        )
                                    } else message.reply('**<@' + member.id + '>** a un pseudo déjà trop long, veuillez entrer le nom de guilde à la main !')

                                    const roleToAdd = message.guild.roles.cache.find(role => role.name === guilde.name)
                                    membersAddRole.push(member.roles.add(roleToAdd))
                                    message.reply('**<@' + member.id + '>** fait maintenant partie de votre Guilde!')

                                } else message.reply('Vous ne pouvez pas ajouter **<@' + member.id + '>** à la Guilde!\n' +
                                    'Il en possède dèja une!')
                            } else message.reply('**<@' + member.id + '>** fait déjà partie de votre Guilde!')
                        }else message.reply('Le format de la requête n\'est pas correct!\n' +
                            '!ajouterMembre: @membre1 : @membre2...')

                    })
                    await Promise.all(membersUpdateNick)
                    await Promise.all(membersAddRole)
            })()
        }
    }

}


