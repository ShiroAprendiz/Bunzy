const Discord = require('discord.js');         
const client = new Discord.Client()
const config = require("./config.json");
const fs = require("fs");
let coins = require("./coins.json");
let xp = require("./xp.json");

client.login(process.env.bunzy);

client.on('ready', () => {

console.log(`${client.guilds.size} guilds`)

    console.log(`conectado a ${client.user.tag}`)

});

 client.on('ready', async () => {

       client.user.setActivity(`Perdido? use: ` + config.prefix + `ajuda`, {url: 'https://twitch.tv/Az4zell', type: 'STREAMING'})
      setInterval(random => {
        client.user.setActivity(`Ajudando ${client.users.size} usuarios :D`)
      },1 * 64 * 1000)
      });
 fs.readdir("./comando/", (err, files) => {

    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./comando/${file}`);
      let eventName = file.split(".")[0];

      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });
  
  client.on("message", message => {
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(message.content.indexOf(config.prefix) !== 0) return;
  

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  

    try {
      let commandFile = require(`./comando/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
      console.log(`${command} usado em ${message.guild.name} por ${message.author.username}`)
    }
  });

client.on('message', msg => {
  if (msg.content === "<@" + client.user.id + ">") {
    msg.reply(` Aqui esta minha prefix: **${config.prefix}**`);
  }
});

client.on("message", message => {

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;
  
  let prefixes = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 1) + 2;
  let baseAmt = Math.floor(Math.random() * 1) + 2;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("ðŸ’¸", `${coinAmt} de money recebido!`);

  }

  let xpAdd = Math.floor(Math.random() * 1) + 2;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 0
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
 
    message.channel.send(`<@${message.author.id}>, parabÃ©ns para o seu novo level ${curlvl + 1} <:emojis:480135444269367299>`);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  })
  });
