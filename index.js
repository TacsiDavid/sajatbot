const Discord = require("discord.js");
const superagent = require("superagent");
const got = require('got');
var weather = require('weather-js');
const fs = require('fs')
const ascii = require ("ascii-table");
const version = "6.3.1"
const client = new Discord.Client();
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

//////////////////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.login('');

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require (`./handlers/${handler}`)(client)
});

client.on("message", async message => {
  var prefix = "a!";

  if(message.author.bot) return;
  if(!message.guild);
  if(!message.content.startsWith(prefix)) return;
  if(!message.member) message.member = await message.guild.fetchMember(message)

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command)
  command.run(client, message, args);
});

/////////////////////////////////////////////////////////////
 
client.on("ready", () => {
  console.log(`Bejelentkezve: \n` + client.user.tag);
 
  client.user.setActivity(`a!help | ${client.guilds.cache.size} szerver`,{
    type: "WATCHING"
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm");
 
  var prefix = "a!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


if(cmd === `${prefix}ping`) {
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Bot Ping")
  .addField("💻Ping:", `${Date.now() - message.createdTimestamp}ms`)
  .setThumbnail(client.user.avatarURL)
  .setTimestamp()
 
  message.channel.send(embed)
}

if(cmd === `${prefix}infó`) {
  let user = message.mentions.users.first() || message.author;
  if(user.presence.status === `dnd`) user.presence.status = "Elfoglalt";
  if(user.presence.status === `offline`) user.presence.status = "Láthatatlan";
  if(user.presence.status === `online`) user.presence.status = "Elérhető";
  if(user.presence.game === null) user.presence.game = "Nem játszik vagy Saját Státusz";
  const member = message.guild.member(user)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(user.avatarURL)
  .setTitle(`${user.username} Információi`, user.displayAvatarURL)
  .addField("Felhasználóneve:", user.username)
  .addField("ID:", user.id)
  .addField("Rangjai:", user.roles)
  .addField("Játékban:", user.presence.game)
  .addField("Állapota:", user.presence.status)
  .addField("Létrehozva:", user.createdAt.toDateString())
  .addField("Csatlakozott a szerverhez:", member.joinedAt.toDateString())
  .setTimestamp()

  message.channel.send(embed)

}
if(cmd === `${prefix}meghivás`) {
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Meghivó Link")
  .setDescription("Ezzel tudod behívni a botot a szerveredre")
  .addField("💻Link:", `???`)
  .setThumbnail(client.user.avatarURL)
  .setTimestamp()
 
  message.channel.send(embed)
}

if(cmd === `${prefix}purge`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nincs jogod használni ezt a parancsot!")
  let args = message.content.split(" ").slice(1)
  let author = message.member;
      if(!args[0]) {
      message.channel.send("**Parancs Használat:** `ap!purge` *(szám)*")
      return;
  }
  if(args[0] > 300){
      message.channel.send("`A maximum törölhető üzenet` **300,** `kérlek próbáld újra!`")
      return;
  }
  message.channel.bulkDelete(args[0]);
  message.channel.send("Sikeresen töröltél " + args[0] + " üzenetet!")
  message.channel.bulkDelete(args[0]);
  return;
}

if(cmd === `${prefix}botinfo`) {
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Bot Információi")
  .addField("💻Bot Fejlesztők:", "Kuzzy#0094 , benketomi#2592")
  .addField("🤖Bot Programnyelv:", "JavaScript")
  .addField("🤖Bot Prefixe:", `${prefix}`)
  .addField("🤖Létrehozva:", `${client.user.createdAt.toDateString()}`)
  .addField("🤖Bot Név:", `${client.user.username}`)
  .addField("👾Discord.js:", `${version}`)
  .addField("🤖Bot Név:", `${client.user.username}`)
  .addField("📁Szerverek:", `${client.guilds.cache.size}`)
  .addField("⏳ Ram használat:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
  .setThumbnail(client.user.avatarURL)
  .setTimestamp()

  message.channel.send(embed)
}

if(cmd === `${prefix}help`) {
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("🚀Bot Parancsai🚀")
  .addField("🤖NSFW Parancsok:", "nsfwneko, nsfwwaifu, blowjob, trap, cum, nsfwnekogif, cumjpg, anal, hentai")
  .addField("🤖SFW Parancsok:", "neko, waifu, cuddle")
  .addField("🤖Fun Parancsok:", "meme, search, emojify, badges, sourcebin, chat, macsek")
  .addField("🤖Játék Parancsok:", "8ball, tictactoe, akasztófa, kérdések, kill, trap")
  .addField("🤖Moderáció Parancsok:", "ban, kick, clear, report")
  .addField("🤖Zene Parancsok:", "???, ???, ???, ???, ???")
  .addField("🤖Bot Funkció Parancsok:", "botinfo, ping")
  .addField("🤖Egyéb Parancsok:", "avatar, szerverinfó, instagram, meghivás, say, időjárás")
  .setThumbnail(client.user.avatarURL)
  .setTimestamp()

  message.channel.send(embed)
}
});
