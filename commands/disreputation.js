const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Disreputation extends Command{

  static match(message){
    return message.content.startsWith('$disrep')
  }

  static action(message){


    const embed = new Discord.RichEmbed()
    .setAuthor("REPUTATION ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    let args = message.content.split(' ');

    let idMention = message.mentions.members.first().user.id;
    let username = message.mentions.members.first().user.username;


    if(idMention != message.author.id){
      sql.get(`SELECT * FROM reputation WHERE userId ="${message.author.id}"`).then(row => {
        if(Math.floor(Date.now()/1000) > row.dateDisrep + 79200){ //Si la date actuel est superieur au timestamp + 22 heure (reset des points a 3)
          sql.run(`UPDATE reputation SET disrepRemaining ="${0}", dateDisrep ="${Math.floor(Date.now()/1000)}" WHERE userId ="${message.author.id}"`) //On update le nombre de points restants
        } else {
          sql.run(`UPDATE reputation SET reputation ="${parseInt(row.reputation) - 2}" WHERE userId = "${message.author.id}"`);
          embed.setAuthor("REPUTATION ❌", "https://i.imgur.com/lxH8qum.png");
          embed.setColor("#FF0000");
          embed.setDescription(`Ta déja utilisé tes points de disrep aujourd'hui. Je t'enleve \`\`2\`\` points de reputation pour avoir essayé de m'arnaquer <:RisitasApplaudit:412386111927877632>. Il t'en reste \`\`${parseInt(row.reputation) - 2}\`\`, fais attention la prochaine fois`);
          return message.reply({embed}); // Affichage de l'erreur
        }
        sql.get(`SELECT * FROM reputation WHERE userId = "${idMention}"`).then(mentionRow => {
          if(!mentionRow){ // si la personnes n'est pas en base (jamais écrit sur le serveur)
          sql.run("INSERT INTO reputation (userId, reputation, repRemaining, disrepRemaining, dateDisrep, dateRep) VALUES (?, ?, ?, ?, ?, ?)", [idMention, -1, 3, 1, Math.floor(Date.now()/1000) - 80000, Math.floor(Date.now()/1000) - 80000]);
          embed.setDescription("Vous avez enlevé des points de reputation");
          embed.addField(username, 0 + " => " + -1 + "(-1)", true);
          embed.addField("Points disrep restants", 0, true);
          return message.reply({embed});

        } else {

          sql.run(`UPDATE reputation SET reputation ="${parseInt(mentionRow.reputation) - 1}" WHERE userId = "${idMention}"`);
          embed.setDescription("Vous avez enlevé des points de reputation");
          let totalReputation = parseInt(mentionRow.reputation) - 1;
          embed.addField(username, mentionRow.reputation + " => " + totalReputation + "(-1)", true);
          embed.addField("Points disrep restants", 0, true);
          return message.reply({embed});

        }
      })
    })
  } else {
    embed.setAuthor("REPUTATION ❌", "https://i.imgur.com/lxH8qum.png");
    embed.setColor("#FF0000");
    embed.setDescription("Apprends a taper une commande <:Risitas2:280120484572692480>");
    return message.reply({embed}); // Affichage de l'erreur
  }
}
}
