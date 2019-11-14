const Command  = require('./command')

module.exports = class pouvoir extends Command{

    static match(message){
      return message.content.startsWith('$test')
    }

    static action(message){
      let role = message.guild.roles.find("name", "Aton");
      console.log(role);
      message.member.addRole('449536824080072724').catch(console.error);
    }
}
