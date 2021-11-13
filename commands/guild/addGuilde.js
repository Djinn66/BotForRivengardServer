const Command = require('../command')
const MaGuilde = require('./maGuilde')
const Color = require('randomcolor')

module.exports = class AddGuilde extends Command{

    static match(message){
        return message.content.startsWith("!ajouterGuilde")
    }

    static action (message){

        let [guilde,pseudoChef,...rest] = message.content.split(":")
        guilde = guilde.trimStart().trimEnd()
        if(rest.length === 0){
            console.log(guilde)
            let everyoneID = message.guild.roles.cache.findKey(role => role.name === '@everyone')
            let chefRoleID = message.guild.roles.cache.findKey(role => role.name === 'Chef de Guildes')
            let botRoleID = message.guild.roles.cache.findKey(role => role.name === 'RivenBot')
            let typeRole = typeof message.guild.roles.cache.find(role => role.name === guilde)
            let typeChannel = typeof message.guild.channels.cache.find(guildeChannel => guildeChannel.name === guilde)

            if( typeRole === 'undefined' || typeChannel === 'undefined'){

                (async() => {
                    try{
                        const nouveauRole = await message.guild.roles.create({
                            data: {
                                name: guilde,
                                color: Color(),
                                hoist: true,
                            }
                        })
                        console.log(nouveauRole.id)
                        const nouvelleCategory = await message.guild.channels.create(guilde, {
                            type: 'category',
                            permissionOverwrites: [
                                {
                                    id: everyoneID,
                                    deny: ['VIEW_CHANNEL','SEND_MESSAGES']
                                },{
                                     id: nouveauRole.id,
                                     allow: ['VIEW_CHANNEL','SEND_MESSAGES'] //,'MANAGE_CHANNELS'
                                 },{
                                    id: botRoleID,
                                    allow: ['VIEW_CHANNEL','SEND_MESSAGES'] //,'MANAGE_CHANNELS'
                                },{
                                    id: chefRoleID,
                                    allow: ['MANAGE_CHANNELS'] //,
                                },
                            ],
                        })
                        console.log('création categorie ok')
                        const newChannel = await message.guild.channels.create('tchat', {
                            type: 'text',
                            parent: nouvelleCategory,
                        })

                        message.reply('La guilde **[ '+guilde+' ]** a bien été créé!\n')

                        if(pseudoChef){
                            pseudoChef=pseudoChef
                                .trim()
                                .replace("<@!","")
                                .replace(">","")
                        }else pseudoChef = message.author.id
                            let memberExist = message.guild.members.cache.find(member => member.id === pseudoChef)
                            let chefDeGuilde = message.guild.roles.cache.find(role => role.name === 'Chef de Guildes')
                        console.log(chefDeGuilde.id,': ',chefDeGuilde.name)
                        if(memberExist){
                            MaGuilde.changeGuilde(message,memberExist,guilde)
                            memberExist.roles.add(chefDeGuilde).then(()=> {
                                message.reply('L\'utilisateur **<@'+memberExist.id+'>** en est le Chef!')
                            })
                        }else message.reply('Le Chef de guilde n\'est pas sur le serveur! Utilisez la commande **!addChef:** *@<Nom du chef de guilde>*')

                    }catch (e) {
                        console.error(e.message)
                    }
                })()

            } else message.reply('La guilde existe déjà!')


        }else message.reply('Le format de votre commande n\'est pas correct!\nFaites **!help** pour trouver le bon format.')
    }

}


