const Command = require('./command')
const Discord = require('discord.js')

module.exports = class Poll extends Command{

  static match(match){
    return message.content.startsWith('$poll')
  }

  static action(message){

    const embed = new Discord.RichEmbed()
    .setAuthor("POLL 📊", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is a description")

    let args = message.content.split('"')

    if(args[3] == ""){
      
    } else {

    }
  }


}
