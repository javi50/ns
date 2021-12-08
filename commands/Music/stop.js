const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_track_info,
  arrayMove
} = require("../../handlers/functions")
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dis", "disconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if there is no current track error
      if (!player)
      return message.channel.send(new MessageEmbed()
        .setFooter(client.user.username + " | by: milrato.eu", client.user.displayAvatarURL())
        .setColor("RED")
        .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
      );
      if (player.queue && !player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setFooter(client.user.username + " | by: milrato.eu", client.user.displayAvatarURL())
          .setColor("RED")
          .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
        );
        
      var irc = await isrequestchannel(client, message.channel.id, message.guild.id);
      if(irc) edit_request_message_track_info(client, player, player.queue.current);
      //stop playing
      player.destroy();
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
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
