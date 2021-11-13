const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const commands = require('./commands/cmd')

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

commands.forEach(command => {
    bot.commands.set(command.name, command)
})

bot
    .on('ready', () => {
        console.log('Ready test!')
    })
    .on('guildMemberAdd', (member) => {
        let channelGeneral = member.guild.channels.cache.find(channel => channel.name.includes('général'))
        channelGeneral.send('Bonjour '+member.displayName+' et bienvenue sur RIVENGARD FR!\n' +
            'Si tu fais partie d\'une guilde présente sur le serveur tape **!maGuilde: Nom de ta guilde** \n' +
            'Si tu fais partie d\'une guilde qui n\'est pas encore représentée sur ce serveur tape **!ajouterGuilde:Nom de ta guilde**\n' +
            'Si veux savoir quelles guildes sont présentes sur le serveur tape **!guildes**\n' +
            'Si tu veux savoir ce que je peux faire pour t\'aider, tape **!help**' )
    })
    .on('message',  (message) => {
    try {
        if(message.content.startsWith(`${prefix}setNickname`)){
            let member = message.guild.member(message.author)
            console.log(member.user.username)
            member =  member.setNickname('cool guy').then(member=> {
                message.reply(member.displayName + "is a cool guy");
            });

        }
    } catch (e) {
        console.error(e); // It's always useful to log your errors.
        return message.channel.send("Something went wrong when running this command!");
    }
    })
  .on('message',(message) =>{

      if (!message.content.startsWith(prefix) || message.author.bot) return
      if (message.channel.type === 'dm') return message.reply('Je suis un bot gestionnaire de serveur! Je ne fonctionne pas en message privé')
      const args = message.content.slice(prefix.length).trim().split(':')
      const commandName = args.shift();
      const argsTrimed = []
      if(args){
          args.forEach(arg => argsTrimed.push(arg.trimStart().trimEnd()))
      }

      if (!bot.commands.has(commandName)) return message.reply('Désolé mais je ne connais pas cette commande. Tapez !help pour en savoir plus.');

      const command = bot.commands.get(commandName)
      if(command.chefOnly && (!message.guild.member(message.author).roles.cache.some(role => role.name==='Chef de Guildes') && (message.guild.member(message.author) !== message.guild.owner))){
          return message.reply('Désolé mais cette commande est réservée aux chefs de guilde.')
      }
      if(command.args && args.length === 0) return message.reply('Vous devez insérer un **'+command.argsType+'** dans la commande : \n'+prefix+commandName+ command.commandForm)

      if (command.permissions) {
          const authorPerms = message.channel.permissionsFor(message.author);
          if (!authorPerms || !authorPerms.has(command.permissions)) {
              return message.reply('Tu n\'as pas le droit de faire çà, contactes un administrateur!');
          }
      }

      try {
          command.execute(message, argsTrimed);
      }
      catch (error) {
          console.error(error);
          message.reply('Il y a eu un problème lors de l\'execution de ma commande.')
      }
  })
.login(token)
