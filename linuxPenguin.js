const Discord = require('discord.js'); //https://discord.js.org/#/
const config = require('config'); //https://www.npmjs.com/package/config
const exec = require('child_process').exec; //Basic functionality in NodeJS

const client = new Discord.Client();
const loginToken = config.get('token');
const prefix = '$';



client.login(loginToken); //If you would like to use this program, replace loginToken with a Discord bot token.

//This function runs messages through child_process.exec
function shell(msg) {
  //TODO: Make the function async so the bot can handle a bunch of messages at once.
  //TODO: Can I possibly open a limited access shell so a group could use this all at once? Twitch Chat bot?
  if (msg.content.substring(0, 1) === prefix) {
    exec(msg.content.substring(1), async function (error, stdout, stderr) {
      await returnOutput(error, stdout, stderr, msg);
    });
  } else {
    exec(msg.content, async function (error, stdout, stderr) {
      await returnOutput(error, stdout, stderr, msg);
    });
  }
}

//This function is here to clean up output code
function returnOutput(error, stdout, stderr, msg) {
  console.log('stdout: ' + stdout + '\nstderr: ' + stderr);
  msg.reply('\`\`\`shell\n' + stdout + stderr + '\`\`\`');
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
    console.log('Signal received: ' + error.signal);
  }
}

//This block runs when the bot successfully logs in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setGame(`You need help?`); //Need to check updated version of this
});

//This block handles message events 
client.on('message', msg => {
  if ((msg.channel.type === 'dm') && (!msg.author.bot)) { //In DMs, the message author does not need to include the prefix before commands.
    shell(msg);
  } else if (msg.content.substring(0, 1) === prefix) {
    shell(msg);
  }
});
