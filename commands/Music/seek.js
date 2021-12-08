const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `seek`,
  category: `🎶 Music`,
  aliases: [`vol`],
  description: `Changes the position(seek) of the Song`,
  usage: `seek <Duration in Seconds>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if number is out of range return error
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
        return message.channel.send(new MessageEmbed()
          .setFooter(client.user.username + " | by: milrato.eu", client.user.displayAvatarURL())
          .setColor("RED")
          .setTitle(`${emoji.msg.ERROR} Error | You may seek from \`0\` - \`${player.queue.current.duration}\``)
        );
      //seek to the position
      player.seek(Number(args[0]) * 1000);
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | Seeked song to: ${format(Number(args[0]) * 1000)}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor("BLUE")
        .setFooter(client.user.username + " | by: milrato.eu", client.user.displayAvatarURL())
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setFooter(client.user.username + " | by: milrato.eu", client.user.displayAvatarURL())
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */