const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Reputation extends Command{

  static match(message){
    return message.content.startsWith('$rep')
  }

  static action(message){


    const embed = new Discord.RichEmbed()
    .setAuthor("REPUTATION ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    let args = message.content.split(' ');
    let repGiven = Math.floor(args[2]);
    let idMention = message.mentions.members.first().user.id;
    let username = message.mentions.members.first().user.username;
    let realAmount;
    let actualRepRemaining;


    if(repGiven <= 3 && repGiven > 0 && repGiven != "" && idMention != message.author.id){
      sql.get(`SELECT * FROM reputation WHERE userId ="${message.author.id}"`).then(row => {
        if(Math.floor(Date.now()/1000) > row.dateRep + 79200){ //Si la date actuel est superieur au timestamp + 22 heure (reset des points a 3)
          realAmount = repGiven
          sql.run(`UPDATE reputation SET repRemaining ="${3 - realAmount}", dateRep ="${Math.floor(Date.now()/1000)}" WHERE userId ="${message.author.id}"`) //On update le nombre de points restants
          actualRepRemaining = 3 - realAmount;
        } else {
          if(row.repRemaining < repGiven){ // sinon si le nombre de points restants est inférieur au nombre de points données
            embed.setAuthor("REPUTATION ❌", "https://i.imgur.com/lxH8qum.png");
            embed.setColor("#FF0000");
            embed.setDescription("Tu n'as pas assez de points de reputation, il te reste \`\`"+ row.repRemaining +"\`\`");
            return message.reply({embed}); // Affichage de l'erreur
          } else { //sinon
            sql.run(`UPDATE reputation SET repRemaining ="${row.repRemaining - repGiven}" WHERE userId ="${message.author.id}"`) // update des points restants en base
            realAmount = repGiven;
            actualRepRemaining = row.repRemaining - realAmount;
          }
        }
        sql.get(`SELECT * FROM reputation WHERE userId = "${idMention}"`).then(mentionRow => {
          if(!mentionRow){ // si la personnes n'est pas en base (jamais écrit sur le serveur)
            sql.run("INSERT INTO reputation (userId, reputation, repRemaining, disrepRemaining, dateDisrep, dateRep) VALUES (?, ?, ?, ?, ?, ?)", [idMention, realAmount, 3, 1, Math.floor(Date.now()/1000), Math.floor(Date.now()/1000)]);
            embed.setDescription("Vous avez donné vos points de réputation");
            let totalReputation = 0 + parseInt(realAmount);
            embed.addField(username, 0 + " => " + totalReputation + "(+" + realAmount + ")", true);
            embed.addField("Points quotidiens restants", (actualRepRemaining), true);
            return message.reply({embed});

          } else {

            sql.run(`UPDATE reputation SET reputation ="${parseInt(mentionRow.reputation) + parseInt(realAmount)}" WHERE userId = "${idMention}"`);
            embed.setDescription("Vous avez donné vos points de réputation");
            let totalReputation = parseInt(mentionRow.reputation) + parseInt(realAmount);
            embed.addField(username, mentionRow.reputation + " => " + totalReputation + "(+" + realAmount + ")", true);
            embed.addField("Points quotidiens restant", (actualRepRemaining), true);
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
