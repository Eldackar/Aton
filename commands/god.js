const Command = require('./command')

module.exports = class God extends Command{

    static match(message){
        return message.content.startsWith('$god');
    }

    static action(message){
        if(message.author.id == '238695139508355073'){ //Brokani ID
            return message.channel.send('Voici notre DIEU ' + message.author + ' <:RisiMoine:294834771513704448>');
        }
        else if(message.author.id == '246759454480138241'){ //Eldackar ID
            return message.channel.send('Voici mon divin CREATEUR '  + message.author + ' <:RisiMoine:294834771513704448>');
        }
        else if(message.author.id == '362577453018775562'){ // Skaywen ID
          return message.channel.send('Voici la DÉESSE de l\'égypte' + message.author + ' <:RisiMoine:294834771513704448>')
        }
        else if(message.author.id == '228242745624494080'){ //Tony
          return message.channel.send('Voici le PIGEON de l\'égypte' + message.author + ' <:RisiMoine:294834771513704448>')
        }
        else if(message.author.id == '140096248559435776'){ // DJAUNEKOLO
          return message.channel.send('Voici le MALADE IMAGINAIRE de l\'égypte' + message.author + ' <:RisiMoine:294834771513704448>' )
        }
        else if(message.author.id == '285569837449740289'){ //STEPH
          return message.channel.send('Voici la PRINCESSE de l\'égypte' + message.author + ' <:RisiMoine:294834771513704448>')
        }
        else{
          return message.channel.send('T\'es qui toi ' + message.author + ' ? <:Risimath:316158701272563712>');
        }
    }
}
