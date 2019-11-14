const Command = require('./command')

module.exports = class Help extends Command{

    static match(message){
      return message.content.startsWith('$help');
    }

    static action(message){
      message.author.send({embed: {
                color: 3447003,
                title: "LISTE DES COMMANDES",
                description: "``Vous avez à disposition certaines commandes pour invoquer votre dieu ATON`` <:RisiMoine:294834771513704448>",
                fields: [{
                    name: "GOD",
                    value: "Utiliser la commande ``$god`` pour regarder votre rang <:Jesus4:280120629338832896>"
                  },
                  {
                    name: "BOOBS",
                    value: "Utiliser la commande ``$boobs`` pour voir de BON GROS BOOBS <:RisitasBonnet:412386776074813470>"
                  },
                  {
                    name: "FLIP",
                    value: "Utilisez la commande ``$flip`` avec en argument ``f`` ou ``p`` pour réaliser un pile ou face"
                  },
                  {
                    name: "8BALL",
                    value: "Utilisez la commande ``$8ball`` avec en argument une question pour poser une question aux dieux <:RisiMoine:294834771513704448>"
                  },
                  {
                    name: "DAILY",
                    value: "Utilisez la commande ``$daily`` pour recevoir vos Ankh quotidien <:RisiMoine:294834771513704448>"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "ATON votre DIEU"
                }
              }
            }
      );
      return message.channel.send();
    }
}
