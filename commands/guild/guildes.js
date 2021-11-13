const Command = require('../command')
const GuildesInfo = require('./guildesInfo.json')

module.exports = class Guildes extends Command{

    static match(message){
        return message.content === "!guildes"
    }

    static action (message){

        let guildes = this.getGuildes(message)
        let messageContent = ""
        let membresTotaux = 0
        if (guildes.length!==0){
            messageContent =  "Les guildes présentes sur le serveur actuellement :\n"
            guildes.forEach(channel => {
                membresTotaux += channel.effectif
                messageContent += "**- "+(channel.name) +"**, Chef : "+(typeof channel.chef !== 'undefined'? `${channel.chef.nickname}`: "pas de chef!")+" Classement : "+channel.classement+`, Effectif Discord : ${channel.effectif}`+ (channel !== guildes[guildes.length -1] ?".\n":").")
            })
        }else messageContent =  "Il n'y a pas de guilde sur le serveur. \nCréez une guilde avec la commande : **!ajouterGuilde:** *Nom de la guilde.*"
        messageContent += "\n**Effectif Discord sans guilde :** "+(message.guild.members.cache.size - membresTotaux)
        message.reply(messageContent)
    }

     static getGuildes (message){
        let guildes = []
        let channels = message.guild.channels.cache.mapValues(channel => channel.name).forEach((valueChannel,keyChannel) => {
            let roles = message.guild.roles.cache.mapValues(role => role.name).forEach((valueRole,keyRole) => {
                if(valueChannel===valueRole) {

                    let guilde = GuildesInfo.guildes.find(info => info.name === valueChannel)
                    let membres = message.guild.roles.cache.find(role => role.name === valueRole).members
                    let chefs = message.guild.roles.cache.find(role => role.name === 'Chef de Guildes').members
                    let nbMembre = membres.size
                    let chefGuilde = membres.intersect(chefs).first()
                    guildes.push({name: valueChannel, effectif: nbMembre, chef: chefGuilde, classement: typeof guilde !=='undefined'?guilde.classementIG:'non renseigné'})
                }
            })
        })
        return guildes.sort((guildeA,guildeB)=> guildeA.classement - guildeB.classement)
    }

    static hasGuilde (message, member){
        let guildes = this.getGuildes(message).map(guilde => guilde.name)
        return member.roles.cache.find(role => guildes.includes(role.name))
    }
}


